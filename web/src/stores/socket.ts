import { getSession, pullUnreadList, query_history_list } from "@/service/message";
import type { IMessage, IRemoteMessage } from "@/types/IMessage";
import type { ISession } from "@/types/ISession";
import type { IMessagePayload } from "@/types/IMessagePayload";

import { CmdEnum } from "@/types/IMessagePayload";
import { getToken, getUserId } from "@/utils/auth";
import { acceptHMRUpdate, defineStore } from "pinia";
import { io, Socket } from "socket.io-client";
import store from "store";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { host } from "@/utils/request";

export let socket: Socket;

interface PartialUserInfo {
  id: number;
  nickname: string;
  avatar: string;
}

export const useSocketStore = defineStore("socket", {
  state: () => {
    // const list = (store.get("messages") || []) as IMessage[];
    const list = [] as IMessage[];
    return {
      list,
      sessions: [] as ISession[],
      receiveUser: null as (null|PartialUserInfo),
      dialUser: null  as (null|PartialUserInfo),
    };
  },

  getters: {
    sessionList(state) {
      return state.sessions.map((session) => {
        // 未读消息列表
        const list = state.list.filter((it) => {
          return (
            !it.is_read &&
            `${it.rid}` === `${getUserId()}` &&
            session.partner_id === it.suid
          );
        });

        return {
          ...session,
          unread: list.length,
        };
      });
    },
    unReadNum(state) {
      return state.list.filter((it) => {
        return `${it.suid}` !== `${getUserId()}`
      }).filter((it) => !it["is_read"]).length;
    },
  },

  actions: {
    save (list?: any[]) {
      store.set('messages', list || this.list)
    },

    // 连接
    connect() {
      socket = io(host, {
        query: {
          suid: 1,
          token: getToken(),
        },
      });

      socket.on('video-call', data => {
        this.$patch({
          receiveUser: {
            nickname: data.nickname,
            id: +data.sender,
            avatar: data.avatar
          }
        })
      });

      socket.on("message", (message: IRemoteMessage) => {
        if (message.suid !== getUserId()) {
          this.list.push({ ...message, is_read: false });
          this.save();

          const session = this.sessions.find(
            (s) => s.partner_id === message.suid
          );

          if (session) {
            session.last_message = message;
            session.unread = (session.unread || 0) + 1;
            this.$patch({ sessions: this.sessions });
          } else {
            this.sessions.push({
              nickname: message.from_nickname,
              avatar: message.from_avatar,
              is_group: message.is_group,
              partner_id: message.suid,
              last_message: message
            })
          }
        }
        this.goBottom()
      });
    },

    // 标记已读
    markHasRead (params: { pid: number }) {
      this.list.forEach((it) => {
        if (it.suid === params.pid) {
          it.is_read = true;
        }
      })
      this.$patch({ list: this.list });
      this.save();
    },

    // 发送消息
    send(payload: IMessagePayload) {
      const item = {
        type: 1,
        msg_no: uuidv4(),
        ...payload,
        loading: true,
        suid: getUserId() as number,
        is_read: false,
        create_time: dayjs().format(),
        is_group: payload.cmd === CmdEnum.group_chat ? true : false
      }

      socket.emit("message", item, () => {
        console.log('send success');
        item.loading = false;
        item.is_read = true;
        this.$patch({ list: JSON.parse(JSON.stringify(this.list)) });
        this.save();

        const session = this.sessions.find(
          (s) => s.partner_id === payload.rid
        );

        if (session) {
          session.last_message = item;
          session.unread = (session.unread || 0) + 1;
          this.$patch({ sessions: JSON.parse(JSON.stringify(this.sessions)) });
        } else {
          this.sessions.push({
            nickname: payload.to_nickname || '',
            avatar: payload.to_avatar || '',
            is_group: payload.is_group,
            partner_id: payload.rid,
            last_message: item
          })
        }
      });

      this.list.push(item);
      this.save();
      this.goBottom()
    },

    goBottom () {
      setTimeout(() => {
        const out: HTMLDivElement|null = document.querySelector("#msg_list");
        const content: HTMLDivElement|null = document.querySelector("#msg_content");
        if (out && content) {
          out.scrollTop = content.offsetHeight + 200;
        }
      });
    },

    scrollTo (value: number) {
      setTimeout(() => {
        const out: HTMLDivElement|null = document.querySelector("#msg_list");
        const content: HTMLDivElement|null = document.querySelector("#msg_content");
        if (out && content) {
          out.scrollTop = value
        }
      });
    },

    getScrollTop () {
      const out: HTMLDivElement|null = document.querySelector("#msg_list");
      return out!.scrollTop as number;
    },

    async initData () {
      await this.querySession()
    },

    async queryHistory (params: {}) {
      query_history_list(params).then((res: any) => {
        const list = [...this.list, ...res.data.list].sort((a, b) => a.time - b.time);
        this.$patch({ list })
      })
    },

    setDialUser (user: PartialUserInfo|null) {
      this.$patch({ dialUser: user });
      if (user) {
        socket.emit('video-call', {
          to: user.id
        })
      }
    },

    setReceiveUser (user: PartialUserInfo|null) {
      this.$patch({
        receiveUser: user
      })
    },

    // 查询会话
    async querySession() {
      const res: any = await getSession({})
      this.sessions = res.data.list.map((it: any) => {
        return {
          ...it,
          unread: 0,
        };
      });
      for (let i = 0; i < this.sessions.length; i++) {
        const s = this.sessionList[i];
        const res = await pullUnreadList({ rid: s.partner_id, is_group: s.is_group })
        this.list = [...this.list, ...res.data.list].sort((a, b) => a.time - b.time);
        console.log(this.list)
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSocketStore, import.meta.hot));
}

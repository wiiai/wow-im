import { In } from 'typeorm';
import { connection } from '../database/mysql';
import { FriendEntity } from '../database/mysql/entity/friend.entity';
import { GroupUserEntity } from '../database/mysql/entity/group-user.entity';
import { GroupEntity } from '../database/mysql/entity/group.entity';
import { UserEntity } from '../database/mysql/entity/user.entity';
import { userService } from './user.service';

const friendService = {

  /**
   * @description 查询通讯录
   * @param params
   * @returns
   */
  async queryFriend(params: { token: string }) {
    const userId = await userService.getUserIdByToken(params.token);

    // 好友
    const list = await connection.getRepository(FriendEntity).find({
      where: {
        suid: Number(userId),
      },
    });

    // 好友信息
    const users = await connection.getRepository(UserEntity).find({
      where: {
        id: In(list.map((it) => it.tuid)),
      },
    });

    // 群
    const groupUser = await connection.getRepository(GroupUserEntity).find({
      where: {
        user_id: userId as unknown as number
      }
    });

    // 群信息
    const groups = await connection.getRepository(GroupEntity).find({
      where: {
        id: In(groupUser.map((it) => it.group_id))
      }
    });

    const list1 = users.map((it) => {
      return {
        id: it.id,
        avatar: it.avatar,
        nickname: it.nickname,
        is_group: 0
      }
    })

    const list2 = groups.map((it) => {
      return {
        id: it.id,
        avatar: it.avatar,
        nickname: it.name,
        is_group: 1
      }
    })

    return {
      list: [...list2, ...list1],
    };
  },
};

export { friendService };

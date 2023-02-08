import { In } from "typeorm";
import { connection } from "../database/mysql"
import { GroupUserEntity } from "../database/mysql/entity/group-user.entity"
import { GroupEntity } from "../database/mysql/entity/group.entity";
import { userService } from "./user.service";

export const groupService = {
  /**
   * @description 查询用户所在的群
   * @param group_id 
   * @returns 
   */
  async getUserIdsById (group_id: number) {
    const list = await connection.getRepository(GroupUserEntity).find({
      where: {
        group_id: group_id
      }
    })

    return list;
  },

  /**
   * @description 查询群的用户列表
   * @param params 
   * @returns 
   */
  async getUserListById (params: { id: number}) {
    const list = await connection.getRepository(GroupUserEntity).find({
      where: {
        group_id: params.id
      }
    })

    const users = await userService.getByIds(list.map((it) => it.user_id))

    return {
      list: users
    }
  },

  /**
   * @description 查询群信息
   * @param params 
   * @returns 
   */
  async get_group_info_by_id_list (params: { id_list: number[]}) {
    return connection.getRepository(GroupEntity).find({
      where: {
        id: In(params.id_list)
      }
    })
  }
}
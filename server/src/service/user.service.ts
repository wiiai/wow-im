import { MD5 } from 'crypto-js';
import { In } from 'typeorm';
import { connection } from '../database/mysql';
import { UserEntity } from '../database/mysql/entity/user.entity';
import { redisClient } from '../database/redis';
const passwordGenerator = require('generate-password');

/**
 * @description 获取登录 key (redis)
 * @returns
 */
function genLoginToken() {
  const key = passwordGenerator.generate({
    length: 10,
    numbers: true,
  });
  return MD5(`${key}`).toString();
}

const userService = {
  /**
   * @description 登录
   * @param params
   * @returns
   */
  async login(params: { account: string; password: string }) {
    const userRepo = connection.getRepository(UserEntity);
    const { account, password } = params;

    const user = await userRepo.findOne({
      where: {
        account,
        password,
      },
    });

    if (!user) {
      return null;
    }

    const token = genLoginToken();
    await redisClient.set(token, `${user!.id}`);

    const data = { ...user!, token, };

    return { data, };
  },

  // 退出登录
  logout() {},

  // 注册
  register() {},

  // 用户用户信息
  async getUserInfo() {
    // return this.getUserByToken();
  },

  /**
   * @description 判断是否登录
   * @param token 
   * @returns 
   */
  async check_login (token: string) {
    if (!token) {
      return false;
    }
    const info = await this.getUserByToken(token);
    return info ? true : false
  },

  /**
   * @description 根据 token 获取用户信息
   * @returns
   */
  async getUserByToken(token: string) {
    const userRepo = connection.getRepository(UserEntity);
    const userId = await this.getUserIdByToken(token);

    const user = await userRepo.findOne({
      where: {
        id: Number(userId),
      },
    });

    return user;
  },

  /**
   * @description 通过 token 获取 user id
   * @param token
   * @returns
   */
  async getUserIdByToken(token: string) {
    const userId = await redisClient.get(token);
    return userId;
  },

  getByIds (list: number[]) {
    return connection.getRepository(UserEntity).findBy({
      id: In(list)
    })
  },

  async queryProfile (list: number[]) {
    const data = await connection.getRepository(UserEntity).findBy({
      id: In(list)
    })
    return data.map(({ nickname, avatar, id }) => ({
      nickname,
      avatar,
      id
    }))
  }
};

export { userService };

import { createConnection, DataSource, EntityTarget, Repository, Entity } from 'typeorm';
import { FriendEntity } from './entity/friend.entity';
import { GroupUserEntity } from './entity/group-user.entity';
import { GroupEntity } from './entity/group.entity';
import { ReadLogEntity } from './entity/read-log.entity';
import { UserEntity } from './entity/user.entity';
import { config } from '../../utils/constant';

type ArrayElementType<T extends any[]> = T extends (infer U)[] ? U : never;

export let connection: DataSource;

export const entities = [
  UserEntity,
  FriendEntity,
  ReadLogEntity,
  GroupEntity,
  GroupUserEntity
]

type Table = UserEntity |
  FriendEntity |
  ReadLogEntity |
  GroupEntity |
  GroupUserEntity

export async function initMysql () {
  connection = await createConnection({
    ...config.mysql,
    type: 'mysql',
    timezone: '+08:00',
    dateStrings: true,
    logging: false,
    synchronize: true,
    entities: entities
  });
}

export const getRepos = <T extends Table>(entity:  T) => {
}
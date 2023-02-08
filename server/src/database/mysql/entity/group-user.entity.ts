import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from './base';

// 用户基础信息表
@Entity('group_user_tab')
export class GroupUserEntity extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  group_id: number;

  @Column({ comment: '0(未退群) 1(已退群)'})
  status: number;

  nickname: string;
  avatar: string;
  is_group: boolean;
}
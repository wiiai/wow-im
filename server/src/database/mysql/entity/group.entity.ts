import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from './base';

// 用户基础信息表
@Entity('group_tab')
export class GroupEntity extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '群名称' })
  name: string;

  @Column({ comment: '群头像' })
  avatar: string;

  @Column({ comment: '人数' })
  user_count: number;

  @Column({ comment: '拥有者用户ID' })
  owner: number;
}
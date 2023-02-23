import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from './base';

// 用户基础信息表
@Entity('friend_tab')
export class FriendEntity extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '拥有者' })
  suid: number;

  @Column({ comment: '目标用户' })
  tuid: number;
}
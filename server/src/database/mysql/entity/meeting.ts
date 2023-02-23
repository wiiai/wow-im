import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from './base';

// 用户基础信息表
@Entity('meeting_tab')
export class MeetingEntity extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '会议ID' })
  no: string;

  @Column({ comment: '会议名称' })
  name: string;
}
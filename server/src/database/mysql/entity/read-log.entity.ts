import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from './base';

// 阅读日志表
@Entity('read_log_tab')
export class ReadLogEntity extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '所属用户'})
  user_id: number;

  @Column({ comment: '对话者id (room_id or user_id)' })
  rid: number;

  @Column({ comment: '是否为群模式', type: 'tinyint', default: 0 })
  is_room: number;

  @Column({ comment: '阅读标记时间', type: 'bigint', default: 0 })
  time: number;
}

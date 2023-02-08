import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from './base';

// 用户基础信息表
@Entity('user_tab')
export class UserEntity extends BasicEntity {
  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;

  @Column({ comment: '账户' })
  account: string;

  @Column({ comment: '密码' })
  password: string;

  @Column({ comment: '昵称' })
  nickname: string;

  @Column({ comment: '手机号码' })
  mobile: string;

  @Column({ comment: '头像地址' })
  avatar: string;

  @Column({ comment: '性别' })
  gender: string;

  @Column({ comment: '生日' })
  birthday: string;

  @Column({ comment: '居住地' })
  city: string;

  @Column({ comment: '毕业院校' })
  college: string;

  @Column({ comment: '自我介绍' })
  introduction: string;

  @Column({ comment: '背景图片' })
  background: string;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: '状态 0->禁用 1->可用',
  })
  status: boolean;
}
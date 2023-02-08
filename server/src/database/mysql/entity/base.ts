import { Column } from 'typeorm';

export class BasicEntity {
  constructor() {
    this.create_time = new Date();
  }

  @Column({
    type: 'int',
    name: 'lock_version',
    comment: '乐观锁版本号',
  })
  lock_version?: number;

  @Column({
    type: 'tinyint',
    name: 'is_delete',
    comment: '逻辑删除 0->未删除 1->已删除',
  })
  is_delete?: boolean;

  @Column({
    type: 'datetime',
    name: 'create_time',
    default: () => 'NOW()',
    comment: '创建时间',
  })
  create_time?: Date;
}
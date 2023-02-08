// -- 数据库大全：即时通讯-最近会话
// -- 来源：YesApi.cn
// CREATE TABLE `yesapi_im_recent_session` (
//     `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
//     `userId` int(11) NULL COMMENT '用户id',
//     `peerId` int(11) NULL COMMENT '对方id',
//     `type` tinyint(1) NULL DEFAULT '0' COMMENT '类型，1-用户,2-群组',
//     `status` tinyint(1) NULL DEFAULT '0' COMMENT '用户:0-正常, 1-用户A删除,群组:0-正常, 1-被删除',
//     PRIMARY KEY (`id`)
// ) ENGINE=InnoDB COMMENT '即时通讯-最近会话';
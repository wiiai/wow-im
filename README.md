## wow-im
`wow-im` 是一款基于的即时通讯产品，支持的终端包括: H5、PC、IOS & Android (ReactNative)

演示:
- H5 https://wow-im.airtlab.com/mobile
- PC https://wow-im.airtlab.com/web
- 安卓 https://github.com/wiiai/wow-im-rn/release
- IOS https://github.com/wiiai/wow-im-rn/release

源码：
- 服务端 https://github.com/wiiai/wow-im/server
- H5 https://github.com/wiiai/wow-im/ui
- ReactNative https://github.com/wiiai/wow-im-rn

## 已实现功能
- 账户
  - [x] 登录
- 通讯录
  - [x] 好友列表
  - [x] 群
- 聊天
  - [x] 单聊
  - [x] 群聊
  - [x] 视频单聊
  - [x] 语音单聊
- 消息内容
  - [x] 文字
- 会话
  - [x] 会话列表
  - [x] 历史消息
 
## 1. 会话列表的查询和维护

会话列表是一个聊天窗口列表，包括群以及好友，类似微信首页

![image](https://github.com/wiiai/wow-im/assets/34447750/1c1ab21e-3945-455d-903e-dc153bec57f0)

会话列表中显示着我与每个群，每个人最后消息的展示，提供聊天的入口。要满足最新消息展示在最前。那么这个列表如何维护呢？

### 1.1 独立会话还是共享会话?
两个人 1对1 聊天，这两个人是共享一个会话，还是各自维护一条

### 1.2 发送消息时更新会话列表
最简单的方案就是每个消息发送时更新会话列表，这种情况会造成大量的更新。对于1对1的私聊，会更新两个会
如何才能更好的设计出会话列表。

### 1.3 什么时候创建会话
是发送消息时创建，还是加好友时或者加群时就创建好，如果发消息时创建，那么每次发消息都要判断是否已经创建，会导致查询次数剧增

## 2. 未读消息的维护
未读消息有两个维度，首先单个会话的未读，其次所有会话的累积未读，假如一个群有100人，那么100人中每个人的未读数量可能是不同的

<img width="400" alt="image" src="https://github.com/wiiai/wow-im/assets/34447750/47d4d9ac-7932-4917-a2ed-f68748791ca2"><img width="400" alt="image" src="https://github.com/wiiai/wow-im/assets/34447750/0592911b-dae1-470d-b88c-fa010a34301d">

### 2.1 未读数量
### 2.2 标记已读

## 会议流程
1、给在线用户发起会议邀请推送，被邀请者点击同意后进入会议详情
2、任何用户可以通过会议 URL 进入会议 (DB里面需要创建会议信息，会议ID 标识会议)

## 用户在线状态维护

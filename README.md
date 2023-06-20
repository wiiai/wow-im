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
 
## 会话列表的维护

会话列表表示你之前聊天过的对象，包括群以及好友，类似微信首页

![image](https://github.com/wiiai/wow-im/assets/34447750/1c1ab21e-3945-455d-903e-dc153bec57f0)

![image](https://github.com/wiiai/wow-im/assets/34447750/6d4faa16-f9bb-4c1f-ae56-bc7e626e787c)


## 会议流程
1、给在线用户发起会议邀请推送，被邀请者点击同意后进入会议详情
2、任何用户可以通过会议 URL 进入会议 (DB里面需要创建会议信息，会议ID 标识会议)

## 用户在线状态维护

import { Router } from 'express';
import { messageService } from '../service/message.service';
import { sessionService } from '../service/session.service';
import { userService } from '../service/user.service';

const router = Router();

router.post('/query_session_list', async function (req, res, next) {
  const token = req.headers['token'] as string;
  const user = await userService.getUserByToken(token);

  if (user) {
    const data = await sessionService.querySession({ userId: user.id });
    res.json({
      data
    });
  } else {
    res.json({
      message: '未登录'
    })
  }
});

router.post('/query_unread_list', async function (req, res, next) {
  const token = req.headers['token'] as string;
  const user = await userService.getUserByToken(token);
  const body: { ruid: number; is_group: number } = req.body

  if (user) {
    const data = await messageService.queryUnRead(user.id, {
      ruid: body.ruid,
      is_group: body.is_group
    });
    res.json({
      data
    });
  } else {
    res.json({
      message: '未登录'
    })
  }
});

router.post('/query_history_list', async function (req, res, next) {
  const token = req.headers['token'] as string;
  const user = await userService.getUserByToken(token);
  const body: { ruid: number; is_group: number; seq: number } = req.body

  if (user) {
    const data = await messageService.queryHistoryMessage(user.id, {
      seq: body.seq,
      ruid: body.ruid,
      is_group: body.is_group,
    });
    res.json({
      data
    });
  } else {
    res.json({
      message: '未登录'
    })
  }
});

export default router;

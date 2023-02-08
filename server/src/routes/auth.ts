import { Router } from 'express';
import { userService } from '../service/user.service';

const router = Router();

router.post('/login', async function (req, res, next) {
  const params = req.body;
  const data = await userService.login(params);
  res.json(data)
});

router.post('/auth_register', function (req, res, next) {
  res.json({
    name: 'hello',
  });
});

// 获取用户信息
router.post('/query_user_info', async function (req, res, next) {
  const token = req.headers['token'] as string;
  const data = await userService.getUserByToken(token);

  res.json({
    data: data
  });
});

router.post('/check_login', async function (req, res, next) {
  const token = req.headers['token'] as string;
  const status = await userService.check_login(token);

  res.json({
    data: {
      status
    }
  });
});

export default router;
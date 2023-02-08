import { Router } from 'express';
import { friendService } from '../service/friend.service';
import { userService } from '../service/user.service';

const router = Router();

router.post('/query_friend_list', async function (req, res) {
  const token = req.headers['token'] as string;
  const data = await friendService.queryFriend({ token });

  res.json({
    data
  })
});

router.post('/queryProfile', async function (req, res) {
  const { list } = req.body;
  const data = await userService.queryProfile(list);
  res.json({
    data
  })
});

router.post('/add_friend', function (req, res) {
  res.json({
    name: 'hello',
  });
});

router.post('/remove_friend', function (req, res) {
  res.json({
    name: 'hello',
  });
});


export default router;
import { Router } from 'express';
import { groupService } from '../service/group.service';

const router = Router();

router.post('/get_user_list_by_id', async function (req, res) {
  const { id } = req.body;
  const data = await groupService.getUserListById({ id });

  res.json({
    data
  })
});


export default router;
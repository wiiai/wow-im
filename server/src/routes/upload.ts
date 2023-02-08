import { Router } from 'express';
import path from 'path';
import { uploadFromFilePath } from '../service/upload.service';

const multer = require('multer');

// 创建 multer 的实例对象，通过dest属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../../uploads') });

const router = Router();

router.post('/file', upload.single('file'), async function (req: any, res) {
  console.log(req.file)
  const data = await uploadFromFilePath(req.file.path, req.file.originalname)
  res.json({
    data: data
  })
})

export default router;
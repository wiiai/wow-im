import * as path from 'path';
import logger from 'morgan';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import express, { Express } from 'express';

import userRouter from './routes/auth';
import groupRouter from './routes/group';
import friendRouter from './routes/friend';
import messageRouter from './routes/message';
import uploadRouter from './routes/upload';

const app: Express = express();
const cors = require('cors');

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(function (req, res, next) {
  console.log(req.url);
  next();
});

app.use('/user', userRouter);
app.use('/group', groupRouter);
app.use('/friend', friendRouter);
app.use('/message', messageRouter);
app.use('/upload', uploadRouter)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ error: err });
});

export default app;

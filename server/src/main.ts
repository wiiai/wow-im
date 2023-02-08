import 'reflect-metadata';
import http from 'http';
import https from 'https';
import debugFactory from 'debug';
import app from './app';
import { initSocket } from './socket';
import { normalizePort } from './utils/normalizePort';
import { initMysql } from './database/mysql';
import { initMongo } from './database/mongo';
import { initRedis } from './database/redis';
import './utils/constant'
import * as fs from 'fs';
import { isPrd } from './utils/constant';
const appRoot = require('app-root-path');

let sslOptions = {
  key: fs.readFileSync(appRoot.path + "/deploy/cert/localhost+2-key.pem"), //里面的文件替换成你生成的私钥
  cert: fs.readFileSync(appRoot.path + "/deploy/cert/localhost+2.pem"), //里面的文件替换成你生成的证书
};

const debug = debugFactory('node-im-express-ts:server');
const port = normalizePort(process.env.PORT || '3010');
const server = !isPrd ? http.createServer(app) : http.createServer(app)

async function bootstrap() {
  await initMysql();
  await initMongo();
  await initRedis();
  await initSocket(server);

  app.set('port', port);
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
}

bootstrap();

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
  debug('Listening on ' + bind);
}

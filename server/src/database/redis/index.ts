import { createClient } from 'redis';
import { config } from '../../utils/constant';

const REDIS_LOGIN_PREFIX = 'im_login_';

const redisClient = createClient({
  url: config.redis,
});

async function initRedis() {
  await redisClient.connect();
}

export { redisClient, initRedis };

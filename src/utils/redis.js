import { promisify } from 'util';
import { createClient } from 'redis';

const redisClient = createClient({
  host: 'localhost',
  port: 6379,
});

redisClient.getAsync = promisify(redisClient.get).bind(redisClient);
redisClient.setAsync = promisify(redisClient.set).bind(redisClient);

redisClient.on('connect', () => console.log('client connected to redis'));
redisClient.on('ready', () =>
  console.log('client connected to redis and ready to use..')
);
redisClient.on('error', (err) => console.log('Redis redisClient Error', err));
redisClient.on('end' ,() => console.log('client disconnected from redis..'));

process.on('SIGINT', () => {
  redisClient.quit();
});

export default redisClient;

import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor () {
    this.client = createClient();
    this.client.on('error', (err) => console.error('Redis Client Error:', err));
    this.getAsync = promisify(this.client.get).bind(this.client);
  }

  isAlive () {
    return this.client.connected;
  }

  async get (key) {
    return this.getAsync(key);
  }

  async set (key, value, duration) {
    const setAsync = promisify(this.client.setex).bind(this.client);
    return setAsync(key, duration, value);
  }

  async del (key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    return delAsync(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;

import { createClient } from 'redis';

class RedisClient {
  constructor() {
    // Create a Redis client
    this.client = createClient();

    // Initially, assume the connection is not alive
    this.alive = false;

    // Error handling
    this.client.on('error', (err) => console.error('Redis Client Error:', err));

    // Set alive to true when the client is connected and ready
    this.client.on('ready', () => {
      console.log('Redis client connected');
      this.alive = true;
    });
  }

  // Check if Redis connection is alive
  isAlive() {
    return this.alive;
  }

  // Get a value from Redis by key
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Set a key-value pair with an expiration time
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Delete a key from Redis
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;

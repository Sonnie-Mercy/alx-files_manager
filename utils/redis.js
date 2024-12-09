// utils/redis.js
const redis = require('redis');

class RedisClient {
    constructor() {
        this.client = redis.createClient();  // Create the Redis client
        this.client.on('error', (err) => {
            console.error('Redis Client Error:', err);  // Log any Redis client errors
        });
    }

    // Check if Redis is alive
    isAlive() {
        return this.client.connected;  // Check connection status
    }

    // Get value for a given key
    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    // Set value for a given key with expiration time
    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.setex(key, duration, value, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    // Delete a key from Redis
    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}

// Export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = redisClient;

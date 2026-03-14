import { createClient } from 'redis';

let client = null;
let redisAvailable = false;

export async function initRedis() {
  const url = process.env.REDIS_URL;

  // If no REDIS_URL is set, skip Redis entirely
  if (!url) {
    console.log('⚠️ REDIS_URL not set. Running without Redis cache.');
    return null;
  }

  try {
    client = createClient({ url });

    client.on('error', (err) => {
      console.error('Redis Client Error:', err.message);
      redisAvailable = false;
    });

    client.on('ready', () => {
      redisAvailable = true;
      console.log('✅ Connected to Redis');
    });

    await client.connect();
    redisAvailable = true;
    return client;
  } catch (err) {
    console.error('⚠️ Redis connection failed, running without cache:', err.message);
    client = null;
    redisAvailable = false;
    return null;
  }
}

export function getRedisClient() {
  // Return null instead of throwing — callers should handle null gracefully
  if (!client || !redisAvailable) return null;
  return client;
}
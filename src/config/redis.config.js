import { createClient } from 'redis';

let client;

export async function initRedis() {
  if (client) return client;
  const url = process.env.REDIS_URL || 'redis://localhost:6379';
  client = createClient({ url });

  client.on('error', (err) => {
    console.error('Redis Client Error', err);
  });

  await client.connect();
  console.log('Connected to Redis');
  return client;
}

export function getRedisClient() {
  if (!client) throw new Error('Redis client not initialized. Call initRedis() first.');
  return client;
}
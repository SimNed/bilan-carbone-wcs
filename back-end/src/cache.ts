import { RedisClientType } from "@redis/client";
import { createClient } from "redis";

let cacheClient: RedisClientType;

export const getCache = async () => {
  if (!cacheClient) {
    cacheClient = createClient({ url: process.env.CACHE_URL });
    await cacheClient.connect();
  }
  return cacheClient;
};

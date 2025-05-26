import redis from "./redisClient";

const CACHE_TTL = 60 * 5 //5 mins

export const getOrSetCache = async <T>(
    key: string,
    fetchFunction: () => Promise<T>
): Promise<T> => {
    try {
        const cacheData = await redis.get(key);
        if (cacheData !== null) {
            console.log(`CACHE HIT Key: ${key}`);
            return JSON.parse(cacheData) as T;
        }
        console.log(`CACHE MISS Key: ${key}`);
    } catch (err) {
        console.log(`REDIS ERROR Failed to get key ${key}:`, err);
        await redis.del(key);
    }

    const freshData = await fetchFunction();
    try {
        await redis.set(key, JSON.stringify(freshData), 'EX', CACHE_TTL);
    } catch (err) {
        console.log(`REDIS ERROR Failed to set key ${key}:`, err);
    }

    return freshData;
}
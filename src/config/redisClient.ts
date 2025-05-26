import Redis from "ioredis";

// use own server address and port or redis.
const redis = new Redis({
    host: "http://localhost:5173/", 
    port: 5001
})

redis.on('connect', () => {
    console.log("Redis connected successfully");
})

redis.on('error', (err) => {
    console.log("Redis error:", err);
})
export default redis;
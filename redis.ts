import Redis from "ioredis"

const client = new Redis("rediss://default:AT0CAAIjcDFjZjNiYjFjNTYzOTE0MTg3Yjg5ODVkMDgyZTIyNmU5NXAxMA@boss-mallard-15618.upstash.io:6379");
await client.set('foo', 'bar');
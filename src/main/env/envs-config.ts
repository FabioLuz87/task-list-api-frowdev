import "dotenv/config"

const envsConfig = {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    SERVER_PORT: process.env.SERVER_PORT,
    REDIS_URL: process.env.REDIS_URL,
}

export default envsConfig;
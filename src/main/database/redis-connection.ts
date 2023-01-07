import Redis from "ioredis";
import envsConfig from "../env/envs-config";

export default class RedisConnection {
    private static _connection: Redis;
    public static async connect() {
        if (!this._connection) {
            this._connection = new Redis(envsConfig.REDIS_URL as string);
        }

        console.log("Redis conectado.");
    }

    public static get connection() {
        if (!this._connection) {
            throw new Error("Redis não conectado.");
        }
        return this._connection;
    }
}
import * as dotenv from "dotenv"
import { DataSourceOptions } from "typeorm";

dotenv.config();
const rootDir = process.env.NODE_ENV === "production" ? "dist" : "src";

console.log("ROOT DIR: " + rootDir);
console.log("NODE ENV: " + process.env.NODE_ENV);
console.log("url: " + process.env.DATABASE_URL);


const config: DataSourceOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [rootDir + "/database/entities/*"],
};

export default config;

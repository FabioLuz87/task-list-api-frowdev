import app from "./config/app";
import typeorm from "./database/database-connection";
import envsConfig from "./env/envs-config";
import RedisConnection from "./database/redis-connection"
import path from "path";

const PORT = envsConfig.SERVER_PORT

typeorm
  .initialize()
  .then(() => {
    RedisConnection.connect()
    app.listen(PORT, () => console.log(`Api running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error(err);
  });

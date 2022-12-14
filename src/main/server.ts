import app from "./config/app";
import typeorm from "./database/database-connection";
import envsConfig from "./env/envs-config";

const PORT = envsConfig.SERVER_PORT

typeorm
  .initialize()
  .then(() => {
    app.listen(PORT, () => console.log(`Api running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error(err);
  });

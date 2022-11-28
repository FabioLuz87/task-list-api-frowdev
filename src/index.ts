import express, {Request, Response} from 'express';
import routes from './routes';
import cors from "cors";
import * as dotenv from 'dotenv'
import { pgHelper } from "./database/pg-helper";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
routes(app);

pgHelper
  .connect()
  .then(() => {
    app.listen(process.env.PORT || 3333, () => console.log("API RODANDO"));
  })
  .catch((err) => console.log(err));

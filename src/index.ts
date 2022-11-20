import express, {Request, Response} from 'express';
import routes from './routes';
import cors from "cors";
import * as dotenv from 'dotenv'

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
routes(app);


app.listen(process.env.SERVER_PORT || 3333, () => console.log(`Servidor Iniciado - Porta ${process.env.SERVER_PORT}`));

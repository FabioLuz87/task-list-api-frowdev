import express, {Request, Response} from 'express';
import routes from './routes';
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
routes(app);


app.listen(8080, () => console.log('server start'));

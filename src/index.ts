import express, {Request, Response} from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
routes(app);

app.listen(8080, () => console.log('server start'));

import { Express } from "express";
import { UserController } from "./controllers/user.controller";

export default (app: Express) => {
    app.get('/', (request, response) => response.send('OK'));
    app.get('/users', new UserController().getAll);
    app.get('/user/:userId', new UserController().getById);
    app.post('/user', new UserController().create);
    app.delete('/user/:userId', new UserController().remove);
    app.put('/user/:userId', new UserController().update);
};

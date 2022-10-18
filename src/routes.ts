import { Express } from "express";
import { TaskController } from "./controllers/task.controller";
import { UserController } from "./controllers/user.controller";

export default (app: Express) => {
    app.get('/', (request, response) => response.send('OK'));
    app.get('/users', new UserController().getAll);
    app.get('/user/:userId', new UserController().getById);
    app.post('/user', new UserController().create);
    app.delete('/user/:userId', new UserController().remove);
    app.put('/user/:userId', new UserController().update);
    app.post(
        '/users/:userId/tasks',
        new TaskController().create
    );
    app.get('/users/:userId/tasks', new TaskController().getAll);
    app.put(
        '/users/:userId/tasks/:taskId',
        new TaskController().update
    );
};

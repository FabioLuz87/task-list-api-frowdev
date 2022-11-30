import { Express } from "express";
import { TaskController } from "./controllers/task.controller";
import { UserController } from "./controllers/user.controller";
import { UserMiddleware } from "./middlewares/user.middleware";

export default (app: Express) => {
    app.get('/', (request, response) => response.send('OK'));

    app.post('/login',
        new UserMiddleware().verifyUserLogin,
        new UserController().login,
    )

    //ok
    app.get('/users', new UserController().getAll);

    //ok
    app.get('/user/:userId', new UserController().getById);

    //ok
    app.post(
        '/user', 
        new UserMiddleware().validateUserBody,
        new UserController().create
    );

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

    app.patch(
        '/users/:userId/tasks/:taskId',
        new TaskController().updateArchived
    );

    app.delete(
        '/users/:userId/tasks/:taskId',
        new TaskController().remove
    );
};

import { Express } from "express";
import authRoutes from "../../app/features/authentication/auth.routes";
import { TaskController } from "../../app/features/task/controller/task.controller";
import { UserController } from "../../app/features/user/controller/user.controller";
import { UserMiddleware } from "../../middlewares/user.middleware";

export default (app: Express) => {
    app.get('/', (request, response) => response.send('OK'));
    app.use(authRoutes())

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

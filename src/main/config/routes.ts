import { Express } from "express";
import authRoutes from "../../app/features/authentication/auth.routes";
import userRoutes from "../../app/features/user/user.routes";
import { TaskController } from "../../app/features/task/controller/task.controller";
import { UserController } from "../../app/features/user/controller/user.controller";
import { UserBodyValidator } from "../../app/features/user/validators/user-body.validator";

export default (app: Express) => {
    app.get('/', (request, response) => response.send('OK'));
    app.use(authRoutes())
    app.use(userRoutes())

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

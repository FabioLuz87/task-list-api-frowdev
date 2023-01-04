import { Express } from "express";
import authRoutes from "../../app/features/authentication/auth.routes";
import taskRoutes from "../../app/features/task/task.routes";
import userRoutes from "../../app/features/user/user.routes";

export default (app: Express) => {
    app.get('/', (request, response) => response.status(200).json({ message: "api running"}));
    app.use(authRoutes());
    app.use(userRoutes());
    app.use(taskRoutes());
};

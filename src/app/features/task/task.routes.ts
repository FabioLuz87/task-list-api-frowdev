import { Router } from "express";
import { TaskController } from "./controller/task.controller";

export default () => {   
    const router = Router();

    router.post(
        '/users/:userId/tasks',
        new TaskController().create
    );

    router.get(
        '/users/:userId/tasks', 
        new TaskController().getAll
    );

    router.put(
        '/users/:userId/tasks/:taskId',
        new TaskController().update
    );

    router.patch(
        '/users/:userId/tasks/:taskId',
        new TaskController().updateArchived
    );

    router.delete(
        '/users/:userId/tasks/:taskId',
        new TaskController().remove
    );

  return router;
};

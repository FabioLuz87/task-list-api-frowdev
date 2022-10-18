import { Request, Response } from "express";
import { database } from "../db/database";
import { Task } from "../models/task.model";
import { User } from "../models/user.model";

export class TaskController {
  create(request: Request, response: Response) {
    const {description, detail} = request.body;
    const { userId } = request.params;
    const user = database.find(u => u.id === userId);

    const newTask = new Task( description, detail);

    user?.setTasks(newTask);

    return response.json(newTask.toJson());
  }

  getAll(request: Request, response: Response) {
    const { userId } = request.params;
    const user = database.find(u => u.id === userId);

    let allTransFounded = user?.tasks.map( task => {
        return task.toJson();
    });

    return response.json(allTransFounded);

  }

  remove(request: Request, response: Response) {
    const {userId, taskId} = request.params;
    const user = database.find(u => u.id === userId) as User;
    const index = user.tasks.findIndex(t => t.id === taskId) ;

    user?.deleteTask(index);
    
    return response.json({msg: "transaction deleted"});
  }

  update(request: Request, response: Response) {
    const {userId, taskId} = request.params;    
    const {description, detail} = request.body;
    const user = database.find(u => u.id === userId) as User;
    const index = user.tasks.find(t => t.id === taskId) as Task;
    const t = {id: taskId, description, detail} as Task;   

    user?.editTasks(t);
    
    return response.json({msg: "transaction edited"});
}
}
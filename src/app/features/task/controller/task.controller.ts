import { Request, Response } from "express";
import { Task } from "../../../models/task.model";
import { User } from "../../../models/user.model";
import { TaskRepository } from "../../../../repositories/task.repository";
import { UserRepository } from "../../user/repositories/user.repository";

export class TaskController {
  async create(request: Request, response: Response) {
    const {description, detail} = request.body;
    const { userId } = request.params;

    const taskRepository = new TaskRepository();
    const newTask = new Task( description, detail, userId);

    taskRepository.saveTask(newTask);
    return response.json(newTask.toJson());
  }

  async getAll(request: Request, response: Response) {
    const { userId } = request.params;

    const repository = new TaskRepository;
    const allTasksByUser = await repository.getAll(userId);
    let tasks = allTasksByUser.map(t => t.toJson())
  
    return response.status(200).json(tasks)
  }

  remove(request: Request, response: Response) {
    const { taskId } = request.params;

    const taskRepository = new TaskRepository();
    taskRepository.delete(taskId)

    return response.json({msg: "Tarefa removida com sucesso"});
  }

  async update(request: Request, response: Response) {
    const { taskId } = request.params;    
    const {description, detail} = request.body;

    const taskRepository = new TaskRepository();
    const task = await taskRepository.findTaskById(taskId);
    if(!task) return response.status(404).json({ err: "Tarefa não encontrada" });

    task.update(description, detail);
    taskRepository.update(task);
    
    return response.status(200).json({msg: "Tarefa editada com sucesso"});
  }

  async updateArchived(request: Request, response: Response) {

    console.log('aqui');
    
    const { taskId } = request.params;  

    const taskRepository = new TaskRepository();
    const task = await taskRepository.findTaskById(taskId);
    if(!task) return response.status(404).json({ err: "Tarefa não encontrada" });

    task.updateArchived(!task.isItArchived);
    console.log(task);
    
    taskRepository.update(task);

    return response.status(200).json({msg: "Tarefa arquivada com sucesso"});

  }
}
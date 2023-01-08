import { Request, Response } from "express";
import { Task } from "../../../models/task.model";
import { CreateTaskUsecase } from "../usecases/create-task.usecase";
import { ListaAllTasksUsecase } from "../usecases/listaall-tasks.usecase";
import { RemoveTaskUsecase } from "../usecases/remove-task.usecase";
import { EditTaskUsecase } from "../usecases/edit-task.usecase";
import { ArchivedTaskUsecase } from "../usecases/archived-task.usecase";

export class TaskController {
  async create(request: Request, response: Response) {
    const {description, detail} = request.body;
    const { userId } = request.params;

    try {
      const newTask = new Task( description, detail, userId);
      const usecase = new CreateTaskUsecase();
      await usecase.execute(newTask)
      return response.status(201).json(newTask.toJson());
    } catch (error: any) {
      return response.status(500).json({error: error.message, stack: error})
    }
  }

  async getAll(request: Request, response: Response) {
    const { userId } = request.params;

    try {
      const usecase = new ListaAllTasksUsecase();
      const allTasksByUser = await usecase.execute(userId);
      let tasks = allTasksByUser.map(t => t.toJson());
      return response.status(200).json(tasks);
    } catch (error: any) {
      return response.status(500).json({error: error.message, stack: error})
    }
  }

  async remove(request: Request, response: Response) {
    const { taskId } = request.params;

    try {
      const usecase = new RemoveTaskUsecase();
      await usecase.execute(taskId);  
      return response.status(200).json({msg: "Tarefa removida com sucesso"});
    } catch (error: any) {
      response.status(500).json({error: error.message, stack: error});
    }
  }

  async update(request: Request, response: Response) {
    const { taskId } = request.params;    
    const {description, detail} = request.body;

    try {
      const usecase = new EditTaskUsecase();
      await usecase.execute(taskId, description, detail);
      return response.status(200).json({msg: "Tarefa editada com sucesso"});
    } catch (error: any) {
      return response.status(500).json({error: error.message, stack: error});
    }
  }

  async updateArchived(request: Request, response: Response) {
    
    const { taskId } = request.params;  
    try {
      const usecase = new ArchivedTaskUsecase()
      await usecase.execute(taskId);
      return response.status(200).json({msg: "Tarefa des/arquivada com sucesso"});
    } catch (error: any) {
      return response.status(500).json({error: error.message, stack: error});
    }
  }
}
import { TaskRepository } from "../repositories/task.repository";
import { Task } from "../../../models/task.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.respository";

export class ArchivedTaskUsecase{
    
    constructor(private _repository: TaskRepository, private _cacheRepository: CacheRepository) {}

    async execute(id: string): Promise<void> {
        
        const task = await this._repository.findTaskById(id);
        if(!task) throw new Error("Impossível encontrar tarefa");

        task.updateArchived(!task.isItArchived);
        await this._repository.update(task);
        
        await this._cacheRepository.delete(`tasks:${task.userId}`)
    }
}
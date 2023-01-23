import { TaskRepository } from "../repositories/task.repository";
import { Task } from "../../../models/task.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.respository";

export class CreateTaskUsecase{
    

    constructor(private _repository: TaskRepository, private _chacheRepository: CacheRepository) {}

    async execute(task: Task): Promise<Task | undefined> {

        await this._repository.saveTask(task);
        await this._chacheRepository.delete(`tasks:${task.userId}`);
        
        return task;
    }
}
import { TaskRepository } from "./repositories/task.repository";
import { Task } from "../../../models/task.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.respository";

export class EditTaskUsecase{
    private _repository: TaskRepository;
    private _cacheRepository: CacheRepository;

    constructor() {
        this._repository = new TaskRepository();
        this._cacheRepository = new CacheRepository();
    }

    async execute(id: string, description: string, detail: string ): Promise<Task> {

        const task = await this._repository.findTaskById(id);
        if(!task) throw new Error("Impossível encontrar tarefa");
        
        task.update(description, detail);
        this._repository.update(task);

        await this._cacheRepository.delete(`tasks:${task.userId}`)

        return task;
    }
}
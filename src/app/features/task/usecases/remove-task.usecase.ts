import { CacheRepository } from "../../../shared/database/repositories/cache.respository";
import { TaskRepository } from "../repositories/task.repository";

export class RemoveTaskUsecase{
    private _repository: TaskRepository;
    private _chacheRepository: CacheRepository;

    constructor() {
        this._repository = new TaskRepository();
        this._chacheRepository = new CacheRepository();
    }

    async execute(id: string): Promise<void> {

        const task = await this._repository.findTaskById(id)
        if(!task) throw new Error("Impossível encontrar tarefa");

        await this._repository.delete(id);
        await this._chacheRepository.delete(`tasks:${task.userId}`);
    }
}
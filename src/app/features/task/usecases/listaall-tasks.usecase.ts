import { TaskRepository } from "./repositories/task.repository";
import { Task } from "../../../models/task.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.respository";

export class ListaAllTasksUsecase{
    private _repository: TaskRepository;
    private _cacheRepository: CacheRepository;

    constructor() {
        this._repository = new TaskRepository();
        this._cacheRepository = new CacheRepository();
    }

    async execute(userId: string): Promise<Task[]> {

        let list =  await this._cacheRepository.get<Task[]>(`tasks:${userId}`);

        if(!list){
            list = await this._repository.getAll(userId);
            await this._cacheRepository.set(`tasks:${userId}`,list.map(task => task.toJson));
        }

        return list;
    }


}
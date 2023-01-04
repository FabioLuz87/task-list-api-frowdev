import { TaskRepository } from "./repositories/task.repository";

export class RemoveTaskUsecase{
    private _repository: TaskRepository;

    constructor() {
        this._repository = new TaskRepository();
    }

    async execute(id: string): Promise<void> {

        await this._repository.delete(id);
    }
}
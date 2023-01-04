import { TaskRepository } from "../../../../repositories/task.repository";
import { Task } from "../../../models/task.model";

export class ListaAllTasksUsecase{
    private _repository: TaskRepository;

    constructor() {
        this._repository = new TaskRepository();
    }

    async execute(userId: string): Promise<Task[]> {

        const list = await this._repository.getAll(userId);

        return list;
    }


}
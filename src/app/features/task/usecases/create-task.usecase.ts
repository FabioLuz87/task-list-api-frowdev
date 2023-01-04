import { TaskRepository } from "../../../../repositories/task.repository";
import { Task } from "../../../models/task.model";

export class CreateTaskUsecase{
    private _repository: TaskRepository;

    constructor() {
        this._repository = new TaskRepository();
    }

    async execute(task: Task): Promise<Task | undefined> {

        await this._repository.saveTask(task);

        return task;
    }
}
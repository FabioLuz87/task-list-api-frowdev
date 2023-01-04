import { TaskRepository } from "../../../../repositories/task.repository";
import { Task } from "../../../models/task.model";

export class EditTaskUsecase{
    private _repository: TaskRepository;

    constructor() {
        this._repository = new TaskRepository();
    }

    async execute(id: string, description: string, detail: string ): Promise<Task> {

        const task = await this._repository.findTaskById(id);
        if(!task) throw new Error("Mensagem não encontrada");
        
        task.update(description, detail);
        this._repository.update(task);

        return task;
    }


}
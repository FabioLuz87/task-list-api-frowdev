import { TaskRepository } from "./repositories/task.repository";
import { Task } from "../../../models/task.model";

export class ArchivedTaskUsecase{
    private _repository: TaskRepository;

    constructor() {
        this._repository = new TaskRepository();
    }

    async execute(id: string): Promise<void> {
        
        const task = await this._repository.findTaskById(id);
        if(!task) throw new Error("Mensagem não encontrada");

        task.updateArchived(!task.isItArchived);
        await this._repository.update(task);        
    }
}
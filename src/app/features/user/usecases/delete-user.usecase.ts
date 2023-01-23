import { TaskRepository } from "../../task/repositories/task.repository";
import { UserRepository } from "../repositories/user.repository";

export class DeleteUserUsecase {
    private _userRepository: UserRepository;
    private _taskRepository: TaskRepository;

    constructor() {
        this._userRepository = new UserRepository();
        this._taskRepository = new TaskRepository();
    }

    async execute(id: string): Promise<void> {

        const tasksPerUser = await this._taskRepository.getAll(id)

        if(tasksPerUser.length > 0){
            for(const task of tasksPerUser) {
                await this._taskRepository.delete(task.id)
            }

        }

        this._userRepository.remove(id);
    }
    
}
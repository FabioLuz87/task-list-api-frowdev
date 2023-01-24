import { TaskRepository } from "../../task/repositories/task.repository";
import { UserRepository } from "../repositories/user.repository";

export class DeleteUserUsecase {

    constructor(private _userRepository: UserRepository, private _taskRepository: TaskRepository) {}

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
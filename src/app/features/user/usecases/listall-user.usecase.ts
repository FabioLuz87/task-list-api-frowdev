import { User } from "../../../models/user.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.respository";
import { UserRepository } from "../repositories/user.repository";

export class ListAllUsersUsecase {
    
    constructor(private _repository: UserRepository) {}

    async execute(): Promise<User[]> {
        const users = await this._repository.findAllUsers();       

        return users;
    }

}
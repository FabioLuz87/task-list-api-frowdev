import { User } from "../../../models/user.model";
import { UserRepository } from "../repositories/user.repository";

export class ListAllUsersUsecase {
    private _repository: UserRepository

    constructor() {
        this._repository = new UserRepository();
    }

    async execute(): Promise<User[]> {
        const users = await this._repository.findAllUsers();       

        return users;
    }

}
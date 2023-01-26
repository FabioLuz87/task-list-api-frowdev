import { UserPreferences } from "typescript";
import { User } from "../../../models/user.model";
import { UserRepository } from "../repositories/user.repository";

export class EditUserUsecase {

    constructor( private _repository: UserRepository) {}

    async execute(id: string, name: string, email: string, pass: string): Promise<User> {
        
        const user: User | undefined = await this._repository.findUserById(id);

        if(!user) throw new Error("Impossível editar usuário");
        
        user.update(name, email, pass);

        this._repository.saveUser(user);
        return user;
    }
}
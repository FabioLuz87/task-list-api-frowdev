import { User } from "../../../../models/user.model";
import { RequestData } from "../interfaces/request-data";
import { UserRepository } from "../repositories/user.repository";

export class CreateUser {
    private _repository: UserRepository;

    constructor(userRepository: UserRepository) {
        this._repository = userRepository;
    }

    async execute({ name, email, pass }: RequestData): Promise<any> {
        
        const isUserExists: boolean = await this._repository.verifyUserExistsByEmail(email);
        if(isUserExists) throw new Error("Já existe um usuário com este username");

        const user = new User(name, email, pass);
        await this._repository.saveUser(user);

        console.log(user.toJson())
        return user.toJson();    
    }
}
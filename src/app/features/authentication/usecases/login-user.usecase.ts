import { AuthRepository } from "../repositories/auth.repository";

export class LoginUser{
    private _authRepository: AuthRepository;

    constructor(authRepository: AuthRepository){
        this._authRepository = authRepository;
    } 

    async execute({email, pass}: BodyLogin): Promise<any> {
        const user = await this._authRepository.findUserByEmail(email); 

        if(pass !== user?.pass) throw new Error("Senha incorreta");
        return user;        
    }
}
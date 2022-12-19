import { Response } from "express";
import { UserRepository } from "../../user/repositories/user.repository";
import { AuthRepository } from "../repositories/auth.repository";

export default class LoginUser{
    async execute({username, pass}: BodyLogin, ): Promise<any> {
        const authRepository = new AuthRepository();
        const user = await authRepository.findUserByEmail(username);        

        if(pass !== user?.pass) throw new Error("Senha incorreta");
        return user;        
    }
}
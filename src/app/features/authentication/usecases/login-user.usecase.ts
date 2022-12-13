import { Response } from "express";
import { UserRepository } from "../../../../repositories/user.repository";

export default class LoginUser{
    async execute({ email, pass}: BodyLogin, response: Response): Promise<any> {
        const userRepository = new UserRepository;
        const user = await userRepository.findUserByEmail(email);

        if(pass !== user?.pass) return response.status(403).json({msg:'Senha incorreta'});

        return response.status(202).json({ id: user!.id , name: user!.name});        
    }
}
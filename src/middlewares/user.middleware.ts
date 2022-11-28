import { NextFunction, Request, Response } from "express";
import { database } from "../db/database";
import { User } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";

export class UserMiddleware {

    validateUserBody(request: Request, response: Response, next: NextFunction){
        const {name, email, pass} = request.body;

        if(!name) 
            return response.status(400).json({msg: 'Nome de usuário de não informado'});
        if(!email) 
            return response.status(400).json({msg: 'Email não informação'});
        if(!pass) 
            return response.status(400).json({msg: 'Senha não informada'});
    
        return next();
    }

    async verifyUserLogin(request: Request , response: Response, next: NextFunction) {
        const { email } = request.body;

        const repository = new UserRepository();
        const user = await repository.findUserByEmail(email);

        if(!user) return response.status(404).json({msg: 'Usuário não encontrado'});

        next();
    }

}
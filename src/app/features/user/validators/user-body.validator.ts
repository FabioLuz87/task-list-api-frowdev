import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";

export class UserBodyValidator {

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

}
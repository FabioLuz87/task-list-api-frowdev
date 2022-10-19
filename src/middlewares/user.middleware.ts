import { NextFunction, Request, Response } from "express";
import { database } from "../db/database";
import { User } from "../models/user.model";

export class UserMiddleware {

    validateUserBody(request: Request, response: Response, next: NextFunction){
        const {name, email, pass} = request.body;

        if(!name) 
            return response.status(400).json({err: 'Nome de usuário de não informado'});
        if(!email) 
            return response.status(400).json({err: 'Email não informação'});
        if(!pass) 
            return response.status(400).json({err: 'Senha não informada'});
    
        return next();
    }

    verifyUserLogin(request: Request, response: Response, next: NextFunction) {
        const { email } = request.body;
        const user = database.find((user) => user.email === email) as User;

        if(!user) 
            return response.status(404).json({err: 'Usuário não encontrado'});

        next();
    }

}
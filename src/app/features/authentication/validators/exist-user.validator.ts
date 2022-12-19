import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../user/repositories/user.repository";
import { AuthRepository } from "../repositories/auth.repository";

export default class ExistUserValidator {
  async validate(request: Request, response: Response, next: NextFunction) {
    const { email } = request.body;

    const repository = new AuthRepository();
    const user = await repository.findUserByEmail(email);

    if(!user) return response.status(404).json({msg: 'Usuário não encontrado'});

    next();
  }
  
}

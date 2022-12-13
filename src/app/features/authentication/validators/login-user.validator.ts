import { NextFunction, Request, Response } from "express";

export default class LoginUserValidator {
  validate(request: Request, response: Response, next: NextFunction) {
    const { username, pass } = request.body;

    if (!username) {
      return response.status(400).json({ error: "Campo Username obrigátorio" });
    }

    if (!pass) {
      return response.status(400).json({ error: "Campo de Senha obrigátorio" });
    }

    return next();
  }
}

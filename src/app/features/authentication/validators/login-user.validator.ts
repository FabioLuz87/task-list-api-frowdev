import { NextFunction, Request, Response } from "express";

export default class LoginUserValidator {
  validate(request: Request, response: Response, next: NextFunction) {
    const { email, pass } = request.body;

    if (!email) {
      return response.status(400).json({ error: "Campo Email obrigátorio" });
    }

    if (!pass) {
      return response.status(400).json({ error: "Campo de Senha obrigátorio" });
    }

    return next();
  }
}

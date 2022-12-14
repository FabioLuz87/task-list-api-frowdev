import { Request, Response } from "express";
import LoginUser from "../usecases/login-user.usecase";

export default class AuthController {
    async loginUser(request: Request, response: Response) {
        try {
            const { email, pass } = request.body;

            const useCase = new LoginUser();

            const logindata = await useCase.execute({email, pass})

            return response.status(200).json(logindata);
        } catch(error: any) {
            return response.status(400).json({ error: error.message, stack: error });
        }
    }
}
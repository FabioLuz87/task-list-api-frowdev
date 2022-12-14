import { Request, Response } from "express";
import { UserController } from "../../user/controller/user.controller";

export default class AuthController {
    async loginUser(request: Request, response: Response) {
        try {
            const { username, password } = request.body;

            const useCase = new UserController();

            const token = await useCase.login(request, response)

            return response.status(200).json(token);
        } catch(error: any) {
            return response.status(400).json({ error: error.message, stack: error });
        }
    }
}
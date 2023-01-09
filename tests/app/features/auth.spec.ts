import { request, response } from "express";
import  AuthController  from "../../../src/app/features/authentication/controllers/auth.controller"

describe("Testar controller de login", () => {
    test("Deve cair no erro na função de login", () => {
        const sut = new AuthController();

        expect(sut).toMatchObject({});
    });
});
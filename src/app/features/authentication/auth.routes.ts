import { Router, Express } from "express";
import AuthController from "./controllers/auth.controller";
import ExistUserValidator from "./validators/exist-user.validator";
import LoginUserValidator from "./validators/login-user.validator";

export default () => {   
  const router = Router();

  router.post(
    "/login",
    new LoginUserValidator().validate,
    new ExistUserValidator().validate,
    new AuthController().loginUser
  );

  return router;
};

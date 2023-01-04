import { Router } from "express";
import app from "../../../main/config/app";
import { UserController } from "./controller/user.controller";
import { UserBodyValidator } from "./validators/user-body.validator";

export default () => {
  const router = Router();

  router.get('/users', new UserController().getAll);
  router.get('/user/:userId', new UserController().getById);
  router.post(
    '/user', 
    new UserBodyValidator().validateUserBody,
    new UserController().create
  );
  router.delete('/user/:userId', new UserController().remove);
  router.put('/user/:userId', new UserController().update);

  return router;
};

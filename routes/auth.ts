import { Router } from "express";
import { RoutesMiddleware } from "../types";
import { fieldsValidator } from "../middlewares/validators";

const router = Router();

const signupValidator = fieldsValidator('email', 'username', 'password');

const authRoutes: RoutesMiddleware = (db) => {
  router.post('/signup', signupValidator, )

  return router;
};

export default authRoutes;

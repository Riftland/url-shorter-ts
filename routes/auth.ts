import { Router } from "express";
import { RoutesMiddleware } from "../types";
import { authorizer, fieldsValidator } from "../middlewares";
import { signin, signout, signup } from "../controllers/auth";

const router = Router();

const signupValidator = fieldsValidator('email', 'username', 'password');
const signinValidator = fieldsValidator('email', 'password');

const authRoutes: RoutesMiddleware = (db) => {
  router.post('/signup', signupValidator, signup(db));
  router.post('/signin', signinValidator, signin(db));
  router.post('/signout', authorizer(), signout(db));

  return router;
};

export default authRoutes;

import { Router } from "express";
import { RoutesMiddleware } from "../types";
import usersRoutes from "./users";
import authRoutes from './auth';
import generatorRoutes from "./generator";

const router = Router();

const routesDispatcher: RoutesMiddleware = (db) => {
  router.use('/auth', authRoutes(db));
  router.use('/users', usersRoutes(db));
  router.use('/short', generatorRoutes(db));

  return router;
};

export default routesDispatcher;

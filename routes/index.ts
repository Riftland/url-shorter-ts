import { Router } from "express";
import { RoutesMiddleware } from "../types";
import usersRoutes from "./users";

const router = Router();

const routesDispatcher: RoutesMiddleware = (db) => {
  router.use("/users", usersRoutes(db));

  return router;
};

export default routesDispatcher;

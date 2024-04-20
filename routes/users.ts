import { Router } from "express";
import controllers from "../controllers/users";
import { RoutesMiddleware } from "../types";

const router = Router();

const usersRoutes: RoutesMiddleware = (db) => {
  router.get("/", controllers.getUser());

  return router;
};

export default usersRoutes;

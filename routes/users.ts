import { Router } from "express";
import { getUser, getUrlsCreated } from "../controllers/users";
import { RoutesMiddleware } from "../types";
import { authorizer } from "../middlewares";

const router = Router();

const usersRoutes: RoutesMiddleware = (db) => {
  router.get('/', authorizer(), getUser());
  router.get('/shorts', authorizer(), getUrlsCreated(db));

  return router;
};

export default usersRoutes;

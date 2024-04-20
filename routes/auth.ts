import { Router } from "express";
import { RoutesMiddleware } from "../types";

const router = Router();

const authRoutes: RoutesMiddleware = (db) => {
  return router;
};

export default authRoutes;

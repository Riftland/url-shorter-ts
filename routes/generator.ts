import { Router } from "express";
import { RoutesMiddleware } from "../types";
import { authorizer, checkUrl } from "../middlewares";
import { createShortUrl, redirectToUrl } from "../controllers/generator";

const router = Router();

const generatorRoutes: RoutesMiddleware = (db) => {
    router.post('/', authorizer(), createShortUrl(db));
    router.get('/:id', authorizer(false), checkUrl(), redirectToUrl(db));

    return router;
}

export default generatorRoutes;
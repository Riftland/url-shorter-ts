import cookieParser from "cookie-parser";
import express from "express";
import db from "./configs/db";
import { errorManager, notFound, stdLog } from "./middlewares";
import routesDispatcher from "./routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(routesDispatcher(db));

app.use(notFound);
app.use(errorManager);

app.listen(process.env.PORT, stdLog);

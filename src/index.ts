import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import config from "./config";
import { router } from "./route/";
import type { ErrorRequestHandler } from "express";

import db from "./database";

dotenv.config();
const app: Express = express();
const port = config.PORT;

// db
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {};

app.use(express.json());
app.use(errorHandler);
app.use("/api/product", router);
app.get("/", (req: Request, res: Response) => {
  return res.json({
    Hello: "world",
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is at http://localhost:${port}`);
});

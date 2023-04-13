import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import config from "./config";
import products from './routes/products'
import db from './database'

dotenv.config();
const app: Express = express();
const port = config.PORT;

// db
app.get("/", (req: Request, res: Response) => {
  res.json({
    Hello: "world",
  });
});
app.use("/api/products", products)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is at http://localhost:${port}`);
});

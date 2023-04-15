import express, { Express, Request, Response } from "express";
import config from "./config";
import { routerProduct } from "./route/";


const app: Express = express();
const port = config.PORT;

app.use(express.json());
app.use("/api/product", routerProduct);
app.get("/", (req: Request, res: Response) => {
  return res.json({
    Hello: "world",
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is at http://localhost:${port}`);
});

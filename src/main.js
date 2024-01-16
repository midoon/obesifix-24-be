import {} from "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import healthRouter from "./route/health_route.js";
import userRouter from "./route/user_route.js";
import mlRouter from "./route/ml_route.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));

app.use(healthRouter);
app.use(userRouter);
app.use(mlRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.info("App start in port : " + port);
});

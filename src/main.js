import {} from "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.info("App start in port : " + port);
});

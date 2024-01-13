import express from "express";
import decodeTokenFirebase from "../middleware/firebase_middleware.js";
const healthRouter = express.Router();

healthRouter.get("/", (req, res) => {
  res.status(200).send({ status: true, message: "Healty" });
});

healthRouter.get("/hello", decodeTokenFirebase, (req, res) => {
  console.log(req.user);
  res.status(200).send({ status: true, message: "Hello From  Server" });
});

export default healthRouter;

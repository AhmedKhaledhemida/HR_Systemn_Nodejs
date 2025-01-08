process.on("uncaughtException", (err) => {
  console.log({ error: err });
});
import express from "express";
import { bootstrap } from "./bootstrap.js";
import { db } from "./Database/dbconnection.js";
import { globalError } from "./src/Utils/globalError.js";
import "dotenv/config";
import { AppError } from "./src/Utils/appError.js";
import cors from "cors";
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
bootstrap(app);
app.use("*", (req, res, next) => {
  next(new AppError(`Route not found ${req.originalUrl}`, 404));
});
app.use(globalError);

process.on("unhandledRejection", (err) => {
  console.log({ error: err });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

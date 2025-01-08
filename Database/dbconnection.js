import mongoose from "mongoose";

export const db = mongoose
  .connect("mongodb://localhost:27017/HRSystem")
  .then(() => console.log("DB connection successfuly"))
  .catch((error) => console.log("DB Faild Connection"));

import express from "express";
import authRoute from "./routes/auth.route.js";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";

dotenv.config();

const app = express();

app.use("/api/v1/user", authRoute);

app.listen(3000, () => {
  dbConnect();
  console.log("server is running on 3000");
});

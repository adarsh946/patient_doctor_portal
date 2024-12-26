import express from "express";
import authRoute from "./routes/auth.route.js";

const app = express();

app.use("/api/v1/user", authRoute);

import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/router";
import path from "path";

import "./database/database";

const app = express();

// * middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.use(
  "/storage/packages",
  express.static(path.join(__dirname, "..", "packages"))
);

// * setup routes
app.use(router);

export default app;

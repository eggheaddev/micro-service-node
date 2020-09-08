import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/router";

import "./database/database";

const app = express();

// * middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(morgan("dev"));
app.use(cors());

// * setup routes
app.use(router);

export default app;

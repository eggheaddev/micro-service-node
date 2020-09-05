import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser"
import passport from "passport"
import connectRouter from "./routes/connect";
import packageRouter from "./routes/package"

import "./database/database";

const app = express();

// * middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(morgan("dev"));
app.use(cors());

// * setup routes
app.use(connectRouter);
app.use("/", passport.authenticate("jwt", { session: false }), packageRouter)

export default app;

import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/routes";

import "./database/database";

const app = express();

// * middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// * setup routes
app.use(routes);

export default app;

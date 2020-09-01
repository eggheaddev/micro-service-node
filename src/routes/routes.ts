import { Router, Request, Response } from "express";
import { join } from "../controllers/io";

const route = Router();

// * redirect message
route.get("/", join);

export default route;

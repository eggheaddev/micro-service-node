import { Router } from "express";
import { join, signup, signin } from "../controllers/io";

const route = Router();

// * redirect message
route.get("/", join);

// * register into the service
route.post("/connect", signup);

// * login
route.post("/join", signin);

export default route;

import { Router } from "express";
import { signup } from "../controllers/connection";

const route = Router();

// * register into the service
route.post("/connect", signup);


export default route;

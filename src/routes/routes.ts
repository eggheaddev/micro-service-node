import { verifyToken } from "../middlewares/accessVerification";
import { signup, getUser } from "../controllers/connection";
import { Router } from "express";

const route = Router();

// * register into the service
route.post("/connect", signup);

route.get("/user", verifyToken, getUser);
export default route;

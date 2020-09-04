import { Router } from "express";
// import { verifyToken } from "../middlewares/accessVerification";
import { signup, getService, checkAuth, removeService } from "../controllers/connection";
import passport from "passport"

const route = Router();

// * register into the service
route.post("/connect", signup);

// non-production routes? <
route.get("/authenticated", passport.authenticate("jwt", { session: false }), checkAuth);
route.post("/get_service", getService)
route.post("/remove_service", removeService)
// />

export default route;

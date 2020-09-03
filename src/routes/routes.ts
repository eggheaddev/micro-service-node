import { Router } from "express";
import { verifyToken } from "../middlewares/accessVerification";
import { signup, getUser } from "../controllers/connection";
import {
  getPackages,
  getOnePackage,
  submitPackage,
  editPackage,
  removePackage,
} from "../controllers/package";

const route = Router();

// * register into the service
route.post("/connect", signup);
route.get("/user", verifyToken, getUser);

// Packages
route.get("/packages", getPackages);

route.get("/package/:id", getOnePackage);
route.post("/package", submitPackage);
route.put("/package/:id", editPackage);
route.delete("/package/:id", removePackage);

export default route;

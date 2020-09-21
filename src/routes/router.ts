import { Router } from "express";
import {
  getPackages,
  getOnePackage,
  submitPackage,
  editPackage,
  removePackage,
} from "../controllers/package";
import { removeService, signup } from "../controllers/connection";
import { verifyToken } from "../middlewares/accessVerification";

const route = Router();

route.post("/connect", signup);
route.post("/remove_service", verifyToken, removeService);

// Packages
route.get("/packages", verifyToken, getPackages);
route.get("/package/:id", verifyToken, getOnePackage);
route.post("/package", verifyToken, submitPackage);
route.put("/package/:id", verifyToken, editPackage);
route.delete("/package/:id", verifyToken, removePackage);

export default route;

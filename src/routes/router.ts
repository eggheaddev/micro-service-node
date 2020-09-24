import { Router } from "express";
import {
  getPackages,
  getOnePackage,
  submitPackage,
  editPackage,
  removePackage,
} from "../controllers/package";
import { Disconnect, Connect } from "../controllers/connection";
import { verifyToken } from "../middlewares/accessVerification";
import { notifyObservers } from "../middlewares/notifyObservers";

const route = Router();

// * paths for registering and deleting services
route.post("/api/service/connect", Connect);
route.post("/api/service/disconnect", verifyToken, Disconnect);

// Packages
route.get("/packages", getPackages);
route.get("/package/:id", verifyToken, getOnePackage);
route.post("/package", verifyToken, notifyObservers, submitPackage); //verifyToken,
route.put("/package/:id", verifyToken, editPackage);
route.delete("/package/:id", verifyToken, removePackage);

export default route;

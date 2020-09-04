import { Router } from "express";
import {
  getPackages,
  getOnePackage,
  submitPackage,
  editPackage,
  removePackage,
} from "../controllers/package";

const route = Router();

// Packages
route.get("/packages", getPackages);

route.get("/package/:id", getOnePackage);
route.post("/package", submitPackage);
route.put("/package/:id", editPackage);
route.delete("/package/:id", removePackage);

export default route;

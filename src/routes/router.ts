import { getPackages, getOnePackage } from "../controllers/package";
import { Upload, uploadMiddleware } from "../controllers/uploadFiles";
import { Disconnect, Connect } from "../controllers/connection";
import { verifyToken } from "../middlewares/accessVerification";
import { existVersion } from "../middlewares/existVersion";
import { Router } from "express";

const route = Router();

// * paths for registering and deleting services
route.post("/api/service/connect", Connect);
route.post("/api/service/disconnect", verifyToken, Disconnect);

// * cli upload endpoint
route.post("/api/upload", existVersion, uploadMiddleware.any(), Upload);

// * get packages
route.get("/api/packages", verifyToken, getPackages);
route.get("/api/package", verifyToken, getOnePackage);

export default route;

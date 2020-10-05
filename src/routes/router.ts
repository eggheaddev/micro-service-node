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

// * not found resource handler
route.use(verifyToken, (request, response, next) => {
  if (!request.route) {
    response.status(404);
    response.json({
      error: true,
      message: "this path or resource was not found",
    });
    return;
  }

  next();
});

export default route;

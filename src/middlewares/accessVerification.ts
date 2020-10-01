import { existToken, getDataService } from "../controllers/modules";
import Service from "../models/connectionService";
import { Response, Request } from "express";

async function verifyToken(
  request: Request,
  response: Response,
  next: Function
) {
  const data = getDataService(request);

  if (!existToken(request)) {
    response.status(401);
    response.json({
      error: true,
      message: "you have to send the access token",
    });
    return;
  }

  if (data?.err) {
    response.status(401);
    response.json({
      error: true,
      message: "the token received is invalid",
    });
    return;
  }

  const queryIp = await Service.findOne({ ip: data.sub });
  const queryServiceName = await Service.findOne({ ServiceName: data.name });

  if (!(queryIp && queryServiceName)) {
    response.status(404);
    response.json({
      error: true,
      message: "your service was not found in the database",
    });
    return;
  }

  next();
}

export { verifyToken };

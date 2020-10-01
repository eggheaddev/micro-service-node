import Service from "../models/connectionService";
import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import "./passportHandler";

function JwtSign(serviceName: string, serviceIP: string) {
  return JWT.sign(
    {
      sub: serviceIP,
      name: serviceName,
    },
    process.env.SECRET_JWT!
  );
}

async function Connect(request: Request, response: Response) {
  const { ServiceName, ip, description, endPoint } = request.body;
  const ipQuery = await Service.findOne({ ip });
  const serviceQuery = await Service.findOne({ ServiceName });

  if (!(ip && ServiceName && description && endPoint)) {
    response.status(400);
    response.json({
      error: true,
      message:
        "all fields are required, ip, service Name, Service Description, endPoint",
    });
    return;
  }

  if (ipQuery || serviceQuery) {
    response.status(409);
    response.json({
      error: true,
      message:
        "there is already a service with the same ServiceName or ip address",
    });
    return;
  }

  const newService = new Service({
    ...request.body,
    created_at: new Date().toUTCString(),
  });

  const token = JwtSign(ServiceName, ip);

  try {
    await newService.save();
  } catch (err) {
    console.log(err);
  }

  response.cookie("access_token", token, { httpOnly: true, sameSite: true });
  response.status(200);
  response.json({
    created: true,
    accessToken: true,
    ID: newService._id,
    created_at: newService.created_at,
    message: "user created",
    error: false,
  });
  return;
}

async function Disconnect(request: Request, response: Response) {
  try {
    const service = await Service.findOneAndDelete({
      ServiceName: request.body?.ServiceName,
    });

    if (!service) {
      response.status(404);
      response.json({ message: "service not found", error: true });
      return;
    }

    response.status(200);
    response.clearCookie("access_token");
    response.json({ message: "service removed", error: false });
    return;
  } catch (err) {
    console.log(err);
    response.status(500);
    response.json({
      message: "unknown error by removing service",
      error: true,
    });
    return;
  }
}

export { Connect, Disconnect };

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

async function signup(request: Request, response: Response) {
  const { ServiceName, ip, description } = request.body;
  const ipQuery = await Service.findOne({ ip });
  const serviceQuery = await Service.findOne({ ServiceName });

  if (!(ip && ServiceName && description)) {
    response.status(500);
    response.json({
      error: true,
      msg: "all fields are required, ip, service Name, Service Description",
    });
    return;
  }

  if (ipQuery || serviceQuery) {
    response
      .json({
        error: true,
        msg:
          "there is already a service with the same ServiceName or ip address",
      })
      .status(500);
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
    Service: newService,
    accessToken: true,
    ID: newService._id,
    created_at: newService.created_at,
    msg: "user created",
    error: false,
  });
}

// non-production controllers? <
async function checkAuth(request: Request, response: Response) {
  const { ServiceName } = JSON.parse(JSON.stringify(request.user));

  response.json({ service: ServiceName, isAuthenticated: true }).status(200);
}

async function getService(request: Request, response: Response) {
  const service = await Service.findOne({
    ServiceName: request.body.ServiceName,
  });

  if (!service)
    return response.json({ msg: "service not found", error: true }).status(400);

  response
    .json({ service: service, msg: "service found", error: false })
    .status(200);
}

async function removeService(request: Request, response: Response) {
  try {
    const service = await Service.findOneAndDelete({
      ServiceName: request.body.ServiceName,
    });

    if (!service)
      return response
        .json({ msg: "service not found", error: true })
        .status(400);

    response
      .json({ msg: "service removed", error: false })
      .clearCookie("access_token")
      .status(200);
  } catch (err) {
    console.log(err);
    response
      .json({ msg: "unknow error by removing service", error: true })
      .status(500);
  }
}
// />

export { signup, checkAuth, getService, removeService };

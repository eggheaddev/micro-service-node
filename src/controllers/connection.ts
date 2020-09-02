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

  await newService.save();

  response.cookie("access_token", token, { httpOnly: true, sameSite: true });
  response.status(200);
  response.json({
    created: true,
    Service: newService,
    accessToken: true,
    ID: newService._id,
    created_at: newService.created_at,
  });
}

async function getUser(request: Request, response: Response) {
  response.json({ ok: true });
}

export { signup, getUser };

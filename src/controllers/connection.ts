import { Request, Response } from "express";
import Service, { IconnectionService } from "../models/connectionService";
import JWT from "jsonwebtoken"
import "./passportHandler"
import dotenv from "dotenv"
dotenv.config()

function JwtSign(serviceName: string, serviceIP: string) {
  return JWT.sign({
    sub: serviceIP,
    name: serviceName
  }, process.env.SECRET_JWT!)
}

async function signup(request: Request, response: Response) {
  console.log(request.body);

  const { ServiceName, ip, description } = request.body;
  const ipQuery = await Service.findOne({ ip });
  const serviceQuery = await Service.findOne({ ServiceName });

  if (!(ip && ServiceName && description)) {
    response.status(500);
    response.json({ error: true, msg: "all fields are required" });
    return;
  }

  if (ipQuery || serviceQuery) {
    response.json({
      error: true,
      msg: "there is already a service with the same ServiceName or ip address",
    })
    .status(500);
    return;
  }

  const newService = new Service({
    ...request.body,
    created_at: new Date().toISOString(),
  });

  const token = JwtSign(ServiceName, ip)

  await newService.save();
  response.cookie("access_token", token, {httpOnly: true, sameSite: true})
  response.json({ msg: "created", newService, jwt_token: true });
  response.status(200);
}

export { signup };

import { Request, Response } from "express";
import Service, { IconnectionService } from "../models/connectionService";

// * '/' home massage
function join(request: Request, response: Response) {
  response.json({ msg: "use connect port!" });
  response.status(200);
}

function signin(request: Request, response: Response) {
  response.json({ msg: "signin" });
  response.status(200);
}

async function signup(request: Request, response: Response) {
  console.log(request.body);
  if (
    !(request.body.ip && request.body.ServiceName && request.body.description)
  ) {
    response.status(500);
    response.json({ error: true, msg: "all fields are required" });
    return;
  }
  // TODO(ghaerdi) jwt validation signup

  const { ServiceName, ip } = request.body;

  const ipQuery = await Service.findOne({ ip });
  const serviceQuery = await Service.findOne({ ServiceName });

  if (ipQuery || serviceQuery) {
    response
      .json({
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

  await newService.save();
  response.json({ msg: "created", newService });
  response.status(200);
}

export { join, signin, signup };

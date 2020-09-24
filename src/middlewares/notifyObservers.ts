import Service from "../models/connectionService";
import { Response, Request } from "express";
import Axios from "axios";

export async function notifyObservers(
  request: Request,
  response: Response,
  next: Function
) {
  const services = await Service.find();

  for (const service of services) {
    try {
      const observerResponse = await Axios.post(
        service.endPoint,
        {
          ...request.body,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(observerResponse.data);
      if (observerResponse.status >= 400) {
        response.status(500);
        response.json({
          msg: observerResponse.data?.message,
          error: true,
        });
        return;
      }
    } catch (err) {
      console.log(err);
      response.status(500);
      response.json({
        msg: "unexpected error",
        error: true,
      });
      return;
    }
  }

  next();
}

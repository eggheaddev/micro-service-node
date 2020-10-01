import Packages from "../models/packageSchema";
import { Request, Response } from "express";

async function getPackages(_request: Request, response: Response) {
  const allPackages = await Packages.find(
    {},
    {
      _id: 0,
    }
  );

  response.status(200);
  response.json({
    message: "packages found",
    error: false,
    packages: allPackages,
  });
  return;
}

async function getOnePackage(request: Request, response: Response) {
  const { name } = request.body;

  const onePackage = await Packages.findOne({ name }, { _id: 0 });

  if (!onePackage) {
    response.status(400);
    response.json({
      package: onePackage,
      error: true,
      message: "package not found",
    });

    return;
  }

  response.status(200);
  response.json({
    message: "package found",
    error: false,
    packages: onePackage,
  });
  return;
}

export { getPackages, getOnePackage };

import Packages from "../models/packageSchema";
import { Request, Response } from "express";

export async function existVersion(
  request: Request,
  response: Response,
  next: Function
) {
  try {
    const version = request.headers["package-version"] as string;
    const name = request.headers["package-name"] as string;
    const author = request.headers["owner-name"] as string;

    const existPackage = await Packages.findOne({ name });
    const Package = await Packages.findOne({ name, author });
    const exist_version = Package?.versions.includes(version);

    if (existPackage && existPackage?.author !== author) {
      response.status(500);
      response.json({
        error: true,
        message:
          "the package you are trying to load already exists and you do not own it",
      });
      return;
    }

    if (exist_version) {
      response.status(500);
      response.json({
        error: true,
        message:
          "the version of the package you are trying to publish already exists",
      });
      return;
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    response.status(500);
    response.json({
      error: true,
      message: "an error occurred verifying the package version",
    });
    return;
  }
}

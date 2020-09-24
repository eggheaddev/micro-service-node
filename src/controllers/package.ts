import Package from "../models/packageSchema";
import { Request, Response } from "express";

async function getPackages(request: Request, response: Response) {
  console.log("header => ", request.headers);
  const onePackage = await Package.findOne();
  const allPackages = await Package.find();

  if (!onePackage) {
    response.status(400);
    response.json({
      Packages: allPackages,
      msg: "No packages found",
      error: true,
    });
    return;
  }

  response.status(200);
  response.json({
    Packages: allPackages,
    msg: "packages found",
    error: false,
  });
  return;
}

async function getOnePackage(request: Request, response: Response) {
  const onePackage = await Package.findOne({ package_id: request.params.id });

  if (!onePackage) {
    response.status(400);
    response.json({
      Package: onePackage,
      msg: "package not found",
      error: true,
    });

    return;
  }

  response.status(200);
  response.json({ Packages: onePackage, msg: "package found", error: false });
  return;
}

async function submitPackage(request: Request, response: Response) {
  const { author_id, owner, name } = request.body;
  const queryPackage = await Package.findOne({ name });

  if (!(author_id && owner)) {
    response.status(500);
    response.json({ msg: "error receiving username or userId", error: true });
    return;
  }

  if (!(name)) {
    response.status(400);
    response.json({ msg: "package name and files are necessary", error: true });
    return;
  }

  if (queryPackage) {
    response.status(400);
    response.json({ msg: "the package name already exist", error: true });
    return;
  }

  const newPackage = new Package({
    ...request.body,
    created_at: new Date().toUTCString(),
  });

  try {
    await newPackage.save();
    response.status(200);
    response.json({
      Package: newPackage,
      msg: "package created and saved",
      error: false,
    });
  } catch (err) {
    console.log(err);
    response.status(500);
    response.json({ msg: "unknown error by creating package", error: true });
    return;
  }
}

async function editPackage(request: Request, response: Response) {
  try {
    const editPackage = await Package.findOneAndUpdate(
      { _id: request.params.id },
      { ...request.body }
    );

    if (!editPackage) {
      response.status(400);
      response.json({ msg: "package not found", error: true });
      return;
    }

    const editedPackage = await Package.findOne({ _id: request.params.id });

    if (JSON.stringify(editPackage) === JSON.stringify(editedPackage)) {
      response.status(300);
      response.json({ msg: "package found but not edited", error: false });
      return;
    }

    response.status(200);
    response.json({
      Package: editedPackage,
      msg: "package edited",
      error: false,
    });
  } catch (err) {
    console.log(err);
    response.status(500);
    response.json({ msg: "unknown error by edit", error: true });
  }
  return;
}

async function removePackage(request: Request, response: Response) {
  try {
    const findPackage = await Package.findOneAndDelete({
      _id: request.params.id,
    });

    if (!findPackage) {
      response.status(400);
      response.json({ msg: "package not found", error: true });
      return;
    }

    response.status(200);
    response.json({ msg: "package removed", error: false });
  } catch (err) {
    console.log(err);
    response.status(500);
    response.json({ msg: "unknown error by removing", error: true });
  }
  return;
}

export {
  getPackages,
  getOnePackage,
  submitPackage,
  editPackage,
  removePackage,
};

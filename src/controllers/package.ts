import Package from "../models/packageSchema";
import { Request, Response } from "express";

async function getPackages(request: Request, response: Response) {
  const allPackages = await Package.find();
  response
    .json({
      Packages: allPackages,
      msg: "packages found",
      error: false,
    })
    .status(200);
}

async function getOnePackage(request: Request, response: Response) {
  const onePackage = await Package.findOne({ _id: request.params.id });
  response
    .json({ Packages: onePackage, msg: "package found", error: false })
    .status(200);
}

async function submitPackage(request: Request, response: Response) {
  const { author_id, owner, name, files } = request.body;
  const queryPackage = await Package.findOne({ name });

  if (!(author_id && owner))
    return response
      .json({ msg: "error receiving username or userid", error: true })
      .status(500);
  if (!(name && files))
    return response
      .json({ msg: "package name and files are necessary", error: true })
      .status(400);

  if (queryPackage)
    return response
      .json({ msg: "the package name already exist", error: true })
      .status(400);

  const newPackage = new Package({
    ...request.body,
    created_at: new Date().toUTCString(),
  });

  try {
    await newPackage.save();
    response.json({
      Package: newPackage,
      msg: "package created and saved",
      error: false,
    });
  } catch (err) {
    console.log(err);
    response
      .json({ msg: "unknow error by creating package", error: true })
      .status(500);
  }
}

async function editPackage(request: Request, response: Response) {
  try {
    const editPackage = await Package.findOneAndUpdate(
      { _id: request.params.id },
      { ...request.body }
    );
    console.log(editPackage);
    if (!editPackage)
      return response
        .json({ msg: "package not found", error: true })
        .status(400);
    const editedPackage = await Package.findOne({ _id: request.params.id });
    console.log(editedPackage);
    if (JSON.stringify(editPackage) === JSON.stringify(editedPackage))
      return response
        .json({ msg: "package found but not edited", error: false })
        .status(300);
    response.json({ Package: editedPackage, msg: "package edited", error: false }).status(200);
  } catch (err) {
    console.log(err);
    response.json({ msg: "unknow error by edit", error: true }).status(500);
  }
}

async function removePackage(request: Request, response: Response) {
  try {
    const findPackage = await Package.findOneAndDelete({
      _id: request.params.id,
    });
    if (!findPackage)
      return response
        .json({ msg: "package not found", error: true })
        .status(400);
    response.json({ msg: "package removed", error: false }).status(200);
  } catch (err) {
    console.log(err);
    response.json({ msg: "unknow error by removing", error: true }).status(500);
  }
}

export {
  getPackages,
  getOnePackage,
  submitPackage,
  editPackage,
  removePackage,
};

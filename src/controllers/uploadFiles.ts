import Packages from "../models/packageSchema";
import { Response, Request } from "express";
import Multer from "multer";
import fs from "fs-extra";
import path from "path";

export async function Upload(request: Request, response: Response) {
  const description = request.headers["package-description"] as string;
  const repository = request.headers["package-repository"] as string;
  const version = request.headers["package-version"] as string;
  const author = request.headers["owner-name"] as string;
  const name = request.headers["package-name"] as string;
  const entry = request.headers["entry-file"] as string;
  const done = request.headers["upload-done"] as string;

  if (done !== "finish") {
    response.status(200);
    response.json({
      uploadDone: true,
    });
  } else {
    const exist = await Packages.findOne({
      name,
      author,
    });

    if (!exist) {
      const newPackage = new Packages({
        author,
        name,
        description,
        entry,
        repository,
        created_at: new Date().toUTCString(),
        storage_path: path.join("package", name).replace(/\\/g, "/"),
        versions: [version],
      });

      await newPackage.save();
    } else {
      await Packages.updateOne(
        {
          name,
          author,
        },
        {
          entry,
          description,
          repository,
          versions: [...exist.versions, version],
        }
      );
    }

    response.status(200);
    response.json({
      ok: true,
    });
  }
}

// * create a simple delay
const delay = (n: number) => new Promise((res) => setTimeout(res, n * 1000));

const storage = Multer.diskStorage({
  destination: function (_req, _file, next) {
    next(null, path.join(__dirname, "..", "..", "temp"));
  },
  filename: async function (_req, file, next) {
    const pkg = _req.headers["package-name"] as string;
    const rootPath = _req.headers["file-path"] as string;
    const version = _req.headers["package-version"] as string;

    next(null, file.originalname);

    try {
      await delay(2);
      await fs.move(
        path.join(__dirname, "..", "..", "temp", file.originalname!),
        path.join(__dirname, "..", "..", "packages", pkg, version, rootPath!),
        {
          overwrite: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
});

export const uploadMiddleware = Multer({
  storage,
});

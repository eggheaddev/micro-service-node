import { model, Schema, Document } from "mongoose";
import Service from "./connectionService";
import Axios from "axios";

export interface PackageSchema extends Document {
  author: string;
  name: string;
  entry: string;
  description?: string;
  created_at: string;
  repository?: string;
  storage_path: string;
  versions: string[];
}

const packageSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    entry: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    created_at: {
      type: String,
      required: true,
    },
    repository: {
      type: String,
    },
    storage_path: {
      type: String,
      required: true,
    },
    versions: {
      type: Array,
      required: true,
    },
  },
  {
    versionKey: false,
    validateBeforeSave: true,
  }
);

// * notify observers services
packageSchema.pre<PackageSchema>("save", async function (next: Function) {
  const services = await Service.find();

  const owner = this.author;
  const packageName = this.name;
  const description = this.description ?? "no description";
  const createdAt = this.created_at;
  const storagePath = this.storage_path;
  const repository = this.repository ?? "no repository";
  const versions = this.versions;
  const entry = this.entry;

  for (const service of services) {
    try {
      await Axios.post(
        service.endPoint,
        {
          package_name: packageName,
          owner,
          entry,
          description,
          repository,
          versions,
          storage_path: storagePath,
          created_at: createdAt,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
      return;
    }
  }

  next();
});

export default model<PackageSchema>("Packages", packageSchema);

import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
export interface PackageSchema extends Document {
  author: string;
  name: string;
  description?: string;
  created_at: string;
  files: {
    [key: string]: {
      type: string;
      hash: string;
      path: string;
    };
  };
}

const packageSchema = new Schema({
  author: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  created_at: {
    type: String,
    required: true,
  },
  files: {
    type: Object,
    required: true,
  },
});

packageSchema.pre<PackageSchema>("save", async function (next: Function) {
  if (!this.isModified("name")) {
    return next();
  }

  const salt = await bcrypt.genSalt(30);
  const hash = await bcrypt.hash(this.name + this.author, salt);

  this.name = hash;
  next();
});

packageSchema.methods.findUser = async function (
  authorID: string,
  name: string
): Promise<boolean> {
  return await bcrypt.compare(name + authorID, this.name);
};

export default model<PackageSchema>("UserPackage", packageSchema);

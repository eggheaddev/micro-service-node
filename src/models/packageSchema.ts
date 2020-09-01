import { model, Schema, Document } from "mongoose";
import bcrytp from "bcrypt";
export interface IpackageSchema extends Document {
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

packageSchema.pre<IpackageSchema>("save", async function (next: Function) {
  if (!this.isModified("name")) {
    return next();
  }

  const salt = await bcrytp.genSalt(30);
  const hash = await bcrytp.hash(this.name + this.author, salt);

  this.name = hash;
  next();
});

packageSchema.methods.findUser = async function (
  authorID: string,
  name: string
): Promise<boolean> {
  return await bcrytp.compare(name + authorID, this.name);
};

export default model<IpackageSchema>("UserPackage", packageSchema);

import { model, Schema, Document } from "mongoose";
// import bcrypt from "bcrypt";
export interface IconnectionService extends Document {
  ip: string;
  ServiceName: string;
  description?: string;
  created_at: string;
}

const connectionServiceSchema = new Schema({
  ip: {
    type: String,
    unique: true,
    required: true,
  },
  ServiceName: {
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
});

// TODO(buttercubz) create a encrypt data

// packageSchema.pre<IpackageSchema>("save", async function (next: Function) {
//   if (!this.isModified("name")) {
//     return next();
//   }

//   const salt = await bcrypt.genSalt(30);
//   const hash = await bcrypt.hash(this.name + this.author, salt);

//   this.name = hash;
//   next();
// });

// packageSchema.methods.findUser = async function (
//   authorID: string,
//   name: string
// ): Promise<boolean> {
//   return await bcrypt.compare(name + authorID, this.name);
// };

export default model<IconnectionService>(
  "ConnectionService",
  connectionServiceSchema
);

import { model, Schema, Document } from "mongoose";

export interface ConnectionService extends Document {
  ip: string;
  ServiceName: string;
  description?: string;
  created_at: string;
  endPoint: string;
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
  endPoint: {
    type: String,
    required: true,
  },
});
export default model<ConnectionService>(
  "ConnectionService",
  connectionServiceSchema
);

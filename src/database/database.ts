import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const database = mongoose.connection;

database.once("open", () => {
  console.log("database is connected");
});

database.on("error", (err) => {
  console.error(err);
  process.exit(0);
});

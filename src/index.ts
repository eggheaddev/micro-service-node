import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
import server from "./app";
import "./clear";

const port = process.env.PORT || 2035;

server.listen(port);
console.log(`server on port: ${port}`);

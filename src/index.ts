import dotenv from "dotenv";
if (!process.env.PORT) {
  dotenv.config();
}
import server from "./app";
import "./clear";

const port = process.env.PORT;

server.listen(port);
console.log(`server on port: ${port}`);

import { Request, Response } from "express";

// * '/' home massage
function join(request: Request, response: Response) {
  response.json({ msg: "use connect port!" });
  response.status(200);
}

export { join };

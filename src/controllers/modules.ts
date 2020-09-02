import { Request } from "express";
import JWT from "jsonwebtoken";

interface ServiceTokenData {
  sub: string;
  name: string;
  iat: number;
  err?: boolean;
}

export function getDataService({ headers }: Request): ServiceTokenData {
  const token = headers["access_token"] as string;

  try {
    return JWT.verify(token, process.env.SECRET_JWT!) as ServiceTokenData;
  }
  catch (err) {
    console.log(err);
    return { err: true } as ServiceTokenData;
  }
}

export function existToken({ headers }: Request) {
  return headers["access_token"] ? true : false;
}

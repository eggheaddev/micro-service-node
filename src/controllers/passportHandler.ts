import Service from "../models/connectionService";
import passportJwt from "passport-jwt";
import { Request } from "express"
import passport from "passport";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = (request: Request) =>
  request.cookies ? request.cookies["access_token"] : null

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt,
      secretOrKey: process.env.SECRET_JWT!,
    },
    async function (payload, done) {
      const service = await Service.findOne({ ip: payload.sub });
      try {
        if (service) return done(null, service);
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

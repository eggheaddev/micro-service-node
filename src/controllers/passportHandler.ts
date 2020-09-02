import passport from "passport"
import passpotJwt from "passport-jwt"
import Service from "../models/connectionService"

const JwtStrategy = passpotJwt.Strategy
const ExtractJwt = passpotJwt.ExtractJwt

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_JWT!
}, async function(payload, done){
  const service = await Service.findOne({ ip: payload.sub })
  try {
    if (service)
      return done(null, service)
    return done(null, false)
  } catch(err) {
    return done(err, false)
  }
}))

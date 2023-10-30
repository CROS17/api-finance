import User from "../models/user.model";
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import {secretKey} from "./generate-token.middleware";


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    // Busca al usuario en tu base de datos utilizando el ID del token.
    const user = await User.findOne({ where: { id: jwt_payload.sub } });

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

import passport from "passport";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import { User } from "../models/user.model";

// JWT Strategy
const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "your-secret-key",
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload: any, done: any) => {
    try {
      const user = await User.findById(payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "/api/auth/google/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      try {
        let user = await User.findOne({ "google.id": profile.id });

        if (!user) {
          user = await User.create({
            email: profile.emails[0].value,
            name: profile.displayName,
            google: {
              id: profile.id,
              email: profile.emails[0].value,
            },
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID || "",
      clientSecret: process.env.FACEBOOK_APP_SECRET || "",
      callbackURL: "/api/auth/facebook/callback",
      profileFields: ["id", "emails", "name"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      try {
        let user = await User.findOne({ "facebook.id": profile.id });

        if (!user) {
          user = await User.create({
            email: profile.emails[0].value,
            name: `${profile.name.givenName} ${profile.name.familyName}`,
            facebook: {
              id: profile.id,
              email: profile.emails[0].value,
            },
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Microsoft Strategy
passport.use(
  new MicrosoftStrategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID || "",
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET || "",
      callbackURL: "/api/auth/microsoft/callback",
      scope: ["user.read"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      try {
        let user = await User.findOne({ "microsoft.id": profile.id });

        if (!user) {
          user = await User.create({
            email: profile.emails[0].value,
            name: profile.displayName,
            microsoft: {
              id: profile.id,
              email: profile.emails[0].value,
            },
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default passport;

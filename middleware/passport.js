const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const localStrategy = require("passport-local").Strategy;
const googleTokenStrategy = require("passport-google-token").Strategy;
const facebookTokenStrategy = require("passport-facebook-token");
const { ExtractJwt } = require("passport-jwt");
const { JWT_SECRET, auth } = require("../configs");
const User = require("../models/User");


// passpost jwt
passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findOne({
          userName: payload.sub.userName,
        });
        if (!user) return done(null, false);
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// Passport google
passport.use(
  new googleTokenStrategy(
    {
      clientID: auth.google.GOOGLE_CLIENT_ID,
      clientSecret: auth.google.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check user existed
        const user = await User.countDocuments({
          authGoogleID: profile.id,
          authType: "google",
        });
        if (user) return done(null, user);
        const newUser = new User({
          authType: "google",
          authGoogleID: profile.id,
          userName: profile.id,
          fullName: profile.displayName,
          email: profile.emails[0].value,
        });
        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// Passport facebook
passport.use(
  new facebookTokenStrategy(
    {
      clientID: auth.facebook.FACEBOOK_CLIENT_ID,
      clientSecret: auth.facebook.FACEBOOK_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check user existed
        const user = await User.countDocuments({
          authFacebookID: profile.id,
          authType: "facebook",
        });
        if (user) return done(null, user);
        const newUser = new User({
          authType: "facebook",
          authFacebookID: profile.id,
          userName: profile.id,
          fullName: profile.displayName,
        });
        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
// Passport local
passport.use(
  new localStrategy(
    {
      usernameField: "userName",
      passwordField: "password",
    },
    async (userName, password, done) => {
      try {
        const user = await User.findOne({ userName: userName });
        if (!user) return done(null, false);
        const isCorrectPassword = await user.isValidPassword(password);
        if (!isCorrectPassword) return done(null, false);
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

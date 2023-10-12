require("dotenv").config();
const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;

//Input your client id and client secrect
GITHUB_CLIENT_ID = CLIENT_ID = "Your Client ID";
GITHUB_CLIENT_SECRET = "Your Client Secret";

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

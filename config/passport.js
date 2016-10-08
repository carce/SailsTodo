var passport = require('passport'),
  LocalStrategy = require('passport-local'),
  GoogleStrategy = require('passport-google-oauth2').Strategy,
  bcrypt = require('bcryptjs');

passport.serializeUser(function(user, done) {
  console.log('serial: ' + user.username);
  return done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    console.log('des: ' + username);
    User.findOne({ username: username } , function (err, user) {
        return done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: '208876614799-jp2l41kbg7vdd5g37arnorfcpo6kibtl.apps.googleusercontent.com',
    clientSecret: '29SQvqe6VMlq8xo2-DtnNsfw',
    // callbackURL: "http://127.0.0.1:1337/google/back"
    callbackURL: "http://80d449ca.ngrok.io/google/back"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('DOES IT EVEN GO HERE?');
    console.log(profile);
    User.findOrCreate({ username: profile.id }, {username: profile.id, name: profile.displayName}, function (err, user) {
      console.log(user);
      console.log(profile.id);
      cb(err, user);
    });
    // cb(null, profile);
  }
));

passport.use(new LocalStrategy(function(username, password, done) {
  console.log('GOES HERE LOCAL');
  User.findOne( {username: username}, function (err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);
    bcrypt.compare(password, user.password, function (err, res) {
      if (err) return done(err);
      if(!res) return done(null, false);
      return done(null, user);
    });
  });
}));

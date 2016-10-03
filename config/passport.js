var passport = require('passport'),
  LocalStrategy = require('passport-local'),
  GoogleStrategy = require('passport-google-oauth2').Strategy,
  bcrypt = require('bcryptjs');

passport.serializeUser(function(user, done) {
  console.log('serial: ' + user);
    done(null, user);
});

passport.deserializeUser(function(username, done) {
    console.log('des: ' + user);
    // User.findOne({ username: username } , function (err, user) {
    //     done(err, user);
    // });
    done(null, username);
});

passport.use(new GoogleStrategy({
    clientID: '208876614799-jp2l41kbg7vdd5g37arnorfcpo6kibtl.apps.googleusercontent.com',
    clientSecret: '29SQvqe6VMlq8xo2-DtnNsfw',
    callbackURL: "http://127.0.0.1:1337/google/back"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('DOES IT EVEN GO HERE?');
    User.findOrCreate({ username: profile.id, password: "test123" }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.use(new LocalStrategy(function(username, password, done) {
  console.log('GOES HERE LOCAL');
  User.findOne( {username: username}, function (err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);
    // if (user.password != password) return done(null, false);
    // return done(null, user);
    bcrypt.compare(password, user.password, function (err, res) {
      if (err) return done(err);
      if(!res) return done(null, false);
      return done(null, user);
    });
  });
}));

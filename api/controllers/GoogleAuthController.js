/**
 * GoogleAuthController
 *
 * @description :: Server-side logic for managing Googleauths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var passport = require('passport');

module.exports = {
	try: function (req, res, next) {
		console.log(next);
		passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.me']}, function (err, user) {
			console.log("KURAC A");
			req.logIn(user, function (err) {
        if(err) {
          console.log(err);
          res.ok();
        } else {
	        req.user = user;
	        res.redirect('/');
        }
      });
		})(req, res, next);
	},

	back: function (req, res) {
		console.log("ARE WE IN BACK?");
		passport.authenticate('google', {faliureRedirect: '/'}, function (err, user) {
			console.log("AUTH INSIDE BACK: " + err);
			req.login(user, function (err) {
				console.log("SO ARE WE ALL THE WAY");
				if (err) {
					return res.send('404', 'wow');
				} else {
					return res.redirect('/');
				}
			});
		})(req, res);
	}
};

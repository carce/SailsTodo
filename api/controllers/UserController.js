/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');

module.exports = {
	login: function(req, res) {
		passport.authenticate('local', function(err, user, info) {
			if (err || !user) {
				return res.send(403, "Ovaj ti ne radi");
			}
			if (user) {
				req.login(user, function(err) {
					if (err) {
						return res.send(403, "something gone wrong");
					}
					return res.send('OK');
				});
			}
		})(req, res);
	},
	logout: function (req, res) {
		req.logout();
		console.log(req.user);
		return res.send(200, "OK");
	}
};

/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	deleteDone: function (req, res) {
		Task.destroy({done: true}).exec(function (err) {
			if (err) {
				return res.send(500, 'Something died...');
			}
			return res.ok();
		})
	}
};

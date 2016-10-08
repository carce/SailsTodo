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
	},

	create: function (req, res) {
		var newTask = req.allParams();
		newTask.user = req.user.id;
		console.log(newTask);
		Task.create(newTask).exec(function (err, task) {
			return res.json(task);
		});
	}
};

/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');

module.exports = {
  attributes: {
    username: {
      type: 'string',
      unique: 'true',
      required: 'true'
    },

    password: {
      type: 'string',
      // required: true,
      minLength: 6
    },

    toJSON: function() {
      var obj = this.toObject();
      obj.password = "Čemu se nadaš?";
      return obj;
    }
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          cb();
        }
      });
    });
  }
};

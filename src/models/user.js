const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
		type: String,
		require: true,
		unique: true,
        lowercase: true
        // Tornar insensitivo à acentuação
	},
    password: { type: String, require: true, unique: true, select: false },
    email: {type: String, require: true, unique: true},
    type: { type: Number, require: true },
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, cb) {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(newUser.password, salt, function(err, hash){
			newUser.password = hash;
			newUser.save(cb);
		})
	});
}
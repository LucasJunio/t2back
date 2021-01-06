const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth')
const User = require('../models/user');

// Router validation of user and password form
router.post('/', async (req, res) => {

	const { email, password } = req.body;

	const user = await User.findOne({ email }).select("+password");

	if(!user) {
		return res.status(400).send({ error: 'User not found'})
	}

	if(password !== user.password)
		return res.status(400).send({error: 'Invalid password'});
	
	user.password = undefined;

	const token = jwt.sign({ id: user.id }, authConfig.secret, {
		expiresIn: 86400,
	})
	
	res.status(200).send({user, token});

});

module.exports = router;
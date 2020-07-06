const express = require('express');
const router = express.Router();
const User = require('../models/user');


// Router validation of user and password form
router.post('/', (req, res) => {
		
	const user = User.findOne({email: req.body.email});

	if(user){
		res.send({ success: true });			
	} else {
		res.send({ success: false });			
	}
});

module.exports = router;
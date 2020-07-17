const express = require("express");
const router = express.Router();

const User = require('../models/user');

// Function of e-mail validation 
function is_email(email){
	er = /^[a-z0-9][a-z0-9\._-]+@([a-z0-9\._-]+\.)[a-z-0-9]{2,3}/; 
	if( !er.exec(email) )
	{
		return false;

	} else {
		return true;
	}
}

// General query 
router.get("/", async (req, res) => {    
    const user = await User.find()
	res.json(user)
});

// User create
router.post('/add', async (req, res) => {

	if(req.body.name == null) {
		return res.status(400).send({error: 'fill in the name field'});
	}

	if(req.body.password == null) {
		return res.status(400).send({error: 'fill in the password field'});
	}

	if(!is_email(req.body.email)) {
		return res.status(400).send({error: 'Email invalid'});
	} 

	const email = await User.findOne({email: req.body.email});    

	if(email !== null) {
		return res.status(400).send({error: 'Email in use'});
    } 

	const name = await User.findOne({name: req.body.name});

	if(name !== null) {
		return res.status(400).send({error: 'username already registered'});
	}

	if(req.body.type === undefined) {
		return res.status(400).send({error: 'Invalid type'});
	}

	let newUser = new User({
		name: req.body.name,
		password: req.body.password,
		email: req.body.email,
		type: req.body.type,
	});

	User.createUser(newUser, (err, savedUser) => {
		if(err){
			return res.status(400).send({error: 'There was an error registering user'});
		}
		else {
			return res.status(200).send({succes: 'Registered user'});
		}
	});
})

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require('../models/user');
const Company = require('../models/company');
const UserInterest = require('../models/userinterest');
const ResultProfile = require('../models/resultprofile');
const SkillUserSublevel = require('../models/skillusersublevel');
const UserConquest = require('../models/userconquest');


// User create
router.post('/add', async (req, res) => {


	const { name, password, email, type, company, office, gender, birth } = req.body;

	if(name == '' || password == '' || email == '' || type == undefined) {
		return res.status(400).send({error: 'Some blank attribute'});
	}

	const validation = await User.findOne({email: email});    

	if(validation !== null) {
		return res.status(400).send({error: 'Email in use'});
    } 

	
	let newUser = new User({ name, password, email, type, company, office, gender, birth });

	User.createUser(newUser, (err, savedUser) => {
		if(err){
			return res.status(400).send({error: 'There was an error registering user'});
		}
		else {
			return res.status(200).send({succes: 'Registered user'});
		}
	});
})

// General query 
router.get("/", async (res) => {    
	const user = await User.find()
	
	if(user == null){
		return res.status(400).send({error: 'No users found'});
	}

	return res.status(200).send(user);
});


// User query for ID
router.get('/:id', async (req, res)=> {
    const user = await user.findById(req.params._id );

    if(user == null) {
        return res.status(400).send({error: 'User not found'});
    }

    res.status(200).send(user);
})

// Updating of user 
router.put('/:id', async (req, res) => {

	const user = await user.findById(req.params._id );

    if(user == null) {
        return res.status(400).send({error: 'User not found'});
    }

    const { name, password, email, type, company, office, gender, birth } = req.body;

	if(name == '' || password == '' || email == '' || type == undefined) {
		return res.status(400).send({error: 'Some blank attribute'});
    }       
    
    const validation = await User.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'User with the same name already exists'});
    }

    const newUser = {  name, password, email, type, company, office, gender, birth };

    await User.findByIdAndUpdate(req.params.id, newUser);    

    res.status(200).send({status:'Updated user'});
})

// Deleting of user
router.delete('/:id', async (req, res) => {

    const user = await user.findById(req.params._id );

    if(user == null) {
        return res.status(400).send({error: 'User not found'});
    }

    const company = await Company.findOne({ user: req.params._id });

    if(company !== null) {
        return res.status(400).send({error: 'You cannot delete a user because there is a company using it'});
    }

	const userinterest = await UserInterest.findOne({ user: req.params._id });

    if(userinterest !== null) {
        return res.status(400).send({error: 'You cannot delete a user because there is a userinterest using it'});
	}
	
	const resultprofile = await ResultProfile.findOne({ user: req.params._id });

    if(resultprofile !== null) {
        return res.status(400).send({error: 'You cannot delete a user because there is a resultprofile using it'});
	}
	
	const skillusersublevel	= await SkillUserSublevel.findOne({ user: req.params._id });

    if(skillusersublevel !== null) {
        return res.status(400).send({error: 'You cannot delete a user because there is a skillusersublevel using it'});
	}
	
	const userconquest	= await UserConquest.findOne({ user: req.params._id });

    if(userconquest !== null) {
        return res.status(400).send({error: 'You cannot delete a user because there is a userconquest using it'});
    }

    await User.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted user'});

})

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require('../models/user');


// User create
router.post('/add', async (req, res) => {

	const { name, password, email, telephone, cpf } = req.body;

	if(name == '' || password == '' || email == '' || telephone == '' || cpf == '') {
		return res.status(400).send({error: 'Some blank attribute'});
	}

	const validation = await User.findOne({email: email});    

	if(validation !== null) {
		return res.status(400).send({error: 'Email in use'});
    } 
	
	let newUser = new User({ name, password, email, telephone, cpf });

	User.createUser(newUser, (err, savedUser) => {
		if(err){
			res.status(400).send({error: 'There was an error registering user'});
		} 
		else {
			res.status(200).send({succes: 'Registered user'});
		}
	});
})

// General query 
router.get("/", async (req, res) => {    
	const user = await User.find()
	
	if(user == null){
		return res.status(400).send({error: 'No users found'});
	}

	res.status(200).send(user);
});

// Foreign query of user
router.get('/foreign', async (req, res) => {
    const user = await User.find();

    if(user == null) {
        return res.status(400).send({error: 'User not found'});
    }

    let foreign = []

    for(var i = 0; i < user.length ; i++){          
        foreign.push(user[i].name)
    }     

    res.status(200).send(foreign);
})

// User query for ID
router.get('/:id', async (req, res)=> {
    const user = await User.findById(req.params._id );

    if(user == null) {
        return res.status(400).send({error: 'User not found'});
    }

    res.status(200).send(user);
})

// Updating of user 
router.put('/:_id', async (req, res) => {

	const user = await User.findById(req.params._id );

    if(user == null) {
        return res.status(400).send({error: 'User not found'});
    }

    const { name, password, email, telephone, cpf } = req.body;

	if(name == '' || password == '' || email == '' || telephone == '' || cpf == '') {
		return res.status(400).send({error: 'Some blank attribute'});
    }       
    
    const validation = await User.findOne({name: name});    

	if(validation.length > 1) {
		return res.status(400).send({error: 'User with the same name already exists'});
    }

    const newUser = {  name, password, email, telephone, cpf };

    await User.findByIdAndUpdate(req.params._id, newUser);    

    res.status(200).send({status:'Updated user'});
})

// Deleting of user
router.delete('/:_id', async (req, res) => {

    const user = await User.findById(req.params._id );

    if(user == null) {
        return res.status(400).send({error: 'User not found'});
    }

    await User.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted user'});

})

module.exports = router;

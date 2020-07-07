const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth')

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


// Router validation of user and password form
router.post('/', async (req, res) => {

	const { email, password } = req.body;

	const user = await User.findOne({ email }).select("+password");

	if(!user) {
		return res.status(400).send({ error: 'User not found'})
	}

	if(!await bcrypt.compare(password, user.password))
		return res.status(400).send({error: 'Invalid password'});
	
	user.password = undefined;

	const token = jwt.sign({ id: user.id }, authConfig.secret, {
		expiresIn: 86400,
	})

	res.send({user, token})

});

// User create
router.post('/add', async (req, res) => {

	if(req.body.name == null) {
		res.json({status:'Preencha o campo nome.'});
		return
	}

	if(req.body.password == null) {
		res.json({status:'Preencha o campo senha.'});
		return
	}

	if(!is_email(req.body.email)) {
		res.json({status:'E-mail inválido.'});
		return
	} 

	const email = await User.findOne({email: req.body.email});    

	if(email !== null) {
		res.json({status:'E-mail já está em uso.'});
		return
    } 

	const name = await User.findOne({name: req.body.name});

	if(name !== null) {
		res.json({status:'Nome de usuário já cadastrado.'});
		return
	}

	let newUser = new User({
		name: req.body.name,
		password: req.body.password,
		email: req.body.email,
		type: req.body.type,
	});

	User.createUser(newUser, (err, savedUser) => {
		if(err){
			return res.send({ success: false, status: 'Ocorreu algum erro ao cadastrar usuário.' });
		}
		else {
			return res.send({ success: true, status: 'Usuário registrado!' });
		}
	});
})

module.exports = router;

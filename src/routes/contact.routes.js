const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// Creating of contact
router.post('/add', async (req, res) => {

    const { name, email, telephone, company } = req.body; 

    if(name == '' || email == '' || telephone == '' || company) {
		return res.status(400).send({ error: 'Some blank attribute'})
	}

    const validation = await Contact.findOne({email: email});    

	if(validation !== null) {
		return res.status(400).send({error: 'Email in use'});
    } 

    const contact = new Contact({
        name, email, telephone, company
    })
    await contact.save();

    res.status(201).send({status:'Saved adress'});
})


// Contact query for ID
router.get('/:id', async (req, res)=> {
    const contact = await Contact.findById(req.params._id );

    if(contact == null) {
        return res.status(400).send({error: 'Contact not found'});
    }

    res.status(200).send(contact);
})

// Updating of contact
router.put('/:id', async (req, res) => {

    const contact = await Contact.findById(req.params._id );

    if(contact == null) {
        return res.status(400).send({error: 'Contact not found'});
    }

    const { name, email, telephone, company } = req.body; 

    if(name == '' || email == '' || telephone == '' || company) {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await Contact.findOne({email: email});    

	if(validation !== null) {
		return res.status(400).send({error: 'Email in use'});
    }

    const newContact = { name, email, telephone, company };

    await Contact.findByIdAndUpdate(req.params.id, newContact);    

    res.status(200).send({status:'Updated contact'});
})

// Deleting of contact
router.delete('/:id', async (req, res) => {

    const contact = await Contact.findById(req.params._id);

    if(contact == null) {
        return res.status(400).send({error: 'Contact not found'});
    }


    await Contact.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted contact'});

})

module.exports = router; 
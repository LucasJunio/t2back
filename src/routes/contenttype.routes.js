const express = require('express');
const router = express.Router();
const ContentType = require('../models/contenttype');
const CompanyType = require('../models/companytype');

// Creating of contenttype
router.post('/add', async (req, res) => {

    const { name } = req.body; 

    if(name == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
	}

    const validation = await ContentType.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'Name in use'});
    } 

    const contenttype = new ContentType({
        name
    })
    await contenttype.save();

    res.status(201).send({status:'Saved adress'});
})


// ContentType query for ID
router.get('/:id', async (req, res)=> {
    const contenttype = await ContentType.findById(req.params._id );

    if(contenttype == null) {
        return res.status(400).send({error: 'ContentType not found'});
    }

    res.status(200).send(contenttype);
})

// Updating of contenttype
router.put('/:id', async (req, res) => {

    const contenttype = await ContentType.findById(req.params._id );

    if(contenttype == null) {
        return res.status(400).send({error: 'ContentType not found'});
    }

    const { name} = req.body; 

    if(name == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await ContentType.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'Name in use'});
    }

    const newContentType = { name, email, telephone, company };

    await ContentType.findByIdAndUpdate(req.params.id, newContentType);    

    res.status(200).send({status:'Updated contenttype'});
})

// Deleting of contenttype
router.delete('/:id', async (req, res) => {

    const contenttype = await ContentType.findById(req.params._id);

    if(contenttype == null) {
        return res.status(400).send({error: 'ContentType not found'});
    }

    const companytype = await CompanyType.findOne({ contenttype: req.params._id });

    if(companytype !== null) {
        return res.status(400).send({error: 'You cannot delete a contenttype because there is a companytype using it'});
    }


    await ContentType.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted contenttype'});

})

module.exports = router; 
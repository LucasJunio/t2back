const express = require('express');
const router = express.Router();
const CompanyType = require('../models/companytype');

// Creating of companytype
router.post('/add', async (req, res) => {

    const { company, contenttype } = req.body; 

    if(company == '' || contenttype == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
	}

    const validation = await CompanyType.findOne({company: company, contenttype: contenttype});    

	if(validation !== null) {
		return res.status(400).send({error: 'This relationship already exists'});
    } 

    const companytype = new CompanyType({
        company, contenttype
    })
    await companytype.save();

    res.status(201).send({status:'Saved companytype'});
})

// CompanyType query for ID
router.get('/:_id', async (req, res)=> {
    const companytype = await CompanyType.findById(req.params._id );

    if(companytype == null) {
        return res.status(400).send({error: 'CompanyType not found'});
    }

    res.status(200).send(company);
})



// Updating of companytype
router.put('/:_id', async (req, res) => {

    const companytype = await CompanyType.findById(req.params._id );

    if(companytype == null) {
        return res.status(400).send({error: 'CompanyType not found'});
    }

    const { company, contenttype } = req.body; 

    if(company == '' || contenttype == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
	}

    const validation = await CompanyType.findOne({company: company, contenttype: contenttype});    

	if(validation.length > 1) {
		return res.status(400).send({error: 'This relationship already exists'});
    }

    const newCompanyType = { company, contenttype };

    await CompanyType.findByIdAndUpdate(req.params._id, newCompanyType);    

    res.status(200).send({status:'Updated companytype'});
})

// Deleting of companytype
router.delete('/:_id', async (req, res) => {

    const companytype = await CompanyType.findById(req.params._id);

    if(companytype == null) {
        return res.status(400).send({error: 'ContentType not found'});
    }


    await CompanyType.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted companytype'});

})

module.exports = router;
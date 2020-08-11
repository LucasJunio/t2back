const express = require('express');
const router = express.Router();
const CompanyAudience = require('../models/companyaudience');
const AudienceUserContent = require('../models/audienceusercontent');

// Creating of companyaudience
router.post('/add', async (req, res) => {

    const { company, audience } = req.body; 

    if(company == '' || audience == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
	}

    const validation = await CompanyAudience.findOne({company: company, audience: audience});    

	if(validation !== null) {
		return res.status(400).send({error: 'There is already a relationship between these entities'});
    } 

    const companyaudience = new CompanyAudience({
        company, audience
    })
    await companyaudience.save();

    res.status(201).send({status:'Saved companyaudience'});
})


// CompanyAudience query for ID
router.get('/:id', async (req, res)=> {
    const companyaudience = await CompanyAudience.findById(req.params._id );

    if(companyaudience == null) {
        return res.status(400).send({error: 'CompanyAudience not found'});
    }

    res.status(200).send(companyaudience);
})

// Updating of companyaudience
router.put('/:id', async (req, res) => {

    const companyaudience = await CompanyAudience.findById(req.params._id );

    if(companyaudience == null) {
        return res.status(400).send({error: 'CompanyAudience not found'});
    }

    const { company, audience } = req.body; 

    if(company == '' || audience == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
	}
    
    const validation = await CompanyAudience.findOne({company: company, audience: audience});    

	if(validation !== null) {
		return res.status(400).send({error: 'There is already a relationship between these entities'});
    } 


    const newCompanyAudience = { company, audience };

    await CompanyAudience.findByIdAndUpdate(req.params.id, newCompanyAudience);    

    res.status(200).send({status:'Updated companyaudience'});
})

// Deleting of companyaudience
router.delete('/:id', async (req, res) => {

    const companyaudience = await CompanyAudience.findById(req.params._id);

    if(companyaudience == null) {
        return res.status(400).send({error: 'CompanyAudience not found'});
    }

    const audienceusercontent = await AudienceUserContent.findOne({ companyaudience: req.params._id });

    if(audienceusercontent !== null) {
        return res.status(400).send({error: 'It is not possible to delete companyaudience because there is a audienceusercontent using it'});
    }

    await CompanyAudience.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted companyaudience'});

})

module.exports = router; 
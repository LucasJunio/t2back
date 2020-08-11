const express = require('express');
const router = express.Router();
const Department = require('../models/department');
const Office = require('../models/office');
const ContentDepartment = require('../models/contentdepartment');


// Creating of department
router.post('/add', async (req, res) => {

    const { name } = req.body; 

    if(name == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await Department.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'Department with the same name already exists'});
    } 

    const department = new Department({
        name
    })
    await department.save();
    res.status(201).send({status:'Saved department'});
})

// General query of department
router.get('/', async (req, res) => {
    const department = await Department.find();

    if(department == null) {
        return res.status(400).send({error: 'Department not found'});
    }

    res.status(200).send(department);
})

// Geral department query
router.get('/', async (req, res)=> {
    const department = await Department.find();
    
    if(department == null) {
        return res.status(400).send({error: 'Department not found'});
    }

    res.status(200).send(department);
})

// Department query for ID
router.get('/:_id', async (req, res)=> {
    const department = await Department.findById(req.params._id );
    
    if(department == null) {
        return res.status(400).send({error: 'Department not found'});
    }

    res.status(200).send(department);
})

// Updating of department
router.put('/:_id', async (req, res) => {
    
    const department = await Department.findById(req.params._id );

    if(department == null) {
        return res.status(400).send({error: 'Department not found'});
    }

    const { name } = req.body; 

    if(name == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await Department.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'Department with the same name already exists'});
    } 

    const newDepartment = { name };

    await Department.findByIdAndUpdate(req.params.id, newDepartment);    

    res.status(200).send({status:'Updated department'});

})

// Deleting of department
router.delete('/:id', async (req, res) => {

    const department = await Department.findById(req.params._id );

    if(department == null) {
        return res.status(400).send({error: 'Department not found'});
    }

    const office = await Office.findOne({ department: req.params._id });

    if(office !== null) {
        return res.status(400).send({error: 'You cannot delete a department because there is a office using it'});
    }
    
    const contentdepartment = await ContentDepartment.findOne({ department: req.params._id });

    if(contentdepartment !== null) {
        return res.status(400).send({error: 'You cannot delete a department because there is a contentdepartment using it'});
    }

    await Department.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted department'});

})

module.exports = router; 
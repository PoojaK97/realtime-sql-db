const express = require('express');
const { Pitch } = require('../models/')


const router = express.Router()

router.post(
    '/',
    async (req, res) => {
        try {
            const savedData = await Pitch.create(req.body);
            res.status(201).json({id: savedData.id})
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    }
)

router.patch('/', async (req, res) => {
    try {
        const pitch = await Pitch.findByPk(req.body.id)

        pitch.set(req.body)
        await pitch.save()

        res.sendStatus(200)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

router.get('/', async (req, res) => {
    try{
        const data = await Pitch.findAll();

        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router;

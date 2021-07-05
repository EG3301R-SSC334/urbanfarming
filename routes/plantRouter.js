const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const plantRouter = express.Router();
const Plants = require('../models/plantSchema');

plantRouter.route('/')
.get((req,res,next) => {
    Plants.find({})
    .then((plants) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(plants);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Plants.create(req.body)
    .then((plant) => {
        console.log('Plant Created ', plant);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(plant);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    Plants.findByIdAndUpdate(req.body._id, {
        $push: { temperature: req.body.temperature }
    }, { new: true })
    .then((plant) => {
        console.log('Plant Created ', plant);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(plant);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Plants.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

module.exports = plantRouter;
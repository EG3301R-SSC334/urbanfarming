const express = require('express');
const userRouter = express.Router();
const Users = require('../models/userSchema');

userRouter.route('/')
.get((req,res,next) => {
    Users.find({})
    .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Users.create(req.body)
    .then((user) => {
        console.log('Plant Created ', user);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    Users.findByIdAndUpdate(req.body._id, {
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

module.exports = userRouter;
import {getAllUsers} from '../controllers/userController.js';
import express from 'express';
import Users from '../models/userSchema.js'
const userRouter = express.Router();

userRouter.route('/')
.get(getAllUsers)
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

export default userRouter;
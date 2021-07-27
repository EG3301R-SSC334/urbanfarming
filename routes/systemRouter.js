import express from 'express';
import { Systems } from '../models/systemSchema.js'
const systemRouter = express.Router();

systemRouter.route('/')
.get((req,res,next) => {
    Systems.find({})
    .then((Systems) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Systems);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Systems.create(req.body)
    .then((system) => {
        console.log('system Created ', system);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(system);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    Systems.findByIdAndUpdate(req.body._id, {
        $push: { temperature: req.body.temperature }
    }, { new: true })
    .then((system) => {
        console.log('system Created ', system);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(system);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Systems.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

export default systemRouter;
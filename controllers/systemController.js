import { Systems } from '../models/systemSchema.js'

export const getAllData = (req, res, next) => {
    Systems.find({})
    .then((system) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(system);
    }, (err) => next(err))
    .catch((err) => next(err));
}

export const createNewSystem = (req, res, next) => {
    Systems.create(req.body)
    .then((system) => {
        console.log('system Created ', system);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(system);
    }, (err) => next(err))
    .catch((err) => next(err));
}

export const updateSystemData = (req, res, next) => {
    Systems.findByIdAndUpdate(req.body._id, {
        $push: { temperature: req.body.temperature }
    }, { new: true })
    .then((system) => {
        console.log('System updated ', system);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(system);
    }, (err) => next(err))
    .catch((err) => next(err));
}

export const deleteAlldata = (req, res, next) => {
    Systems.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
}

export const getSystemData = (req, res, next) => {
    console.log(req.params.queryId);
    Systems.findById(req.params.queryId)
    .then((system) => {
        console.log("system get", system)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(system);
    }, (err) => next(err))
    .catch((err) => next(err));
}

export const deleteSystemData = (req, res, next) => {
    Systems.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
}
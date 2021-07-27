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

export async function getSystemData(req, res, next) {
    console.log(req.params.queryId)
    try {
        const selectedSystem = await Systems.findById(req.params.queryId);
        console.log("until here")
        if (selectedSystem != null) {
            console.log("until here 2")
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(selectedSystem);
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json("System not found");
        }
    } catch (err) {
        res.statusCode = 404;
        res.send(err);
    }
}

export async function deleteSystemData (req, res, next) {
    try {
        const selectedSystem = await Systems.findOneAndDelete({_id: req.params.queryId});
        if (selectedSystem != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(selectedSystem);
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json("System not found");
        }
    } catch(err) {
        res.statusCode = 500;
        res.send(err);
    }
}
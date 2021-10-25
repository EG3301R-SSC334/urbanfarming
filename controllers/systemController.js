import { Systems } from '../models/systemSchema.js'
import { waterLevelWarning } from '../utils/warning.js';

export async function getAllData (req, res, next) {
    Systems.find({})
    .then((system) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(system);
    }, (err) => next(err))
    .catch((err) => next(err));
}

export async function addNewSystem (req, res, next) {
    Systems.create(req.body)
    .then((system) => {
        console.log('system Created ', system);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(system);
    }, (err) => next(err))
    .catch((err) => next(err));
}

export async function updateSensorData (req, res, next) {
    try {
        console.log("called");
        const selectedSystem = await Systems.findByIdAndUpdate(req.params.queryId, {
            $push: { 
                temperature: req.body.temperature, 
                humidity: req.body.humidity,
                EC: req.body.EC,
                waterLevel: req.body.waterLevel,
                solutionA: req.body.solutionA,
                solutionB: req.body.solutionB
            }
        }, { new: true });
        
        if (selectedSystem != null) {
            if (req.body.waterLevel.value < 100) {
                console.log("water level is high");
                waterLevelWarning(req.body.waterLevel.value);
            }
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

export async function updateSystemData (req, res, next) {
    try {
        const selectedSystem = await Systems.findByIdAndUpdate(req.params.queryId, req.body, { new: true });
            if (selectedSystem != null) {
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

export async function deleteAllsystems (req, res, next) {
    Systems.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
}

export async function getSystemData(req, res, next) {
    try {
        const selectedSystem = await Systems.findById(req.params.queryId);
        if (selectedSystem != null) {
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

export async function getFirstHundredData(req, res, next) {
    try {
        const selectedSystem = await Systems.findById(req.params.queryId);
        const length = req.params.length;
        selectedSystem.humidity = selectedSystem.humidity.slice(-length);
        selectedSystem.temperature = selectedSystem.temperature.slice(-length);
        selectedSystem.pH = selectedSystem.pH.slice(-length);
        selectedSystem.EC = selectedSystem.EC.slice(-length);

        if (selectedSystem != null) {
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
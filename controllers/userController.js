import {Users} from '../models/userSchema.js';

export const getAllUsers = (req, res, next) => {
    Users.find({})
    .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
}

export async function addNewUser (req, res, next) {
    try {
        const users = await Users.create(req.body);
        if (users != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(users);
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json("User not found");
        }
    } catch (err) {
        res.statusCode = 400;
        res.send(err);
    }
}

export async function deleteAllUsers (req, res, next) {
    try {
        const users = await Users.remove({});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    } catch (err) {
        res.statusCode = 400;
        res.send(err);
    }
}

export async function getUser (req, res, next) {
    try {
        const user = await Users.findById(req.params.queryId);
        if (user != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json("User not found");
        }
    } catch (err) {
        res.statusCode = 404;
        res.send(err);
    }
}

// export async function updateSystemData (req, res, next) {
//     try {
//         const user = await Users.findByIdAndUpdate(req.params.queryId, {
//             $push: { 
//                 temperature: req.body.temperature, 
//                 humidity: req.body.humidity,
//                 pH: req.body.pH,
//                 EC: req.body.EC 
//             }
//         }
//     }
// }
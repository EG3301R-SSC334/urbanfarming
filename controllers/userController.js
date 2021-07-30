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
        res.statusCode = 500;
        res.send(err);
    }
}

export async function updateUser (req, res, next) {
    try {
        const user = await Users.findByIdAndUpdate(req.params.queryId, {
            $set: req.body
        }, { new: true })
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
        res.statusCode = 500;
        res.send(err);
    }
}
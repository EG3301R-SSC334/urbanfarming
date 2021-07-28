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
        const user = await Users.create(req.body);
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
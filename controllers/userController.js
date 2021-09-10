import {Users} from '../models/userSchema.js';
import { validateGoogle } from '../utils/sociallogin.js';

export async function getAllUsers (req, res, next) {
    try {
        const users = await Users.find({});
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

/**
 * @route POST users/sociallogin/google
 * @desc Login user through Google oAuth
 */
 export async function googleLogin (req, res, next) {
    console.log("ASDASDASD TEST")
    const profile = await validateGoogle(req.body.token);

    console.log(profile);
    if (profile.error || profile.serviceErrorCode) {
        // console.log("ASDASDASD")
        // let errMessage = '';
        // if (profile.error) {
        //     errMessage = profile.error;
        // } else {
        //     errMessage = profile.message;
        // }

        // res.status(400).json(errMessage);
    } else {
        const username = profile.email;
        res.status(400).json("Test");
        // try {
        // Users.findOne({ email: profile.email })
        //     .then((user) => {
        //         if (user) {
        //             const userToken = {
        //                 _id: user._id,
        //                 email: user.email,
        //                 username: user.username
        //             };
        //             res.json({
        //                 success: true,
        //                 token: 'Bearer ' + getToken(userToken),
        //                 status: user.status,
        //                 username: user.username
        //             });
        //         } else {
        //             const confirmationCode = sha1(username);
        //             const img = profile.picture.replace('=s96-c', '=s800-c');
        //             // Create a new account for the social sign in user
        //             const newUser = new Users({
        //                 username: username,
        //                 email: profile.email,
        //                 firstName: profile.given_name,
        //                 lastName: profile.family_name,
        //                 socialPicture: img,
        //                 status: 'Email Confirmed',
        //                 loginType: 'google',
        //                 confirmationCode
        //             });

        //             // Save new User in database
        //             newUser
        //                 .save()
        //                 .then((user) => {
        //                     const userToken = {
        //                         _id: user._id,
        //                         email: user.email,
        //                         username: user.username
        //                     };

        //                     res.statusCode = 200;
        //                     res.json({
        //                         success: true,
        //                         token: 'Bearer ' + getToken(userToken),
        //                         status: user.status,
        //                         username: user.username
        //                     });
        //                 })
        //                 .catch((err) => {
        //                     console.log(err);
        //                     res.status(409).json({
        //                         newaccountissue: 'Failed to create new account'
        //                     });
        //                 });
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         res.status(409).json({
        //             newaccountissue: 'Failed to create new account'
        //         });
        //     });
        // } catch (err) {
        //     res.statusCode = 500;
        //     res.send(err);
        // }
    }
};
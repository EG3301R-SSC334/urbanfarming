import passport from "passport";

import * as passportJWT from 'passport-jwt';
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const getToken = (user) => {
    return jwt.sign(user, process.env.PASSPORT_SECRET_KEY, {
        expiresIn: '14d'
    });
};

// To verify user credentials using jwt
export const verifyUser = (req, res, next) => {
    passport.authenticate(
        'jwt',
        { session: false },
        (err, user) => {
            if (err || !user) {
                res.status(403).json({
                    success: false,
                    errors: 'You are not authenticated!'
                });
            } else {
                req.user = user;
                return next();
            }
        }
    )(req, res, next);
};

const opts = Object.create({});
/**
 * Configuration to read JWT
 * from http Auth header with the scheme 'bearer'
 */
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PASSPORT_SECRET_KEY;

export const jwtPassport = passport.use(
    // TODO: types for jwt_payload and done
    new JwtStrategy(opts, (jwt_payload, done) => {
        Users.findById(jwt_payload._id)
            .then((user) => {
                if (user) {
                    // User successfully authenticated
                    return done(null, user);
                } else {
                    // Credentials not valid
                    return done(null, false);
                }
            })
            .catch((err) => {
                console.log(err);
                return done(err, false);
            });
    })
);

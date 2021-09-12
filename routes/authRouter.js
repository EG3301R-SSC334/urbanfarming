import express from 'express';
import asyncHandler from 'express-async-handler';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path';
import { ensureAuth, ensureGuest } from '../utils/sociallogin.js';
const authRouter = express.Router();
import GoogleStrategy from 'passport-google-oauth20';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_REDIRECT_URI,
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));

authRouter.route('/').get(ensureGuest, (req, res) => {
    res.render('login')
})
authRouter.route('/log').get(ensureAuth, async(req, res) => {
    res.render('index',{userinfo:req.user})
})

authRouter.route('/google')
    .get(passport.authenticate('google', { scope: ['profile','email'] }))

authRouter.route('/google/callback')
    .get(passport.authenticate('google', { failureRedirect: '/' }),
        (req, res) => {
        res.redirect('/log')
        })
authRouter.route('/logout')
    .get((req, res) => {
    req.logout()
    res.redirect('/')
})

export default authRouter;
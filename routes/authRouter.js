import express from 'express';
import asyncHandler from 'express-async-handler';
import passport from 'passport';


const authRouter = express.Router();

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
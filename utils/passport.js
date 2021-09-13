import passport from "passport";

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

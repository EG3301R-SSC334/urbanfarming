import {Users} from '../models/userSchema.js';
import { getToken } from '../utils/passport.js';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

export async function googleLogin (req, res , next) {
    console.log("req: " + req)
    console.log("res: " + res)
    console.log("req body: " + Object.keys(req.body).length)
    console.log("req headers: " + JSON.stringify(req.headers))
    console.log("req body username: " + req.body.username)
    console.log("req body email: " + req.body.email)
    const input = req.body.token;
    console.log("input: " + input)
    let googleUser;
    try {
        googleUser = await getGoogleUser({ code: input });
        console.log("googleuser: " + googleUser)
    
        const user = await Users.findOne({ email: String(googleUser.id) });
        console.log("user: " + user)
        const token = getToken({
            email: googleUser.email,
            username: googleUser.username
        });
        console.log("token: " + token)
        if (user != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({
                success: true,
                bearerToken: token,
                message: 'You are successfully logged in!',
                user: user
            });
        } else {
            try {
                const createNewUser = await Users.create(req.body);
                if (createNewUser != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    createNewUser.bearerToken = token; // add the bearer token
                    res.json(createNewUser);
                } 
            } catch (err) {
                res.statusCode = 400;
                res.send(err);
            }
        }

    } catch (err) {
        console.log(err);
        res.statusCode = 400;
        res.send(err);
    }
  }

async function getGoogleUser({ code }) {
    const { tokens } = await oauth2Client.getToken(code);

    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
        .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
        {
            headers: {
            Authorization: `Bearer ${tokens.id_token}`,
            },
        },
        )
        .then(res => res.data)
        .catch(err => {
            res.statusCode = 400;
            res.send(err);
        });

    return googleUser;
}
  
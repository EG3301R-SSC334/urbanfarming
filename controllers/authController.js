import {Users} from '../models/userSchema.js';
import { getToken } from '../utils/passport.js';
import { google } from 'googleapis';
import axios from 'axios';

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

export async function googleLogin (req, res , next) {
    // console.log("req: " + req)
    // console.log("res: " + res)
    // console.log("req body: " + Object.keys(req.body).length)
    // console.log("req headers: " + JSON.stringify(req.headers))
    // console.log("req body username: " + req.body.username)
    // console.log("req body email: " + req.body.email)
    const body = req.body;
    // console.log("input: \n" + input)
    let googleUser;
    try {
        googleUser = await getGoogleUser(body.id_token, body.access_token);
        console.log("============================================GOOGLEUSER: " + googleUser)
    
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
                console.log("============================================CREATE NEW USER============================================")
                console.log(createNewUser)
                if (createNewUser != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    createNewUser.bearerToken = token; // add the bearer token
                    console.log(createNewUser);
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

async function getGoogleUser(id_token, access_token) {
    console.log("============================================TOKENS ARE NOT OBTAINED============================================")
    // console.log(code)
    // const { tokens } = await oauth2Client.getToken(code);
    console.log("============================================TOKENS ARE OBTAINED ALREADY============================================")
    // tokens.access_token = code
    // print(access_token)

    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
        .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
            headers: {
            Authorization: `Bearer ${id_token}`,
            },
        },
        )
        .then(res => res.data)
        .catch(err => {
            res.statusCode = 400;
            res.send(err);
        });
        console.log("============================================GOOGLE USER============================================")

        console.log(googleUser)
        console.log("============================================TOKENS SENT============================================")
    return googleUser;
}
  
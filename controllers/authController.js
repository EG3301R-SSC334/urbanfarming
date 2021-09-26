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
    const body = req.body;
    let googleUser;
    try {
        googleUser = await getGoogleUser(body.id_token, body.access_token);
        if (googleUser == null) {
            res.statusCode = 400;
            res.send("Invalid token or users")
            return
        }
        // console.log("============================================GOOGLEUSER: " + googleUser)
    
        const user = await Users.findOne({ email: String(googleUser.email) });
        const token = getToken({
            email: googleUser.email,
            username: googleUser.username
        });
        // console.log("token: " + token)
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
                // console.log("============================================CREATE NEW USER============================================")
                delete body.id_token;
                delete body.access_token;
                const createNewUser = await Users.create(body);
                // console.log("============================================CREATED NEW USER============================================")
                // console.log(createNewUser)
                if (createNewUser != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        bearerToken: token,
                        user: createNewUser
                    });
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
    // console.log(code)
    // const { tokens } = await oauth2Client.getToken(code);
    // console.log("============================================OBTAINING TOKEN============================================")
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
        .catch(error => {
            return null;
        });

    return googleUser;
}
  
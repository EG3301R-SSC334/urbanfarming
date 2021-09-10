import { google } from 'googleapis';

import https from 'https';
import queryString from 'querystring';
import path from 'path';

const providers = {
    facebook: {
        url: 'https://graph.facebook.com/me',
        qs: '?fields=name,email&access_token='
    },
    google: {
        url: 'https://oauth2.googleapis.com/',
        qs: 'tokeninfo?id_token='
    },
    linkedInAuth: {
        url: 'https://www.linkedin.com/',
        qs: 'oauth/v2/accessToken'
    },
    linkedIn: {
        url: 'https://api.linkedin.com/',
        qs:
            'v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))&oauth2_access_token=',
        email:
            'v2/emailAddress?q=members&projection=(elements*(handle~))&oauth2_access_token='
    }
};


const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// Set globally oauth2Client object
google.options({ auth: oauth2Client });

export async function validateGoogle (code) {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const res = await validateWithProvider(
        'google',
        oauth2Client.credentials.id_token
    );

    return res;
};

export async function validateWithProvider (network, socialToken) {
    const url = providers[network].url;
    const queryString = providers[network].qs + socialToken;

    return new Promise((resolve, reject) => {
        const url = providers[network].url;
        const queryString = providers[network].qs + socialToken;

        https
            .get(url + queryString, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            })
            .on('error', (err) => {
                console.log("error validate")
                reject(err);
            });
    });
};
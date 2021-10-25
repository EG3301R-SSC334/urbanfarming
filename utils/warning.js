import axios from 'axios';
import gcm from 'node-gcm';
import path from 'path';
import dotenv from 'dotenv';

const __dirname = path.resolve();
dotenv.config({ path: path.resolve(__dirname, './.env') });

export function waterLevelWarning(_id, pushTokens) {
    // console.log(_id);
    // console.log(pushTokens);
    var sender = new gcm.Sender(process.env.FCM_SERVER_KEY);
    var gcmMessage = new gcm.Message();
    gcmMessage.addNotification("title", "You have received push notification!");
    gcmMessage.addNotification("body", message);
    sender.send(gcmMessage, { registrationTokens: pushTokens }, function (
        err,
        response
    ) {
    if (err) console.error(err);
    else console.log(response);
    });
}
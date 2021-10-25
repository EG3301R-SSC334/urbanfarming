import axios from 'axios';
import gcm from 'node-gcm';

export function waterLevelWarning(level) {
    console.log("water level is decreasing");
    var sender = new gcm.Sender(process.env.FCM_SERVER_KEY);
    const tokensArray = "13123123";
    var gcmMessage = new gcm.Message();
    gcmMessage.addNotification("title", "You have received push notification!");
    gcmMessage.addNotification("body", message);
    sender.send(gcmMessage, { registrationTokens: tokensArray }, function (
        err,
        response
    ) {
    if (err) console.error(err);
    else console.log(response);
    });
}
var webPush = require('web-push');

const vapidKeys = {
   publicKey: "BH0jOgLZktkoof38Xq-CP-Pm2dqMitVADMymqOF80Nz-zwzPWSikqxbdqULnPJdf9Qls6wTyTNU2Rd2LhlsTRhA",
   privateKey: "yV7d2rZZZ5sNTuYnei_h1VhZSfULpkwImV3-7rIQzyQ"
};


webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   endpoint: "https://fcm.googleapis.com/fcm/send/e_H1iFbusUY:APA91bHbgllVZAzv2XhLFpB2cFlf0BN0p8zY_fqvfodX-S8IeHwVBZT739IjRyb6pfeUtgGZ1Fmiry7UWLzohhnBc5gExNg9TwWdyqj3nHGdD17D1U6ba3tn2thvEmcD-EGwhr0wKF1u",
   keys: {
       p256dh: "BEMuIYWNbtTq+XLB/Tb957a/M/PjYg5pLtAlsUDEXki1cdNiOPJDCCpu5V/kw2TJnr2PcPhh7novpKoKwfDJnO8=",
       auth: "7lsuqP2kVQsJWO7HWymITA=="
   }
};
var payload = 'Selamat datang di PWA Football Reader!';

var options = {
   gcmAPIKey: '433568951546',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);

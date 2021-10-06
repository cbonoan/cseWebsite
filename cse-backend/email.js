const {google} = require('googleapis');
const nodemailer = require('nodemailer');
const OAuth2 = google.auth.OAuth2;

class Emailer {
    constructor(user, clientId, clientSecret, refreshToken, redirectUri) {
        // Setup credentials for google api authorization
        const OAuth2Client = new OAuth2(clientId, 
                            clientSecret, redirectUri);
        OAuth2Client.setCredentials({ refresh_token: refreshToken });
        const accessToken = OAuth2Client.getAccessToken()
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: '465',
            auth: {
                type: 'OAuth2',
                user: user,
                clientId: clientId,
                clientSecret: clientSecret,
                refreshToken: refreshToken,
                accessToken: accessToken
            }
        });
    }

    destroyTransport() {
        this.transporter.close();
    }

    verifyTransporter() {
        this.transporter.verify((e, success) => {
            if(e) {
                return false;
            } else {
                return true;
            }
        });
    }

    sendEmail(mailOptions) {
        this.transporter.sendMail(mailOptions, (e, res) => {
            if(e) {
                console.log(e)
                return false;
            } else {
                return true;
            }
        });
    }
}

module.exports.Emailer = Emailer;
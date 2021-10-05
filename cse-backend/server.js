require('dotenv').config({ path: '../cse-website/.env'});
const express = require('express');
const app = express(); 
const port = process.env.PORT || 5000;

const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const OAuth2Client = new OAuth2(process.env.CLIENT_ID, 
                    process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
OAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const nodemailer = require('nodemailer');

const accessToken = OAuth2Client.getAccessToken()
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '465',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
    }
})

transporter.sendMail({
from: "CSE",
to: "charleander08@gmail.com",
subject: "test email 2",
text: "this is a text email",
html: "<h1>wow html is in here</h1>"
}, (err, data) => {
    if(err) {
        console.log("error occured", err);
    } else {
        console.log("mail sent");
    }
})

app.get('/', (req,res) => {
    console.log("ON HOME PAGE!");
    res.send('HELLO WORLD!');
})

app.get('/contactFormSubmit', (req, res) => {
    console.log("BUTTON CLICKED");
    res.send("it worked!");
})

app.listen(port,  () => {
    console.log(`LISTENING ON PORT ${port}`);
})
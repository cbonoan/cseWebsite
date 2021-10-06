require('dotenv').config({ path: '../cse-website/.env'});
const express = require('express');
const app = express(); 
const port = process.env.PORT || 5000;



const emailer = require('./email');
const Emailer = emailer.Emailer;

// transporter.sendMail({
// from: "CSE",
// to: "charleander08@gmail.com",
// subject: "test email 2",
// text: "this is a text email",
// html: "<h1>wow html is in here</h1>"
// }, (err, data) => {
//     if(err) {
//         console.log("error occured", err);
//     } else {
//         console.log("mail sent");
//     }
// })

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get('/', (req,res) => {
    console.log("ON HOME PAGE!");
    res.send('HELLO WORLD!');
});

app.post('/contact-form-submit', (req, res) => {
    console.log("post req made!")
    const emailer = new Emailer(process.env.EMAIL_USER, process.env.CLIENT_ID, process.env.CLIENT_SECRET, 
                                process.env.REFRESH_TOKEN, process.env.REDIRECT_URI);
    const verified = emailer.verifyTransporter();
    if(verified === false) {
        console.log("not verified")
        res.send({
            error: true, 
            message: "An error has occured on our side. Try again later or send us an email!"
        });
    } else {
        const html = `
            <h3>${req.body.name} has this to say -</h3>
            <p>"${req.body.comment}"</p>
            <hr>
            <p><b>Email: </b>${req.body.email}</p>
            <p><b>Phone Number: </b>${req.body.phone}</p>
        `
        const mailOptions = {
            from: "CSE Reservations",
            to: "charleander08@gmail.com",
            subject: "Feedback to CSE Has Been Given!",
            html: html
        }

        if(emailer.sendEmail(mailOptions) === false) {
            res.send({
                error: true, 
                message: "An error has occured on our side. Try again later or send us an email!"
            });
        } else {
            res.send({
                error: false, 
                message: "Your comment has been received. Thank you for your feedback!"
            })
        }
        emailer.destroyTransport();
    }
});

app.listen(port,  () => {
    console.log(`LISTENING ON PORT ${port}`);
});
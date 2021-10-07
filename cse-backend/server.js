require('dotenv').config({ path: '../cse-website/.env'});
const express = require('express');
const app = express(); 
const port = process.env.PORT || 5000;

const emailer = require('./email');
const Emailer = emailer.Emailer;

function createEmailer() {
    const emailer = new Emailer(process.env.EMAIL_USER, process.env.CLIENT_ID, process.env.CLIENT_SECRET, 
        process.env.REFRESH_TOKEN, process.env.REDIRECT_URI);
    
    return emailer;
}

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get('/', (req,res) => {
    console.log("ON HOME PAGE!");
    res.send('HELLO WORLD!');
});

app.post('/contact-form-submit', (req, res) => {
    const emailer = createEmailer();
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
            to: "csemeditransport@gmail.com",
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

app.post('/reservation-form-submit', (req, res) => {
    const emailer = createEmailer();
    const verified = emailer.verifyTransporter();
    if(verified === false) {
        console.log("not verified")
        res.send({
            error: true, 
            message: "An error has occured on our side. Try again later or send us an email!"
        });
    } else {
        const html = `
            <h2>Customer Details</h2>
            <p><b>Name: </b>${req.body.name}</p>
            <p><b>Email: </b>${req.body.email}</p>
            <p><b>Phone Number: </b>${req.body.phone}</p>
            <hr>
            <h2>Transport Details</h2>
            <p><b>Pickup Location: </b>${req.body.pickup}</p>
            <p><b>Date for Pickup: </b>${req.body.date}</p>
            <p><b>Time for Pickup: </b>${req.body.time}</p>
            <p><b>Service Requested: </b>${req.body.service}</p>
            <p><b>Dropoff Location: </b>${req.body.dropoff}</p>
            <p><b>Additional Info: </b>${req.body.additionalInfo}</p>
            <b><a href="mailto:${req.body.email}?subject=Reservation Confirmation">Click here to reply to customer</a></b>
        `
        const mailOptions = {
            from: "CSE Reservations",
            to: "csemeditransport@gmail.com",
            subject: "Reservation Has Been Made!",
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
                message: "Your reservation has been requested. We will contact you to confirm shortly. Thank you for using CSE!"
            })
        }
        emailer.destroyTransport();
    }
})

app.listen(port,  () => {
    console.log(`LISTENING ON PORT ${port}`);
});
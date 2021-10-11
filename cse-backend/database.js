const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cseDb', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connection open!');
    })
    .catch(err => {
        console.log(err);
    })

// // schema prototype 
// {
//     customer: "John Doe"
//     date: 10-10-2021
//     typeOfRequest: "transport" // can also be feedback or application
// }

const formsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    date: {
        type: Date,
        required: true
    },
    typeOfRequest: {
        type: String,
        required: true
    }
});
const FormEntry = mongoose.model('FormEntry', formsSchema);

class Database {
    constructor(name, date, request) {
        this.formEntry = new FormEntry({
            name: name,
            date: date,
            typeOfRequest: request
        });
    }

    saveEntry() {
        this.formEntry.save()
            .then(data => {
                return true;
            })
            .catch(e => {
                return false;
            })
    }

}

module.exports.Database = Database;
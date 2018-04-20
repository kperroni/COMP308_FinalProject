// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Define a new 'GuestSchema'
var GuestSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
    }, 
});

mongoose.model('Guest', GuestSchema);
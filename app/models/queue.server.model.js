// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Define a new 'UserSchema'
var QueueSchema = new Schema({
    queueId: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    prefix:{
        type: String,
        required: true,
        unique: true,
    }, 
});

mongoose.model('Queue', QueueSchema);
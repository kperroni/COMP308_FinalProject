// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Define a new 'ServiceSchema'
var ServiceSchema = new Schema({
    queueId: {
        type: Schema.Types.ObjectId,
        ref: 'Queue',
        required: true,
    },
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description:{
        type: String,
    }, 
    averageMinutes:{
        type: Number,
    }, 
    weight: {
        type: Number,
    },
});

mongoose.model('Service', ServiceSchema);
// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Define a new 'StudentSchema'
var StudentSchema = new Schema({
    studentNumber: {
        type: String,
        unique: true,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    program:{
        type: String,
    },
});

mongoose.model('Student', StudentSchema);
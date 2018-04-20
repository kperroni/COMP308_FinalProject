// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Define a new 'UserSchema'
var CounterSchema = new Schema({
    counterName: {
        type: String,
        required: true,
        unique: true,
    },
    queueId: {
        type: Schema.Types.ObjectId,
        ref: 'Queue',
        required: true,
    },
});

mongoose.model('Counter', CounterSchema);
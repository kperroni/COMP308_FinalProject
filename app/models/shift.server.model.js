// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Define a new 'UserSchema'
var ShiftSchema = new Schema({
    queueId: {
        type: Schema.Types.ObjectId,
        ref: 'Queue',
        required: true,
    },
    serviceProviderId: {
        type: Schema.Types.ObjectId,
        ref: 'ServiceProvider',
        required: true,
    },
    counterId:{
        type: Schema.Types.ObjectId,
        ref: 'Counter',
        required: true,
    },
    shiftStart: {
        type: Date,
        default: Date.now,
        required: true,
    },
    shiftFinish:{
        type: Date,
    }, 
});

mongoose.model('Shift', ShiftSchema);
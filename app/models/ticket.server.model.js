// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TicketDetailSchema = new Schema({
    shiftId: {
        type: Schema.Types.ObjectId,
        ref: 'shift',
        required: true
    },
    actions: {
        type: String,
        required: true
    },
    actionTime: {
        type: Date,
        default: Date.now,
        required: true
    }
});

var TicketSchema = new Schema({
    ticketNumber: {
        type: Number,
        required: true,
        unique: true
    },
    subject: {
        type: String,
    },
    description:{
        type: String,
    }, 
    serviceId: {
        required: true,
        type: Schema.Types.ObjectId,
        Ref: 'Service'
    },
    studentId: {
        type: Schema.Types.ObjectId,
        Ref: 'Student'
    },
    guestId: {
        type: Schema.Types.ObjectId,
        Ref: 'Guest'
    },    
    weight: {
        type: Number,
    },
    status: {
        type: String, // A = Active, S = Skiped, D = Done, C = Cancel
        default: 'A'
    },
    userId: {
        type: Schema.Types.ObjectId,
        Ref: 'User'
    },
    creationTime: {
        type: Date,
        default: Date.now
    },
    details: [TicketDetailSchema]    
});

TicketSchema.statics.findMax = function (callback) {
    this.findOne().sort('-ticketNumber').exec(callback);
}

mongoose.model('Ticket', TicketSchema);
// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Define a new 'UserSchema'
var ServiceProviderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    jobPosition:{
        type: String,
        required: true,
    }, 
});

mongoose.model('ServiceProvider', ServiceProviderSchema);
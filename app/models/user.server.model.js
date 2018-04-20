// Load the Mongoose module and Schema object
var mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

// Define a new 'UserSchema'
var UserSchema = new Schema({
    username: {
        type: String,           // we keep this as string, but we are going to use it to storage the id student or the id of an employer.
        unique: true,         // defining username as unique because this is going to be the primary key for this collection
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    type: {
        type: String,
        uppercase: true,   // S = student, E, Employee
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
});

// Define a static function to recover a user by username
UserSchema.statics.findByUsername = function (username, callback) {
    this.findOne({ "username": username }, callback);
}

// Define a frecuent vitrual field: fullname
UserSchema.virtual('fullname').get(function () { return this.firstname + ' ' + this.lastname; });

// Use a pre-save middleware to hash the password
UserSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);

    }
    next();
});

// Create an instance method for hashing a password
UserSchema.methods.hashPassword = function (password) {
    //console.log(crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex'))
    return crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

// Create an instance method for authenticating user
UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};
// Create the 'User' model out of the 'UserSchema'
mongoose.model('User', UserSchema);
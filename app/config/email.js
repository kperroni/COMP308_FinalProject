const nodemailer = require('nodemailer');
const config = require('./config');

module.exports = transporter = nodemailer.createTransport({
    service: config.transporter.service,
    auth: {
        user: config.transporter.auth.user,
        pass: config.transporter.auth.pass
    }
});

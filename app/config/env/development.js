//Development configuration options
module.exports = {
    //To sign the session identifier, use a secret string
    sessionSecret: 'developmentSessionSecret',
    db: 'mongodb://localhost/Qme',
    transporter: {
        service: 'gmail',
        auth: {
            user: 'qmenotifier@gmail.com',
            pass: 'centennialcollege'
        }
    }
};
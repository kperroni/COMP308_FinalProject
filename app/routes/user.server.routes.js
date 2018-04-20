module.exports = function (app) {
    //load the controllers
    var user = require('../controllers/user.server.controller');
    const passport = require('passport');

    //handle the routing of get and post request
    app.get('/user/getUsers', user.getUsers);
    app.get('/user/getActiveUser', user.getActiveUser);
    app.post('/user/createUser', user.createUser);
    app.post('/user/getUserById', user.getUserById);
    app.post('/user/logIn', user.logIn);
    app.get('/user/logOut', user.logOut);
    app.get('/user/getUserSession', user.getUserSession);
}
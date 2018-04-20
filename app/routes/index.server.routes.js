module.exports = function (app) {
    //load the controllers
    var index = require('../controllers/index.server.controller');
    //handle the routing of get
    app.get('*', index.render);
};
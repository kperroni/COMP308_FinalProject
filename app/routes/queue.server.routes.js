module.exports = function (app) {
    //load the controllers
    var queue = require('../controllers/queue.server.controller');
    //handle the routing of get and post request
    app.get('/queue/getQueues', queue.getQueues);
    app.post('/queue/createQueue', queue.createQueue);
};
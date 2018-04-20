module.exports = function (app) {
    //load the controllers
    var counter = require('../controllers/counter.server.controller');
    //handle the routing of get and post request
    app.get('/counter/getCounters', counter.getCounters);
    app.get('/counter/getQueueCounters/:queueId', counter.getQueueCounters);
    app.post('/counter/getCounterByCounterId', counter.getCounterByCounterId);
    app.post('/counter/createCounter', counter.createCounter);
};
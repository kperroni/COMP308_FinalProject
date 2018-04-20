module.exports = function (app) {
    var serviceProvider = require('../controllers/serviceProvider.server.controller');
    
    app.get('/serviceProvider/getServiceProviders', serviceProvider.getServiceProviders);

    app.post('/serviceProvider/createServiceProvider', serviceProvider.createServiceProvider);

    app.post('/serviceProvider/getProviderByUserId', serviceProvider.getProviderByUserId);
};
const path = require('path');

exports.render = function (req, res) {
    //Send all requests to Angular app
     res.sendFile(path.join(__dirname, '../../' ,'dist/index.html'));   
};
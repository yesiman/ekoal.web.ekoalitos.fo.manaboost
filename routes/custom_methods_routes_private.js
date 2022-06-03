var custom_methods = require('../routes/custom_methods'),
    bodyParser = require('body-parser');
module.exports = function(app){
    app.post('/profile/addProp', custom_methods.addProp);
    app.post('/profile/update', custom_methods.update);
    app.get('/profile/getProp/:uid/:pid', custom_methods.getProp);
    
    app.get('/auth/user',bodyParser.json(), custom_methods.getUser);
    app.get('/auth/user/validate/:lang/:uid/:mail',bodyParser.json(), custom_methods.validate);
    app.get('/auth/user/invalidate/:lang/:uid',bodyParser.json(), custom_methods.invalidate);
    

}
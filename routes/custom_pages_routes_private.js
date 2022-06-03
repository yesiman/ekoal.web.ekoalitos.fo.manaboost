var custom_pages = require('../routes/custom_pages');
module.exports = function(app){
    //
    app.get('/:lang/profile/:uid', custom_pages.profile);
}
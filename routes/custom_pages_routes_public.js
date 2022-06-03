var custom_pages = require('../routes/custom_pages');
module.exports = function(app){
    //
    app.get('/', custom_pages.home);
    app.get('/:lang/1/:libsso.html', custom_pages.home);
    app.get('/:lang/2/:profiluid/:libsso.html', custom_pages.directory_global);
    app.get('/:lang/detailcartohisto/:objuid', custom_pages.detailCartoHisto);
    app.get('/:lang/directorymappop/:objuid', custom_pages.directoryMapPop);
    app.get('/:lang/directoryres/:page/:protouid/:oldprotouid', custom_pages.directoryRes);
    app.get('/:lang/directoryresv2/:page/:protouid/:oldprotouid', custom_pages.directoryResv2);
    app.get('/:lang/2_2/:libsso.html', custom_pages.directorymap);
    app.get('/:lang/2_3/:libsso.html', custom_pages.directoryrelat);
    app.get('/:lang/2_5/:libsso.html', custom_pages.directoryrelatLight);
    app.get('/:lang/2_4/:libsso.html', custom_pages.directorysig);
    app.get('/:lang/:detailuid/:uid/:libsso.html', custom_pages.detail);
    app.get('/:lang/login', custom_pages.login);
    app.get('/:lang/register', custom_pages.register);
    app.get('/:lang/forgot', custom_pages.forgot);
    app.get('/:lang/forum/comments/:uid', custom_pages.commentsres);
    app.get('/:lang/forum/commentform', custom_pages.commentform);
    //
    
}
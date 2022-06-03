module.exports = function(app){
    //LANGUAGE MIDDLE
    app.use('/:lang', function (req, res, next) {
        //
        var prom_trads = new Promise((resolve, reject) => {
            cache.get(process.env.EKITSRV_PROJECTUID + ".trads." + req.session.lang, function (err, value) {
                resolve(JSON.parse(value));
            });
        });
        var prom_menu = new Promise((resolve, reject) => {
            cache.get(process.env.EKITSRV_PROJECTUID + ".menu." + req.session.lang, function (err, value) {
                resolve(JSON.parse(value));
            });
        });
        var prom_medcliv = new Promise((resolve, reject) => {
            cache.get(process.env.EKITSRV_PROJECTUID + ".medcliv." + req.session.lang, function (err, value) {
                resolve(JSON.parse(value));
            });
        });
        var prom_news = new Promise((resolve, reject) => {
            cache.get(process.env.EKITSRV_PROJECTUID + ".home.news." + req.session.lang, function (err, value) {
                resolve(JSON.parse(value));
            });
            });
            var prom_fkeywords = new Promise((resolve, reject) => {
                cache.get(process.env.EKITSRV_PROJECTUID + ".footer.keywords." + req.session.lang, function (err, value) {
                    resolve(JSON.parse(value));
                });
            });
            var prom_langs = new Promise((resolve, reject) => {
                cache.get(process.env.EKITSRV_PROJECTUID + ".langs", function (err, value) {
                    resolve(JSON.parse(value));
                });
            });
        Promise.all([
            prom_menu, 
            prom_news,
            prom_trads,
            prom_medcliv,
            prom_fkeywords,
            prom_langs
            ]
        ).then(function(values) {
            
            req.middle.header.menu = values[0];
            req.middle.footer.news = values[1];            
            

            req.middle.trads = values[2];
            req.middle.medcliv = values[3];
            req.middle.footer.keywords = values[4];
            req.middle.langs = values[5];
            next();
        });
        
    })
}
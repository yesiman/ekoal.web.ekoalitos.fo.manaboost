var port;
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
    port = process.env.EKITCLI_PORT;
} else {
    port = process.env.PORT;
}
//
var s3 = process.env.S3;
var BOWL_API_URL = process.env.BOWL_API_URL;
var BOWL_MEDIA_URL = process.env.BOWL_MEDIA_URL;
ekit = require('ekoal.npm.ekit');
var express = require('express')
  , app = express()
  , session = require('client-sessions')
  , bodyParser = require('body-parser')
  ,compression = require('compression')
  ,minify = require('express-minify')
  ,fileUpload = require('express-fileupload')
  ,jwt = require('jsonwebtoken');;
//
var redis = require("redis");
cache = redis.createClient();
//
app.use(express.static(__dirname + '/public'));
app.use(session({
    cookieName: 'session',
    secret: (process.env.SESSION_SECRET ? process.env.SESSION_SECRET : 'secret_goes_'),
    duration: 600 * 60 * 1000,
    activeDuration: 300 * 60 * 1000,
}));
//
app.use(compression());
app.use(minify());
app.use(bodyParser.urlencoded({ extended: true, limit: '1000mb'  }));
app.use(bodyParser.json({ limit: '1000mb' }));
app.use(fileUpload());
app.locals.moment = require('moment');
//
app.set('views', [__dirname + '/node_modules/ekoal.pugjs.ekoalitos', __dirname + '/views']);
//
app.set('view engine', 'pug')
//FORCE WWW
app.use(function (req, res, next) {
    if ((req.hostname.indexOf("agrisource.org") > -1) && (req.hostname.indexOf("www.") !== 0)) {
      res.redirect(301, req.protocol + "://www." + req.hostname + req.originalUrl);
    } else {
      next();
    }
  });


require('./routes/custom_methods_routes_public')(app);
require('./node_modules/ekoal.nodroutes.ekoalitos/ekit_methods_routes_public')(app);
//PUBLIC PAGE ROUTING (OLD VERSION ROUTING -> REFERENCEMENT)
/*HOME*/

//LANGUAGE MIDDLE
app.use('/:lang', function (req, res, next) {
    
        req.session.lang = req.params.lang;
        //check servers languages
        /*var hasLangCode = true;
        if ((req.originalUrl.indexOf("/fr/") < 0) && 
            (req.originalUrl.indexOf("/en/") < 0) && 
            (req.originalUrl.indexOf("/it/") < 0))
        {
            hasLangCode = false;
        }
        if (hasLangCode && (req.originalUrl.indexOf("/fr/") < 0))
        {
            switch (req.hostname)
            {
                case "localhost":
                    res.redirect(301, "http://localhost:3002" + req.originalUrl.replace("/"+req.session.lang+"/","/fr/"));
                    break;
                case "test.boost.ekoal.org":
                    res.redirect(301, "http://test.boost.ekoal.org" + req.originalUrl.replace("/"+req.session.lang+"/","/fr/"));
                    break;
                case "boost.ekoal.org":
                    res.redirect(301, "http://boost.ekoal.org" + req.originalUrl.replace("/"+req.session.lang+"/","/fr/"));
                    break;
            }
        }
        else {*/
            if (req.session && req.session.user)
            {
                //SI VERIFY TOKEN
                req.middle = {
                    loged:true,
                    lang:req.session.lang,
                    ourl:req.originalUrl,
                    user:req.session.user,
                    token:req.session.token,
                    footer:{},
                    header:{},
                    s3:s3,
                    BOWL_MEDIA_URL:BOWL_MEDIA_URL,
                    BOWL_API_URL:BOWL_API_URL,
                    forceTinyCss:(process.env.FORCE_TINY_CSS?process.env.FORCE_TINY_CSS:"")
                }; 
                
            }
            else  {
                req.middle = {
                    loged:false,
                    lang:req.session.lang,
                    ourl:req.originalUrl,
                    footer:{},
                    header:{},
                    s3:s3,
                    BOWL_MEDIA_URL:BOWL_MEDIA_URL,
                    BOWL_API_URL:BOWL_API_URL,
                };
            } 
            //   
            req.middle.projectUID = process.env.EKITSRV_PROJECTUID;
            req.middle.webUrl = process.env.EKITCLI_PROTOCOL+"/"+process.env.EKITCLI_DOMAIN;
            //
            next();
        //}
})
require('./routes/custom_middle')(app);
//PUBLIC PAGE ROUTING MIDDLE
require('./routes/custom_pages_routes_public')(app);
require('./node_modules/ekoal.nodroutes.ekoalitos/ekit_pages_routes_public')(app);
app.use(function(req, res, next) {
    if (!req.middle || !req.middle.loged)
    {
        
        //NOT LOGED IN REDIRECT TO LOGIN PAGE
        req.session.user = null;
                req.session.token = null;
                res.header('x-access-token' , 0 );
                res.redirect("/");
    }
    else {
        jwt.verify(req.session.token, process.env.EKITCLI_SESSION_SECRET, function(err, decoded) {
            if (err) {
                req.session.user = null;
                req.session.token = null;
                res.header('x-access-token' , 0 );
                //console.log("token erased");
                res.redirect("/");
            } else {
                //REFRESH TOKEN
                req.session.token = jwt.sign(req.session.user, process.env.EKITCLI_SESSION_SECRET, {
                    expiresIn: parseInt(process.env.EKITCLI_SESSION_TIME)
                });        
                next();
            }
        });        
    }
});
//PRIVATE METHODS ROUTING
require('./routes/custom_methods_routes_private')(app);
require('./node_modules/ekoal.nodroutes.ekoalitos/ekit_methods_routes_private')(app);
//PRIVATE PAGES ROUTING
require('./routes/custom_pages_routes_private')(app);
require('./node_modules/ekoal.nodroutes.ekoalitos/ekit_pages_routes_private')(app);
//SERVER START
app.listen(port, function () {  
    console.log("////////////////////////");
    console.log("EKIT OIP Client listening:" + port);
    console.log("////////////////////////");
})
var url = require('url');
const axios = require('axios')
var qs = require('qs');
exports.home = function (req, res) {
    //ON RECUPERE LANGUE DU NAVIGATEUR SI PAS DE PARAM LANG RECU
    if (!req.params.lang)
    {
        //TODO LOAD PROJECT LANGS (IN MIDDLE ?)
        var navlang = req.acceptsLanguages('en', 'fr', 'it');
        if (!navlang) {
            navlang = "en";
        }
        res.redirect("/" + navlang + "/1/home.html" )
    }
    else {
        var datas = req.middle;
        datas.pageId = "1";
        datas.title = req.params.libsso;

        
        var prom_videosCount = new Promise((resolve, reject) => {
            cache.get(process.env.EKITSRV_PROJECTUID + ".count.proto.5e99ce5d1b088f21c5f20aa0." + req.params.lang, function (err, value) {
                resolve(value);
            });
        });
        var prom_projectsCount = new Promise((resolve, reject) => {
            cache.get(process.env.EKITSRV_PROJECTUID + ".count.proto.5c2c4dea07c805cd14b33488." + req.params.lang, function (err, value) {
                resolve(value);
            });
        });
        var prom_innosCount = new Promise((resolve, reject) => {
            cache.get(process.env.EKITSRV_PROJECTUID + ".count.proto.5c2c4dea07c805cd14b3349f." + req.params.lang, function (err, value) {
                resolve(value);
            });
        });
        var prom_documentsCount = new Promise((resolve, reject) => {
            cache.get(process.env.EKITSRV_PROJECTUID + ".count.proto.5c2c4de807c805cd14b33449." + req.params.lang, function (err, value) {
                resolve(value);
            });
        });
        var prom_playersCount = new Promise((resolve, reject) => {
            cache.get(process.env.EKITSRV_PROJECTUID + ".count.proto.5c2c4de807c805cd14b3345c." + req.params.lang, function (err, value) {
                resolve(value);
            });
        });
        var prom_newsCount = new Promise((resolve, reject) => {
            cache.get(process.env.EKITSRV_PROJECTUID + ".count.proto.5c2c4de907c805cd14b33478." + req.params.lang, function (err, value) {
                resolve(value);
            });
        });
        /*var prom_playersCount = new Promise((resolve, reject) => {
            cache.get(process.env.EKITSRV_PROJECTUID + ".count.news.5c2c4de807c805cd14b3345c", function (err, value) {
                resolve(value);
            });
            ekit.objects.count2({
                project:"5b5ea8ed0311784a87b6dbd6",
                proto:"5c2c4de807c805cd14b3345c",
                text:"",subs:{lang:req.params.lang}},null,'front').then((data) => {resolve(JSON.parse(data.data).count);})
                .catch(err => {});
        });*/
        var prom_networks = new Promise((resolve, reject) => {
            cache.get(process.env.EKITSRV_PROJECTUID + ".networks." + req.params.lang, function (err, value) {
                resolve(JSON.parse(value));
            });
        });
        var prom_slides = new Promise((resolve, reject) => {
            cache.get(process.env.EKITSRV_PROJECTUID + ".home.slides." + req.params.lang, function (err, value) {
                resolve(JSON.parse(value));
            });
            /*var orders = {};
            orders["header.specifics.5b5ea8ed0311784a87b6dbd65c2c4de707c805cd14b33438.sequence"] = 1;
            ekit.objects.getAll2(req.params.lang,{
                project:"5b5ea8ed0311784a87b6dbd6",
                proto:"5c2c4de707c805cd14b33438",
                text:""},orders,{
                    p5c332d1907c805cd14cf2042:1
                },1,1000,null,'front').then((data) => {
                    resolve(JSON.parse(data.data).items);
                })
                .catch(err => {
                    
                });*/
        });
        var prom_logos = new Promise((resolve, reject) => {
            cache.get(process.env.EKITSRV_PROJECTUID + ".home.logos." + req.params.lang, function (err, value) {
                resolve(JSON.parse(value));
            });
            /*ekit.objects.getAll2(req.params.lang,{
                project:"5b5ea8ed0311784a87b6dbd6",
                proto:"5c2c4dec07c805cd14b334c6",
                text:""},{
                    "header.specifics.5b5ea8ed0311784a87b6dbd65c2c4dec07c805cd14b334c6.sequence":1
                },{
                    p5c332d0b07c805cd14cf1ef5:1,
                    p5c332d1a07c805cd14cf2059:1,
                    p5c332d1907c805cd14cf2042:1
                },1,100,null,'front').then((data) => {
                    resolve(JSON.parse(data.data).items);
                })
                .catch(err => {
                    
                });*/
        });
        var prom_news = new Promise((resolve, reject) => {
            cache.get(process.env.EKITSRV_PROJECTUID + ".home.news." + req.params.lang, function (err, value) {
                resolve(JSON.parse(value));
            });
            /*ekit.objects.getAll2(req.params.lang,
                    {
                        project:"5b5ea8ed0311784a87b6dbd6",
                        proto:"5c2c4de907c805cd14b33478",
                        text:"",
                        subs:{
                            $or:
                                [
                                    {p5c332d9507c805cd14cf2aab:"-1"},
                                    {p5c332d9507c805cd14cf2aab:"1"},
                                    {p5c332d9507c805cd14cf2aab:true},
                                    {p5c332d9507c805cd14cf2aab:"true"}
                                ],
                            p5c332d9907c805cd14cf2b18:{$lte:new Date()}
                        },
                    },
                        {
                            p5c332d9907c805cd14cf2b18:-1
                        }
                    ,   
                        {
                            p5c332d9907c805cd14cf2b18:1,
                            p5c332d0b07c805cd14cf1ef5:1,
                            p5c332d2807c805cd14cf2194:1,
                            p5c332d1907c805cd14cf2042:1
                        }
                ,1,4,null,'front').then((data) => {
                    resolve(JSON.parse(data.data).items);
                })
                .catch(err => {
                    
                });*/
        });
        var prom_thematics = new Promise((resolve, reject) => {
            cache.get(process.env.EKITSRV_PROJECTUID + ".home.thematics." + req.params.lang, function (err, value) {
                resolve(JSON.parse(value));
            });
            /*ekit.objects.getAll2(req.params.lang,
                    {
                        project:"5b5ea8ed0311784a87b6dbd6",
                        proto:"5c2c4de907c805cd14b33478",
                        text:"",
                        subs:{
                            $or:
                                [
                                    {p5c332d9507c805cd14cf2aab:"-1"},
                                    {p5c332d9507c805cd14cf2aab:"1"},
                                    {p5c332d9507c805cd14cf2aab:true},
                                    {p5c332d9507c805cd14cf2aab:"true"}
                                ],
                            p5c332d9907c805cd14cf2b18:{$lte:new Date()}
                        },
                    },
                        {
                            p5c332d9907c805cd14cf2b18:-1
                        }
                    ,   
                        {
                            p5c332d9907c805cd14cf2b18:1,
                            p5c332d0b07c805cd14cf1ef5:1,
                            p5c332d2807c805cd14cf2194:1,
                            p5c332d1907c805cd14cf2042:1
                        }
                ,1,4,null,'front').then((data) => {
                    resolve(JSON.parse(data.data).items);
                })
                .catch(err => {
                    
                });*/
        });
        var prom_events = new Promise((resolve, reject) => {
            cache.get(process.env.EKITSRV_PROJECTUID + ".home.events." + req.params.lang, function (err, value) {
                resolve(JSON.parse(value));
            });
            /*ekit.objects.getAll2(req.params.lang,{
                project:"5b5ea8ed0311784a87b6dbd6",
                proto:"5c2c4deb07c805cd14b334b4",
                text:"",subs:
                    {
                        $or:
                        [
                            {p5c332d9507c805cd14cf2aab:"-1"},
                            {p5c332d9507c805cd14cf2aab:"1"},
                            {p5c332d9507c805cd14cf2aab:true},
                            {p5c332d9507c805cd14cf2aab:"true"}
                        ],
                        p5c332db507c805cd14cf2d7b:{$gte:new Date()},
                    }
                },{
                    p5c332db407c805cd14cf2d60:1
                },{
                    p5c332db407c805cd14cf2d60:1,
                    p5c332db507c805cd14cf2d7b:1,
                    p5c332d0b07c805cd14cf1ef5:1,
                    p5c332d2807c805cd14cf2194:1,
                    p5c332d1907c805cd14cf2042:1
                },1,4,null,'front').then((data) => {
                    resolve(JSON.parse(data.data).items);
                })
                .catch(err => {
                    
                });*/
        });
        var prom_projects = new Promise((resolve, reject) => {
            cache.get(process.env.EKITSRV_PROJECTUID + ".home.projects." + req.params.lang, function (err, value) {
                resolve(JSON.parse(value));
            });
            /*ekit.objects.getAll2(req.params.lang,{
                project:"5b5ea8ed0311784a87b6dbd6",
                proto:"5c2c4dea07c805cd14b33488",
                text:"",subs:{
                        p5c332d9507c805cd14cf2aab:"-1"
                    }
                },null,{
                    p5c332d2707c805cd14cf217d:1,
                    p5c332d2807c805cd14cf2194:1,
                    p5c332d1907c805cd14cf2042:1
                },1,10,null,'front').then((data) => {
                    resolve(JSON.parse(data.data).items);
                })
                .catch(err => {
                    
                });*/
        });
        /*var prom_s = new Promise((resolve, reject) => {
        ekit.objects.getAll2(req.params.lang,{
            project:process.env.EKITSRV_PROJECTUID,
            proto:"5c2c4deb07c805cd14b334b4",
            text:"",subs:
                {
                    $or:
                    [
                        {p5c332d9507c805cd14cf2aab:"-1"},
                        {p5c332d9507c805cd14cf2aab:"1"},
                        {p5c332d9507c805cd14cf2aab:true},
                        {p5c332d9507c805cd14cf2aab:"true"}
                    ]
                }
            },{
                p5c332db407c805cd14cf2d60:1
            },{
                p5c332db407c805cd14cf2d60:1,
                p5c332db507c805cd14cf2d7b:1,
                p5c332d0b07c805cd14cf1ef5:1,
                p5c332d2807c805cd14cf2194:1,
                p5c332d1907c805cd14cf2042:1
            },1,4,null,'front').then((data) => {
                console.log(data);
                resolve(JSON.parse(data.data).items);
            })
            .catch(err => {
                console.log("err",err);
            });
        });*/
        Promise.all([
            prom_projectsCount, 
            prom_innosCount,
            prom_documentsCount,
            prom_playersCount,
            prom_slides,
            prom_logos,
            prom_projects,
            prom_news,
            prom_events,
            prom_newsCount,
            prom_thematics,
            prom_networks,prom_videosCount
            ]
        ).then(function(values) {
            //GET RANDOMS
            //datas.projectsCount = cache.get("count.proto.5c2c4dea07c805cd14b33488");
            datas.projectsCount = values[0];
            datas.innosCount = values[1];
            datas.documentsCount = values[2];
            datas.playersCount = values[3];
            datas.slides = values[4];
            datas.logos = values[5];
            datas.projects = values[6];
            datas.news = values[7];
            datas.events = values[8];
            datas.newsCount = values[9];
            datas.thematics = values[10];
            datas.networks = values[11];
            datas.videosCount = values[12];
            //datas.events = values[9];
            
            /*if (datas.slides && datas.slides.length > 0)
            {
                ekit.objects.getAll2(req.params.lang,{
                    project:process.env.EKITSRV_PROJECTUID,
                    proto:["5c2c4de807c805cd14b3345c","5c2c4dea07c805cd14b33488","5c2c4dea07c805cd14b3349f"],
                    text:"",sample:datas.slides.length},null,{
                        p5b5ea90b0311784a87b6dc2e:1,
                        p5b5ea9040311784a87b6dc20:1,
                        p5c332d2707c805cd14cf217d:1
                    },1,100,null,'front').then((data) => {
                        datas.randoms = JSON.parse(data.data).items;
                        res.render(
                            "index",
                            datas);
                    })
                    .catch(err => {
                        
                    });
            }
            else {*/
                datas.randoms = [];
                res.render(
                    "index",
                    datas);
            //}
            
        });
    }

    
};
exports.login = function (req, res) {
    var datas = req.middle;
    datas.title = "Login";
    datas.message = "Login";
    res.render(
        "login",
        datas)
}
exports.directory_global = function (req, res) {
    var datas = req.middle;
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    datas.title = req.params.libsso;
    datas.pageId = "2";
    datas.oldid = req.params.profiluid; 
    datas.fulltext = (query.fulltext && (query.fulltext!="undefined")?query.fulltext:"");
    var filters = {
        project:process.env.EKITSRV_PROJECTUID,
        subs:{lang:req.params.lang}

    }
    

    //EN TEST

    
    if (datas.fulltext && (datas.fulltext.length > 0))
    {
        filters.text = (query.fulltext && (query.fulltext!="undefined")?query.fulltext:"");
    }

    var promBSources  = new Promise((resolve, reject) => {
        const params = new URLSearchParams()
        const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        }
        axios.get(process.env.BOWL_API_URL + "/api/v1/sources", config)
        .then((result) => {
            // Do somthing
            resolve(result.data.hits.hits)
        })
        .catch((err) => {
            reject("nok");
        })
    });
    var promBExtensions  = new Promise((resolve, reject) => {
        const params = new URLSearchParams()
        const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        }
        axios.get(process.env.BOWL_API_URL + "/api/v1/extensions", config)
        .then((result) => {
            // Do somthing
            resolve(result.data.hits.hits);
        })
        .catch((err) => {
            reject("nok");
        })
    });
    var promBCountries  = new Promise((resolve, reject) => {
        const params = new URLSearchParams()
        const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        }
        axios.get(process.env.BOWL_API_URL + "/api/v1/countries", config)
        .then((result) => {
            // Do somthing
            resolve(result.data.hits.hits);
        })
        .catch((err) => {
            reject("nok");
        })
    });
    var promBLanguages  = new Promise((resolve, reject) => {
        const params = new URLSearchParams()
        const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        }
        axios.get(process.env.BOWL_API_URL + "/api/v1/languages", config)
        .then((result) => {
            // Do somthing
            resolve(result.data.hits.hits);
        })
        .catch((err) => {
            reject("nok");
        })
    });
    var promBKeywords  = new Promise((resolve, reject) => {
        const params = new URLSearchParams()
        const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        }
        axios.get(process.env.BOWL_API_URL + "/api/v1/keywords", config)
        .then((result) => {
            // Do somthing
            resolve(result.data.hits.hits);
        })
        .catch((err) => {
            reject("nok");
        })
    });
    var promBProvinces  = new Promise((resolve, reject) => {
        const params = new URLSearchParams()
        const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        }
        axios.get(process.env.BOWL_API_URL + "/api/v1/provinces", config)
        .then((result) => {
            // Do somthing
            resolve(result.data.hits.hits);
        })
        .catch((err) => {
            reject("nok");
        })
    });

    
    var prom_projectsCount = new Promise((resolve, reject) => {
        var fwp = filters;
        fwp.proto = "5c2c4dea07c805cd14b33488";
        ekit.objects.count2(fwp,null,'front').then((data) => {resolve(JSON.parse(data.data).count);})
            .catch(err => {});
    });
    var prom_innosCount = new Promise((resolve, reject) => {
        var fwp = filters;
        fwp.proto = "5c2c4dea07c805cd14b3349f";
        ekit.objects.count2(fwp,null,'front').then((data) => {resolve(JSON.parse(data.data).count);})
            .catch(err => {});
    });
    var prom_documentsCount = new Promise((resolve, reject) => {
        var fwp = filters;
        fwp.proto = "5c2c4de807c805cd14b33449";
        ekit.objects.count2(fwp,null,'front').then((data) => {resolve(JSON.parse(data.data).count);})
            .catch(err => {});
    });
    var prom_playersCount = new Promise((resolve, reject) => {
        var fwp = filters;
        fwp.proto = "5c2c4de807c805cd14b3345c";
        ekit.objects.count2(fwp,null,'front').then((data) => {resolve(JSON.parse(data.data).count);})
            .catch(err => {});
    });
    var prom_newsCount = new Promise((resolve, reject) => {
        var fwp = filters;
        fwp.proto = "5c2c4de907c805cd14b33478";
        ekit.objects.count2(fwp,null,'front').then((data) => {resolve(JSON.parse(data.data).count);})
            .catch(err => {});
    });
    var prom_eventsCount = new Promise((resolve, reject) => {
        var fwp = filters;
        fwp.proto = "5c2c4deb07c805cd14b334b4";
        ekit.objects.count2(fwp,null,'front').then((data) => {resolve(JSON.parse(data.data).count);})
            .catch(err => {});
    });
    var prom_videosCount = new Promise((resolve, reject) => {
        var fwp = filters;
        fwp.proto = "5e99ce5d1b088f21c5f20aa0";
        ekit.objects.count2(fwp,null,'front').then((data) => {resolve(JSON.parse(data.data).count);})
            .catch(err => {});
    });
    var prom_categs = new Promise((resolve, reject) => {
        cache.get(process.env.EKITSRV_PROJECTUID + ".categs." + req.session.lang, function (err, value) {
            resolve(JSON.parse(value));
        });
    });
    Promise.all([
        prom_projectsCount, 
        prom_innosCount,
        prom_documentsCount,
        prom_playersCount,
        prom_newsCount,
        prom_eventsCount,
        prom_videosCount,
        prom_categs,
        promBSources,promBCountries,promBExtensions,promBKeywords,promBLanguages,promBProvinces
        ]
    ).then(function(values) {
        //GET RANDOMS
        datas.projectsCount = values[0];
        datas.innosCount = values[1];
        datas.documentsCount = values[2];
        datas.playersCount = values[3];
        datas.newsCount = values[4];
        datas.eventsCount = values[5];
        datas.videosCount = values[6];
        datas.categsAll = values[7];
        datas.bowlSources = getSource(values[8],"_id");
        datas.bowlCountries = getSource(values[9],"iso");
        datas.bowlExtensions = getSource(values[10],"value");
        datas.bowlKeywords = getSource(values[11],"name");
        datas.bowlLanguages = getSource(values[12],"iso");
        datas.bowlProvinces = getSource(values[13],"name");
        res.render(
            "directory_global",
            datas
        )
    });
}
function getSource(data,idfield)
{
    var ret = [];
    for (var i=0;i<data.length;i++)
    {
        var o = data[i];
        ret.push({
            _id:(idfield=="_id"?o[idfield]:o._source[idfield]),
            lib:o._source.name,
            count:(o._source.threads?o._source.threads:"0")
        })
        
    }
    return ret;
}
exports.directoryRes = function (req, res) {
    var datas = req.middle;
    

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    //TEST
    var filters = {subs:{},proto:req.params.protouid,
        project:process.env.EKITSRV_PROJECTUID,
        text:(query.fulltext && (query.fulltext!="undefined")?query.fulltext:"")};
    /*var filters = {
        proto:req.params.protouid,mongodb://heroku:mArINdAImplaNatItURIdERSEcTOngUADSTOrdoMAJesiGlI@portal-ssl3066-4.ekitos-oip.2552187503.composedb.com:32050,portal-ssl835-36.ekitos-oip.2552187503.composedb.com:32050/koala?ssl=true
        project:"5b5ea8ed0311784a87b6dbd6",
        subs:{
        }
    };*/
    //BOWL MODE BLOCK
    var pugpg = "directory_res";
    

    switch (req.params.protouid)
    {
        case "5c2c4de807c805cd14b3345c"://PLAYERS
            if (query.param1 && (query.param1.length>0)  && (query.param1 != "999"))
            {
                filters.subs.p5e7b915724f95cf8839db554 = {$in:query.param1.split('|')}
            }
            if (query.param2 && (query.param2.length>0) && (query.param2 != "999"))
            {
                filters.subs.p5e74f5155b338f7cc60d53a1 = {$in:query.param2.split('|')}
            }
            if (query.param3 && (query.param3.length>0) && (query.param3 != "999"))
            {
                filters.subs.p5e74f51e307be808ecc68c12 = {$in:query.param3.split('|')}
            }
            break;
        case "5c2c4de807c805cd14b33449"://DOCS
            if (query.param4 && (query.param4.length>0)  && (query.param4 != "999"))
            {
                filters.subs.p5c332d2507c805cd14cf214f = query.param4;
            }
            break;
        case "5c2c4dea07c805cd14b33488"://PROJETS
            
            if (query.param5 && (query.param5.length>0)  && (query.param5 != "999"))
            {
                filters.subs.p5e668433a53e3da3a7395f5d = {$in:query.param5.split('|')}
            }
            if (query.param6 && (query.param6.length>0)  && (query.param6 != "999"))
            {
                filters.subs.p5e74f5409d74e6e63d7962b7 = {$in:query.param6.split('|')}
            }
            if (query.param7 && (query.param7.length>0)  && (query.param7 != "999"))
            {
                filters.subs.p5e670ccfa7e821c229af055f = {$in:query.param7.split('|')}
            }
            if (query.param8 && (query.param8.length>0)  && (query.param8 != "999"))
            {
                filters.subs.p5e670bfed149703857daab43 = {$in:query.param8.split('|')}
            }
            break;
    }

    var orders = {
    };
    if (filters.text=="")
    {
        orders.p5c332d2707c805cd14cf217d=1;
    }
    //ACTUS
    if (req.params.protouid == "5c2c4de907c805cd14b33478")
    {
        orders = {
            p5c332d9907c805cd14cf2b18:-1
        };
        filters.subs = {
            $or:
                [
                    {p5c332d9507c805cd14cf2aab:"-1"},
                    {p5c332d9507c805cd14cf2aab:"1"},
                    {p5c332d9507c805cd14cf2aab:true},
                    {p5c332d9507c805cd14cf2aab:"true"}
                ],
            p5c332d9907c805cd14cf2b18:{$lte:new Date()}
        }
    }
    else {
        orders = {
            "header.dateModif":-1
        };
        
    }

    //EVENTS
    if (req.params.protouid == "5c2c4deb07c805cd14b334b4")
    {
        orders = {
            p5c332db407c805cd14cf2d60:-1
        };
    }
    /*
    subs:{
                $or:
                    [
                        {p5c332d9507c805cd14cf2aab:"-1"},
                        {p5c332d9507c805cd14cf2aab:"1"},
                        {p5c332d9507c805cd14cf2aab:true},
                        {p5c332d9507c805cd14cf2aab:"true"}
                    ],
                p5c332d9907c805cd14cf2b18:{$lte:new Date()}
            },
    */

    //TEST
    //console.log("/^" + ((query.fulltext!="undefined")?query.fulltext:"") + "$/");
    /*if (query.fulltext && (query.fulltext!="undefined")){

        filters.subs["$or"] = [
            {p5c332d2707c805cd14cf217d:{$regex:"\\b"+((query.fulltext!="undefined")?query.fulltext:"") +"\\b",$options:"i"}},
            {p5c332d4d07c805cd14cf24b7:{$regex:"\\b"+((query.fulltext!="undefined")?query.fulltext:"") +"\\b",$options:"i"}},
            {p5c332d0e07c805cd14cf1f39:{$regex:"\\b"+((query.fulltext!="undefined")?query.fulltext:"") +"\\b",$options:"i"}},
            {p5c332d2807c805cd14cf2194:{$regex:"\\b"+((query.fulltext!="undefined")?query.fulltext:"") +"\\b",$options:"i"}},
            {p5c332d0d07c805cd14cf1f23:{$regex:"\\b"+((query.fulltext!="undefined")?query.fulltext:"") +"\\b",$options:"i"}}
        ]
        orders = {norders:true};
   
    }*/
    datas.protouid = req.params.protouid;
    datas.oldprotouid = req.params.oldprotouid;
    datas.fulltext = query.fulltext;
    datas.lang = req.params.lang;
    datas.nextpage = Number(req.params.page) + 1;
    
    if (req.params.protouid == "-5c2c4de807c805cd14b33449")
    {
        if (query.mode == "1") {
            pugpg = "directory_res_v2";
        }
        //Mode affichage
        datas.mode =query.mode;
        
        //console.log(req.params.page,new Date());
        //TEST BOWL
        const params = new URLSearchParams()
        var paramsJSON = {
            from:req.params.page-1,
            size:10,
            query:((datas.fulltext && (datas.fulltext.length > 0))?(query.fulltext && (query.fulltext!="undefined")?query.fulltext:""):"")
        };

        var urltmp = process.env.BOWL_API_URL + "/api/v1/search";
        if (query.scrollid) {
            paramsJSON.id = query.scrollid;
            urltmp =process.env.BOWL_API_URL + "/api/v1/scroll";
        }
        if (query.param20 && (query.param20.length>0)  && (query.param20 != "999"))
        {
            paramsJSON.sources = query.param20.split("|");
        }
        if (query.param21 && (query.param21.length>0)  && (query.param21 != "999"))
        {
            paramsJSON.languages = query.param21.split("|");
        }
        if (query.param22 && (query.param22.length>0)  && (query.param22 != "999"))
        {
            paramsJSON.countries = query.param22.split("|");
        }
        if (query.param23 && (query.param23.length>0)  && (query.param23 != "999"))
        {
            paramsJSON.extensions = query.param23.split("|");
        }
        if (query.param24 && (query.param24.length>0)  && (query.param24 != "999"))
        {
            paramsJSON.provinces = query.param24.split("|");
        }
        if (query.param25 && (query.param25.length>0)  && (query.param25 != "999"))
        {
            paramsJSON.keywords = query.param25.split("|");
        }
        if (query.pub) {
            paramsJSON.publishers = query.pub.split("|");
        }

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        
        axios.post(urltmp, qs.stringify(paramsJSON), config)
        .then((result) => {
            datas.bowl = result.data.hits;
            datas.bowlCounts = JSON.stringify(result.data.counts);
            datas.count = datas.bowl.total.value;
            datas.scrollid = result.data._scroll_id;
            res.render(
                pugpg,
                datas);
        
            
        })
        .catch((err) => {
            console.log("err bowl api");
        })
    
    }
    else {
        ekit.objects.getAll2(req.params.lang,filters,orders,{
            p5c332d2707c805cd14cf217d:1,
            p5c332d2807c805cd14cf2194:1,
            p5c332d1907c805cd14cf2042:1,
            p5c332d2907c805cd14cf21ae:1,
            p5c332d0b07c805cd14cf1ef5:1,
            p5c332d0e07c805cd14cf1f39:1,
            p5c332d4d07c805cd14cf24b7:1,
            p5c332d9907c805cd14cf2b18:1,
            p5c332db407c805cd14cf2d60:1,
            p5bc4396c219d500400bbbfee:1,
            header:0
        },req.params.page,10,null,'front').then((data) => {
            var rdata = JSON.parse(data.data);

            
            datas.count = rdata.count;
            datas.items = rdata.items;
            datas.param1 = query.param1;
            datas.param2 = query.param2;
            datas.param3 = query.param3;
            datas.param4 = query.param4;
            datas.param5 = query.param5;
            datas.param6 = query.param6;
            datas.param7 = query.param7;
            datas.param8 = query.param8;
            datas.param9 = query.param9;
            res.render(
                pugpg,
                datas);
        })
        .catch(err => {
            
        });;
    }
    
 
}
exports.directoryResv2 = function (req, res) {
    var datas = req.middle;


    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    //TEST
    var filters = {subs:{},proto:req.params.protouid,
        project:process.env.EKITSRV_PROJECTUID,
        text:(query.fulltext && (query.fulltext!="undefined")?query.fulltext:"")};
    /*var filters = {
        proto:req.params.protouid,mongodb://heroku:mArINdAImplaNatItURIdERSEcTOngUADSTOrdoMAJesiGlI@portal-ssl3066-4.ekitos-oip.2552187503.composedb.com:32050,portal-ssl835-36.ekitos-oip.2552187503.composedb.com:32050/koala?ssl=true
        project:"5b5ea8ed0311784a87b6dbd6",
        subs:{
        }
    };*/
    //
    
    switch (req.params.protouid)
    {
        case "5c2c4de807c805cd14b3345c"://PLAYERS
            if (query.param1 && (query.param1.length>0)  && (query.param1 != "999"))
            {
                filters.subs.p5e7b915724f95cf8839db554 = {$in:query.param1.split('|')}
            }
            if (query.param2 && (query.param2.length>0) && (query.param2 != "999"))
            {
                filters.subs.p5e74f5155b338f7cc60d53a1 = {$in:query.param2.split('|')}
            }
            if (query.param3 && (query.param3.length>0) && (query.param3 != "999"))
            {
                filters.subs.p5e74f51e307be808ecc68c12 = {$in:query.param3.split('|')}
            }
            break;
        case "5c2c4de807c805cd14b33449"://DOCS
            if (query.param4 && (query.param4.length>0)  && (query.param4 != "999"))
            {
                filters.subs.p5c332d2507c805cd14cf214f = query.param4;
            }
            break;
        case "5c2c4dea07c805cd14b33488"://PROJETS
            
            if (query.param5 && (query.param5.length>0)  && (query.param5 != "999"))
            {
                filters.subs.p5e668433a53e3da3a7395f5d = {$in:query.param5.split('|')}
            }
            if (query.param6 && (query.param6.length>0)  && (query.param6 != "999"))
            {
                filters.subs.p5e74f5409d74e6e63d7962b7 = {$in:query.param6.split('|')}
            }
            if (query.param7 && (query.param7.length>0)  && (query.param7 != "999"))
            {
                filters.subs.p5e670ccfa7e821c229af055f = {$in:query.param7.split('|')}
            }
            if (query.param8 && (query.param8.length>0)  && (query.param8 != "999"))
            {
                filters.subs.p5e670bfed149703857daab43 = {$in:query.param8.split('|')}
            }
            break;
    }

    var orders = {
    };
    if (filters.text=="")
    {
        orders.p5c332d2707c805cd14cf217d=1;
    }
    //ACTUS
    if (req.params.protouid == "5c2c4de907c805cd14b33478")
    {
        orders = {
            p5c332d9907c805cd14cf2b18:-1
        };
        filters.subs = {
            $or:
                [
                    {p5c332d9507c805cd14cf2aab:"-1"},
                    {p5c332d9507c805cd14cf2aab:"1"},
                    {p5c332d9507c805cd14cf2aab:true},
                    {p5c332d9507c805cd14cf2aab:"true"}
                ],
            p5c332d9907c805cd14cf2b18:{$lte:new Date()}
        }
    }
    else {
        orders = {
            "header.dateModif":-1
        };
        
    }

    //EVENTS
    if (req.params.protouid == "-5c2c4deb07c805cd14b334b4")
    {
        orders = {
            p5c332db407c805cd14cf2d60:-1
        };
    }
    /*
    subs:{
                $or:
                    [
                        {p5c332d9507c805cd14cf2aab:"-1"},
                        {p5c332d9507c805cd14cf2aab:"1"},
                        {p5c332d9507c805cd14cf2aab:true},
                        {p5c332d9507c805cd14cf2aab:"true"}
                    ],
                p5c332d9907c805cd14cf2b18:{$lte:new Date()}
            },
    */

    //TEST
    //console.log("/^" + ((query.fulltext!="undefined")?query.fulltext:"") + "$/");
    /*if (query.fulltext && (query.fulltext!="undefined")){

        filters.subs["$or"] = [
            {p5c332d2707c805cd14cf217d:{$regex:"\\b"+((query.fulltext!="undefined")?query.fulltext:"") +"\\b",$options:"i"}},
            {p5c332d4d07c805cd14cf24b7:{$regex:"\\b"+((query.fulltext!="undefined")?query.fulltext:"") +"\\b",$options:"i"}},
            {p5c332d0e07c805cd14cf1f39:{$regex:"\\b"+((query.fulltext!="undefined")?query.fulltext:"") +"\\b",$options:"i"}},
            {p5c332d2807c805cd14cf2194:{$regex:"\\b"+((query.fulltext!="undefined")?query.fulltext:"") +"\\b",$options:"i"}},
            {p5c332d0d07c805cd14cf1f23:{$regex:"\\b"+((query.fulltext!="undefined")?query.fulltext:"") +"\\b",$options:"i"}}
        ]
        orders = {norders:true};
   
    }*/
    datas.protouid = req.params.protouid;
    datas.oldprotouid = req.params.oldprotouid;
    datas.fulltext = query.fulltext;
    datas.lang = req.params.lang;
    datas.nextpage = Number(req.params.page) + 1;
    if (req.params.protouid == "-5c2c4de807c805cd14b33449")
    {
        
        //TEST BOWL
        const params = new URLSearchParams()
        params.append('query', ((datas.fulltext && (datas.fulltext.length > 0))?(query.fulltext && (query.fulltext!="undefined")?query.fulltext:""):""))
        params.append('from', 0)
        params.append('size', 10)

        const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        }
        
        axios.post(process.env.BOWL_API_URL + "/api/v1/search", params, config)
        .then((result) => {
            // Do somthing
            datas.bowl = result.data.hits;
            datas.count = datas.bowl.total.value;
            res.render(
                "directory_res_v2",
                datas);
        })
        .catch((err) => {
            reject("ok");
        })
    
    }
    else {
        ekit.objects.getAll2(req.params.lang,filters,orders,{
            p5c332d2707c805cd14cf217d:1,
            p5c332d2807c805cd14cf2194:1,
            p5c332d1907c805cd14cf2042:1,
            p5c332d2907c805cd14cf21ae:1,
            p5c332d0b07c805cd14cf1ef5:1,
            p5c332d0e07c805cd14cf1f39:1,
            p5c332d4d07c805cd14cf24b7:1,
            p5c332d9907c805cd14cf2b18:1,
            p5c332db407c805cd14cf2d60:1,
            p5bc4396c219d500400bbbfee:1,
            header:0
        },req.params.page,10,null,'front').then((data) => {
            var rdata = JSON.parse(data.data);
            datas.count = rdata.count;
            datas.items = rdata.items;
            datas.param1 = query.param1;
            datas.param2 = query.param2;
            datas.param3 = query.param3;
            datas.param4 = query.param4;
            datas.param5 = query.param5;
            datas.param6 = query.param6;
            datas.param7 = query.param7;
            datas.param8 = query.param8;
            datas.param9 = query.param9;
            res.render(
                "directory_res_v2",
                datas);
        })
        .catch(err => {
            
        });;
    }
    
 
}
exports.forgot = function (req, res) {
    var datas = req.middle;
    datas.title = "Forgot";
    datas.message = "Forgot";
    res.render(
        "forgot",
        datas)
}
exports.register = function (req, res) {
    var datas = req.middle;
    datas.title = "Register";
    datas.message = "Register";
    res.render(
        "register",
        datas)
}

function showDetail(req,res,pageProtoPath,pugPage)
{
    /*301 RULES MIGRATION*/
    var realid = req.params.uid;
    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    var isMongoId = checkForHexRegExp.test(realid);

    function onNewId(data)
    {
        return res.redirect(301, '/' + req.params.lang + '/'+pageProtoPath+'/'+data.data.uid+'/' + req.params.libsso + '.html');
    }
    if (!isMongoId)
    {
        //IF REWRITE NEEDED
        ekit.helper.getNewIdViaOld(realid,"objects",onNewId)
    }
    else 
    {
        //
        var datas = req.middle;
        datas.title = req.params.libsso;
        datas.uid = req.params.uid;
        var filters = {
            project:process.env.EKITSRV_PROJECTUID,
            parent:"*"
        }
        var filters2 = {
            project:process.env.EKITSRV_PROJECTUID,
            parent:"*"
        }
        datas.pageId = pageProtoPath;
        //
        var prom_object = new Promise((resolve, reject) => {
            ekit.objects.get2(req.params.lang,req.params.uid,null,'front').then((data) => {
                resolve(JSON.parse(data.data));
            })
            .catch(err => {
                
            });
        });
        



        var prom_collabs = new Promise((resolve, reject) => {
            function onPCollabs(data) {
                resolve(JSON.parse(data.data).items);
            } 
            ekit.collaborators.getAll("objects","",req.params.uid,null,onPCollabs);
        });
        Promise.all([prom_object, prom_collabs]).then(function(values) {
            datas.object = values[0];
            
            datas.collaborators = [];
            var promsiseIn = [];
            /*IDS CATEGS
            "5e667c62a91cb09eca7a6b1d",
            "5e6686de61ac9e46d46416c7",
            "5e6692f8fc794404368c95c1",
            "5e66983d5c050a07c0c62d24",
            "5e670bf17af9c8e42ce7a479",
            "5e670cc7ea6093d8137de073",
            "5e675e3753008fc22a70dd56"*/
            /*IDS PROPS CATEGS
            "5e668433a53e3da3a7395f5d",
            "5e6686e3f1c4980fc83543ce",
            "5e669329c9251c642ae29316",
            "5e669845b5d1f95c7fb33052",
            "5e670bfed149703857daab43",
            "5e670ccfa7e821c229af055f",
            "5e675e40cac6dee6d8d37ef0"*/

            //CHECK IF COLLAB ID REFERENT
            for(var o in values[1])
            {
                for(var o2 in datas.object.collaborators)
                {
                    if (datas.object.collaborators[o2].uid == values[1][o]._id)
                    {
                        if (datas.object.collaborators[o2].rules && ((datas.object.collaborators[o2].rules.read == true) || (datas.object.collaborators[o2].rules.read == "true")))
                        {
                            datas.collaborators.push(values[1][o]);
                        }
                    }       
                }   
            }
            //
            
            filters.ids = (datas.object.version["p5c332d2b07c805cd14cf21dd"]?datas.object.version["p5c332d2b07c805cd14cf21dd"]:[]).concat(
                (datas.object.version["p5c332d2e07c805cd14cf2221"]?datas.object.version["p5c332d2e07c805cd14cf2221"]:[]),
                (datas.object.version["p5c332d2f07c805cd14cf223a"]?datas.object.version["p5c332d2f07c805cd14cf223a"]:[]),
                (datas.object.version["p5c332d5c07c805cd14cf25ec"]?datas.object.version["p5c332d5c07c805cd14cf25ec"]:[]),
                (datas.object.version["p5c332d5d07c805cd14cf2605"]?datas.object.version["p5c332d5d07c805cd14cf2605"]:[]),
                (datas.object.version["p5c332d0e07c805cd14cf1f39"]?datas.object.version["p5c332d0e07c805cd14cf1f39"]:[]),
                (datas.object.version["p5c332d5f07c805cd14cf2631"]?datas.object.version["p5c332d5f07c805cd14cf2631"]:[]),
                (datas.object.version["p5c332d6107c805cd14cf2649"]?datas.object.version["p5c332d6107c805cd14cf2649"]:[]),
                (datas.object.version["p5c332dba07c805cd14cf2dd4"]?datas.object.version["p5c332dba07c805cd14cf2dd4"]:[]),
                (datas.object.version["p5c332dbb07c805cd14cf2dec"]?datas.object.version["p5c332dbb07c805cd14cf2dec"]:[]),
                (datas.object.version["p5c332dbc07c805cd14cf2e03"]?datas.object.version["p5c332dbc07c805cd14cf2e03"]:[]),
                (datas.object.version["p5c332dbf07c805cd14cf2e32"]?datas.object.version["p5c332dbf07c805cd14cf2e32"]:[]),
                (datas.object.version["p5c332df607c805cd14cf32a1"]?datas.object.version["p5c332df607c805cd14cf32a1"]:[]),
                (datas.object.version["p5c332df707c805cd14cf32b9"]?datas.object.version["p5c332df707c805cd14cf32b9"]:[]),
                (datas.object.version["p5c332df307c805cd14cf326a"]?datas.object.version["p5c332df307c805cd14cf326a"]:[]),
                (datas.object.version["p5c332df207c805cd14cf3251"]?datas.object.version["p5c332df207c805cd14cf3251"]:[]),
                (datas.object.version["p5c332df007c805cd14cf3236"]?datas.object.version["p5c332df007c805cd14cf3236"]:[]),
                (datas.object.version["p5c332d2507c805cd14cf214f"]?datas.object.version["p5c332d2507c805cd14cf214f"]:[])
            );
            filters2.ids = (datas.object.version["p5e668433a53e3da3a7395f5d"]?datas.object.version["p5e668433a53e3da3a7395f5d"]:[]).concat(
                (datas.object.version["p5e6686e3f1c4980fc83543ce"]?datas.object.version["p5e6686e3f1c4980fc83543ce"]:[]),
                (datas.object.version["p5e669329c9251c642ae29316"]?datas.object.version["p5e669329c9251c642ae29316"]:[]),
                (datas.object.version["p5e669845b5d1f95c7fb33052"]?datas.object.version["p5e669845b5d1f95c7fb33052"]:[]),
                (datas.object.version["p5e670bfed149703857daab43"]?datas.object.version["p5e670bfed149703857daab43"]:[]),
                (datas.object.version["p5e670ccfa7e821c229af055f"]?datas.object.version["p5e670ccfa7e821c229af055f"]:[]),
                (datas.object.version["p5e675e40cac6dee6d8d37ef0"]?datas.object.version["p5e675e40cac6dee6d8d37ef0"]:[]),
                (datas.object.version["p5e74f5155b338f7cc60d53a1"]?datas.object.version["p5e74f5155b338f7cc60d53a1"]:[]),
                (datas.object.version["p5e74f51e307be808ecc68c12"]?datas.object.version["p5e74f51e307be808ecc68c12"]:[]),
                (datas.object.version["p5e74f5409d74e6e63d7962b7"]?datas.object.version["p5e74f5409d74e6e63d7962b7"]:[]),
            );
            if (filters.ids && (filters.ids.length > 0))
            {
                promsiseIn.push(new Promise((resolve, reject) => {
                    ekit.objects.getAll2(req.params.lang,filters,{
                        p5c332d2707c805cd14cf217d:1,
                        p5c332db407c805cd14cf2d60:-1,
                        p5c332d9907c805cd14cf2b18:-1
                    },{
                        p5b5ea8fd0311784a87b6dc0a:1,
                        p5c332d2707c805cd14cf217d:1,
                        p5c332d0b07c805cd14cf1ef5:1,
                        p5c332d2807c805cd14cf2194:1,
                        p5c332d1907c805cd14cf2042:1,
                        p5b614f984bfe681400f79ff5:1,
                        p5c332db407c805cd14cf2d60:1,
                        p5c332db507c805cd14cf2d7b:1,
                        p5c332d9907c805cd14cf2b18:1,
                        p5c332d2907c805cd14cf21ae:1,
                        header:0,
                        "header.proto":1
                    },1,1000,null,'front').then((data) => {
                        resolve(JSON.parse(data.data).items);
                    })
                    .catch(err => {
                        
                    });
                }));
            }
            if (filters2.ids && (filters2.ids.length > 0))
            {
                promsiseIn.push(new Promise((resolve, reject) => {
                    ekit.objects.getAll2(req.params.lang,filters2,{
                        p5c332d2707c805cd14cf217d:1,
                        p5c332db407c805cd14cf2d60:-1,
                        p5c332d9907c805cd14cf2b18:-1
                    },{
                        p5b5ea8fd0311784a87b6dc0a:1,
                        header:0,
                        "header.proto":1
                    },1,1000,null,'front').then((data) => {
                        
                        resolve(JSON.parse(data.data).items);
                    })
                    .catch(err => {
                        
                    });
                }));
            }

            Promise.all(promsiseIn).then(function(values) {
                datas.keywords = [];
                if (filters.ids && (filters.ids.length > 0))
                {
                    datas.allRelats = values[0];
                }
                if (filters2.ids && (filters2.ids.length > 0))
                {
                    if (filters.ids && (filters.ids.length > 0))
                    {
                        datas.allCategs = values[1];
                    }
                    else 
                    {
                        datas.allCategs = values[0];
                    }
                }
                //console.log(datas);
                res.render(
                    pugPage,
                    datas
                )
            });
            /*else {
                datas.keywords = [];
                
            }*/
            
        });

        
        
        
     /*   function onCollabs(data) {
            var rdata = JSON.parse(data.data);
            datas.collaborators = rdata.items;
            //ON AGREGE TOUTES LES PROPRIETES RELATION
            //related players
            //projects
            filters.ids = (datas.object.version["p5c332d2b07c805cd14cf21dd"]?datas.object.version["p5c332d2b07c805cd14cf21dd"]:[]).concat(
                (datas.object.version["p5c332d2e07c805cd14cf2221"]?datas.object.version["p5c332d2e07c805cd14cf2221"]:[]),
                (datas.object.version["p5c332d2f07c805cd14cf223a"]?datas.object.version["p5c332d2f07c805cd14cf223a"]:[]),
                (datas.object.version["p5c332d5c07c805cd14cf25ec"]?datas.object.version["p5c332d5c07c805cd14cf25ec"]:[]),
                (datas.object.version["p5c332d5d07c805cd14cf2605"]?datas.object.version["p5c332d5d07c805cd14cf2605"]:[]),
                (datas.object.version["p5c332d0e07c805cd14cf1f39"]?datas.object.version["p5c332d0e07c805cd14cf1f39"]:[]),
                (datas.object.version["p5c332d5f07c805cd14cf2631"]?datas.object.version["p5c332d5f07c805cd14cf2631"]:[]),
                (datas.object.version["p5c332d6107c805cd14cf2649"]?datas.object.version["p5c332d6107c805cd14cf2649"]:[]),
                (datas.object.version["p5c332dba07c805cd14cf2dd4"]?datas.object.version["p5c332dba07c805cd14cf2dd4"]:[]),
                (datas.object.version["p5c332dbb07c805cd14cf2dec"]?datas.object.version["p5c332dbb07c805cd14cf2dec"]:[]),
                (datas.object.version["p5c332dbc07c805cd14cf2e03"]?datas.object.version["p5c332dbc07c805cd14cf2e03"]:[]),
                (datas.object.version["p5c332dbf07c805cd14cf2e32"]?datas.object.version["p5c332dbf07c805cd14cf2e32"]:[]),
                (datas.object.version["p5c332df607c805cd14cf32a1"]?datas.object.version["p5c332df607c805cd14cf32a1"]:[]),
                (datas.object.version["p5c332df707c805cd14cf32b9"]?datas.object.version["p5c332df707c805cd14cf32b9"]:[])
            );
            if (filters.ids && (filters.ids.length > 0))
            {
                ekit.objects.getAll(req.params.lang,filters,null,{
                    p5c332d2707c805cd14cf217d:1,
                    p5c332d2807c805cd14cf2194:1,
                    p5c332d1907c805cd14cf2042:1,
                    p5b614f984bfe681400f79ff5:1
                },1,1000,null,onAllRelats,'front');
            }
            else {
                datas.keywords = [];
                res.render(
                    pugPage,
                    datas
                )
            }
        } 


        function onObject(data) {
            var rdata = JSON.parse(data.data);
            datas.object = rdata;
            ekit.collaborators.getAll("objects","",req.params.uid,null,onCollabs)
        } 
        ekit.objects.get(req.params.lang,req.params.uid,null,onObject,'front');*/
    }
}
exports.detail = function (req, res) {
    let pageName;
    switch (req.params.detailuid)
    {
        case "7_102":
            pageName = "detail_doc";
            break;
        case "7_110":
            pageName = "detail_actu";
            break;
        case "7_115":
            pageName = "detail_event";
            break;
        case "7_113":
            pageName = "detail_projet";
            break;
        case "7_108":
            pageName = "detail_acteur";
            break;
        case "7_114":
            pageName = "detail_innovation";
            break;
        case "7_24":
            pageName = "detail_page";
            break;
        case "7_116":
            pageName = "detail_video";
            break;
    }
    showDetail(req,res,req.params.detailuid,pageName);
}

exports.directoryrelat = function (req, res) {
    var datas = req.middle;
    datas.title = req.params.libsso;
    datas.pageId = "2_3";
    
    Promise.all([]
    ).then(function(values) {
        //GET RANDOMS
        
        res.render(
            "directory_relat",
            datas
        )  
    });


    
}
exports.directoryrelatLight = function (req, res) {
    var datas = req.middle;
    datas.title = req.params.libsso;
    datas.pageId = "2_5";
   
    Promise.all([
        
        ]
    ).then(function(values) {
        //GET RANDOMS
        
        res.render(
            "directory_relat",
            datas
        )  
    });


    
}
exports.directorysig = function (req, res) {
    var datas = req.middle;
    datas.title = req.params.libsso;
    datas.pageId = "2_4";
    /*var filters = 
    {
        project: process.env.EKITSRV_PROJECTUID,
        parent:"*"
    }
    var fields = {
        _id:1,
        p5b5ea8fd0311784a87b6dc0a:1,
    };
    var prom_categ1 = new Promise((resolve, reject) => {
        filters.proto = "5c2ce9cd07c805cd14b5fd4e";
        ekit.objects.getAll2(req.params.lang,filters,null,fields,1,1000,null,'front').then((data) => {
            resolve(JSON.parse(data.data).items);
        })
        .catch(err => {
            
        });
    });
    var prom_categ2 = new Promise((resolve, reject) => {
        filters.proto = "5c2ce98407c805cd14b5f694";
        ekit.objects.getAll2(req.params.lang,filters,null,fields,1,1000,null,'front').then((data) => {
            resolve(JSON.parse(data.data).items);
        })
        .catch(err => {
            
        });
    });
    Promise.all([
        prom_categ1, 
        prom_categ2
        ]
    ).then(function(values) {
        //GET RANDOMS
        datas.activitys = values[0];
        datas.targetSectors = values[1];*/
        res.render(
            "directory_sig",
            datas
        )  
    //})
}
exports.directorymap = function (req, res) {
    var datas = req.middle;
    datas.title = req.params.libsso;
    datas.pageId = "2_2";
    var filters = 
    {
        project: process.env.EKITSRV_PROJECTUID,
        parent:"*"
    }
    var fields = {
        _id:1,
        p5b5ea8fd0311784a87b6dc0a:1,
    };
    var orders = {
        p5b5ea8fd0311784a87b6dc0a:1
    };
    var prom_categ1 = new Promise((resolve, reject) => {
        filters.proto = "5e667c62a91cb09eca7a6b1d";
        ekit.objects.getAll2(req.params.lang,filters,orders,fields,1,1000,null,'front').then((data) => {
            resolve(JSON.parse(data.data).items);
        })
        .catch(err => {
            
        });
    });
    var prom_categ2 = new Promise((resolve, reject) => {
        filters.proto = "5e670bf17af9c8e42ce7a479";
        ekit.objects.getAll2(req.params.lang,filters,orders,fields,1,1000,null,'front').then((data) => {
            resolve(JSON.parse(data.data).items);
        })
        .catch(err => {
            
        });
    });
    var prom_categ3 = new Promise((resolve, reject) => {
        filters.proto = "5e670cc7ea6093d8137de073";
        ekit.objects.getAll2(req.params.lang,filters,orders,fields,1,1000,null,'front').then((data) => {
            resolve(JSON.parse(data.data).items);
        })
        .catch(err => {
            
        });
    });
    var prom_categ4 = new Promise((resolve, reject) => {
        filters.proto = "5e74f50995649d9402657b44";
        ekit.objects.getAll2(req.params.lang,filters,orders,fields,1,1000,null,'front').then((data) => {
            resolve(JSON.parse(data.data).items);
        })
        .catch(err => {
            
        });
    });
    var prom_categ5 = new Promise((resolve, reject) => {
        filters.proto = "5e74f526466f900b86e0765f";
        ekit.objects.getAll2(req.params.lang,filters,orders,fields,1,1000,null,'front').then((data) => {
            resolve(JSON.parse(data.data).items);
        })
        .catch(err => {
            
        });
    });
    var prom_categ6 = new Promise((resolve, reject) => {
        filters.proto = "5e74f5384087d8f50245cf5a";
        ekit.objects.getAll2(req.params.lang,filters,orders,fields,1,1000,null,'front').then((data) => {
            resolve(JSON.parse(data.data).items);
        })
        .catch(err => {
            
        });
    });
    Promise.all([
        prom_categ1, 
        prom_categ2,
        prom_categ3,
        prom_categ4,
        prom_categ5,
        prom_categ6
        ]
    ).then(function(values) {
        //GET RANDOMS
        datas.thematiques = values[0];
        datas.faos = values[1];
        datas.odds = values[2];
        datas.atp = values[3];
        datas.ats = values[4];
        datas.api = values[5];
        res.render(
            "directory_map",
            datas
        )  
    });    
}

exports.profile = function (req, res) {
    var datas = req.middle;
    datas.title = "profile";
    datas.message = "profile";
    function onProfile(data) {
        var rdata = JSON.parse(data.data);
        datas.userProfile = rdata;
        res.render(
            "ekit_user-profile",
            datas);
    } 

    ekit.objects.getAll2(req.params.lang,{
        project:"5b693ec2c60bb31400d7ad3c",
        proto:"5c4e8f86d947cf00040725b0",
        text:""},null,{
            p5b5ea8fd0311784a87b6dc0a:1,
            p5b5ea9200311784a87b6dc52:1,
            p5b5ea9200311784a87b6dc54:1,
            p5b694ca4c60bb31400d7ad6b:1,
            p5c4e94bfd947cf000407262a:1
        },1,1000,req.session.token).then((data) => {
            datas.projects = JSON.parse(data.data).items;
            ekit.collaborators.get(req.params.lang,req.params.uid,req.session.token,onProfile);
        })
        .catch(err => {
            
        });
}

exports.detailCartoHisto = function (req, res) {
    var datas = req.middle;
    function onObject(data) {
        var rdata = JSON.parse(data.data);
        datas.objectPop = rdata;
        datas.lang = req.params.lang;
        switch (datas.objectPop.proto[0])
        {
            case "5c2c4dea07c805cd14b33488":
                datas.objectPop.oldProfilId = "113";
                break;
            case "5c2c4de807c805cd14b3345c":
                datas.objectPop.oldProfilId= "108";
                break;
            case "5c2c4de807c805cd14b33449":
                datas.objectPop.oldProfilId = "102";
                break;
            case "5c2c4dea07c805cd14b3349f":
                datas.objectPop.oldProfilId =  "114";
                break;
        }
        


        res.render(
            "details_carto_histo",
            datas);
    }
    ekit.objects.get(req.params.lang,req.params.objuid,null,onObject,'front');
}

exports.directoryMapPop = function (req, res) {
    var datas = req.middle;
    function onObject(data) {
        var rdata = JSON.parse(data.data);
        datas.objectPop = rdata;
        datas.lang = req.params.lang;
        switch (datas.objectPop.proto[0])
        {
            case "5c2c4dea07c805cd14b33488":
                datas.objectPop.oldProfilId = "113";
                break;
            case "5c2c4de807c805cd14b3345c":
                datas.objectPop.oldProfilId= "108";
                break;
            case "5c2c4de807c805cd14b33449":
                datas.objectPop.oldProfilId = "102";
                break;
            case "5c2c4dea07c805cd14b3349f":
                datas.objectPop.oldProfilId =  "114";
                break;
        }
        


        res.render(
            "directory_map_pop",
            datas);
    }
    ekit.objects.get(req.params.lang,req.params.objuid,null,onObject,'front');
}

exports.commentform = function(req, res)
{
    var datas = req.middle;
    res.render(
        "comments_form",
        datas
    )
}


exports.commentsres = function(req, res)
{
    ekit.objects.getAll2(req.params.lang,{
        parent:"*",
        project:process.env.EKITSRV_PROJECTUID,
        proto:"5c2c4def07c805cd14b33520",
            subs:{
                p5c332e5b07c805cd14cf3b2c:req.params.uid}
            },null,{
            p5c332d9907c805cd14cf2b18:1,
            p5c332e5e07c805cd14cf3b71: 1,
            p5c332e5b07c805cd14cf3b2c:1
        },1,1000,null,'front').then((data) => {
            
            var datas = req.middle;
            datas.comments = JSON.parse(data.data).items;
            //GET USERS
            var usersids = [];
            for(var o in datas.comments)
            {
                usersids.push(datas.comments[o].owner);
            }
            ekit.collaborators.findP2("", 1,1000,true,{ids:usersids},req.session.token).then((data) => {
                var users = JSON.parse(data.data).items;
                for(var o in datas.comments)
                {
                    for(var ou in users)
                    {   
                        if (datas.comments[o].owner == users[ou]._id)
                        {
                            datas.comments[o].owner = (users[ou].surname?users[ou].surname:(users[ou].surn?users[ou].surn:"")) + " " + users[ou].name;
                            break;
                        }
                    }
                }
                res.render(
                    "comments_res",
                    datas
                )
            })
            .catch(err => {
                
            });


            
            
        })
        .catch(err => {
            
        });
}
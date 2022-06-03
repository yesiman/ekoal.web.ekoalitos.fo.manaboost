const { parse } = require('json2csv');
var url = require('url');
const axios = require('axios')
var qs = require('qs');
//AUTOCOMPLETION ANNUAIRE GLOBAL
exports.getAutoCats  = function (req, res) {
    var search = req.params.txt;
    cache.get(process.env.EKITSRV_PROJECTUID + ".categs." + req.session.lang, function (err, value) {
        
    });
}
//ENVOI MAIL RECOVER PASS
exports.recover = function (req, res) {
    function onRecover(data) {
        res.send({"ok":true});
    }
    var regN = new RegExp("\\[\\[NETWORK_NAME\\]\\]","g");
    var regU = new RegExp("\\[\\[NETWORK_URL\\]\\]","g");
    //LOAD TEMPLATE
    function onTemplate(data) {
        var rdata = JSON.parse(data.data);
        var template = rdata;
        var mail = {
            subject:template.version.p5c332e4b07c805cd14cf39a5.replace(regN,process.env.EKITCLI_NETWORK_NAME).replace(regU,process.env.EKITCLI_PROTOCOL+process.env.EKITCLI_DOMAIN),
            body:template.version.p5c332d0d07c805cd14cf1f23.replace(regN,process.env.EKITCLI_NETWORK_NAME).replace(regU,process.env.EKITCLI_PROTOCOL+process.env.EKITCLI_DOMAIN),
            to:req.params.mail,
        };
        ekit.auth.recover(mail,onRecover);
    } 
    ekit.objects.get(req.params.lang,"5c33306607c805cd14cf7f1c",null,onTemplate,'front');
}

//ENVOI MAIL INSCRIPTION PASS
exports.register = function (req, res) {
    function onRegis(data) {
        
    }
    //LOAD TEMPLATE
    /*function onTemplate(data) {
        var rdata = JSON.parse(data.data);
        var template = rdata;
        var body = template.version.p5c332d0d07c805cd14cf1f23;
        body = body.replace("[[ENTNAME]]",(req.params.entName?req.params.entName:""))
                        .replace("[[ASKSURN]]",(req.params.surn?req.params.surn:""))
                        .replace("[[ASKNAME]]",(req.params.name?req.params.name:""))
                        .replace("[[ASKMAIL]]",(req.params.mail?req.params.mail:""))
                        .replace("[[ASKMSG]]",(req.params.message?req.params.message:""));
        var mail = {
            subject:template.version.p5c332e4b07c805cd14cf39a5,
            body:body,
            to:template.version.p5c332e4c07c805cd14cf39bf
        };

        ekit.auth.register({user:{name:req.params.name,pass:"auto",mail:req.params.mail,domain:"test.oip.ekoal.org",overMail:mail}}, onRegis);
    }*/ 
    //ekit.objects.get(req.params.lang,"5c33306507c805cd14cf7efd",null,onTemplate,'front');

    var prom_temp1 = new Promise((resolve, reject) => {
        ekit.objects.get2(req.params.lang,"5c33306507c805cd14cf7efd",null,'front').then((data) => {
            resolve(JSON.parse(data.data));
        })
        .catch(err => {
            
        });
    });
    var prom_temp2 = new Promise((resolve, reject) => {
        ekit.objects.get2(req.params.lang,"5c33306607c805cd14cf7f12",null,'front').then((data) => {
            resolve(JSON.parse(data.data));
        })
        .catch(err => {
            
        });
    });
    let lres = res;
    Promise.all([
        prom_temp1, 
        prom_temp2
        ]
    ).then(function(values) {
        //GET RANDOMS
        var template1 = values[0];
        var template2 = values[1];
        var body = template1.version.p5c332d0d07c805cd14cf1f23;
        body = body.replace("[[ENTNAME]]",(req.params.entName?req.params.entName:""))
                        .replace("[[ASKSURN]]",(req.params.surn?req.params.surn:""))
                        .replace("[[ASKNAME]]",(req.params.name?req.params.name:""))
                        .replace("[[ASKMAIL]]",(req.params.mail?req.params.mail:""))
                        .replace("[[ASKMSG]]",(req.params.message?req.params.message:""));
        
                        var regN = new RegExp("\\[\\[NETWORK_NAME\\]\\]","g");
            var regU = new RegExp("\\[\\[NETWORK_URL\\]\\]","g");
            let mail1 = {
                subject:template1.version.p5c332e4b07c805cd14cf39a5.replace(regN,process.env.EKITCLI_NETWORK_NAME).replace(regU,process.env.EKITCLI_PROTOCOL+process.env.EKITCLI_DOMAIN),
                body:body.replace(regN,process.env.EKITCLI_NETWORK_NAME).replace(regU,process.env.EKITCLI_PROTOCOL+process.env.EKITCLI_DOMAIN),
                to:process.env.EKITCLI_NETWORK_ADMINS
            };
            let mail2 = { 
                mail: {
                    subject:template2.version.p5c332e4b07c805cd14cf39a5.replace(regN,process.env.EKITCLI_NETWORK_NAME).replace(regU,process.env.EKITCLI_PROTOCOL+process.env.EKITCLI_DOMAIN),
                    body:template2.version.p5c332d0d07c805cd14cf1f23.replace(regN,process.env.EKITCLI_NETWORK_NAME).replace(regU,process.env.EKITCLI_PROTOCOL+process.env.EKITCLI_DOMAIN),
                    to:req.params.mail
                }
            };
        
        var randomstring = Math.random().toString(36).slice(-8);
        ekit.auth.register({user:{projects:[process.env.EKITSRV_PROJECTUID],reg_msg:req.params.message,name:req.params.name,pass:randomstring,mail:req.params.mail,surn:req.params.surn,job:req.params.entName,domain:process.env.EKITCLI_DOMAIN,overMail:mail1}}, function(data){
            let regisdata = data;
            ekit.mails.send(mail2, function(data){
                res.send(regisdata);
            });
        });
    });

    

}

exports.bowlCardItems  = function(req, res) {
    const paramsJSON = new URLSearchParams()
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    paramsJSON.ids = req.body.ids;
    axios.post(process.env.BOWL_API_URL + "/api/v1/documents", qs.stringify(paramsJSON), config)
    .then((result) => {
        res.send({items:result.data.hits});
    })
    .catch((err) => {
        res.send({"ok":false});
    })
    
}
exports.bowlCardItemsExport  = function(req, res) {
    const paramsJSON = new URLSearchParams()
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    paramsJSON.ids = query.ids.split(';');
    
    paramsJSON.ids.splice(paramsJSON.ids.length-1,1);
    axios.post(process.env.BOWL_API_URL + "/api/v1/documents", qs.stringify(paramsJSON), config)
    .then((result) => {
        var arFin = [];
        var fields = ['author','title','lang','content','link','_id'];
        const opts = { fields:fields,delimiter: ';',quote:'' };
        for (var reli = 0;reli < result.data.hits.hits.length;reli++)
        {
            var obj = result.data.hits.hits[reli]; 
            var objOk = {
                author:obj._source.meta.author,
                title:obj._source.meta.title,
                lang:obj._source.meta.language,
                content:(obj.highlight?obj.highlight.content:""),
                link:obj._source.path.virtual.replace("/usr/src/app/","https://boost-search.cirad.fr/"),
                id:obj._id
            };
            arFin.push(objOk);
        }
        try {
            const csv = parse(arFin, opts);
            res.header('Content-Type', 'text/csv');
            res.attachment('boost_bowl_'+'_'+ Date.now()+'.csv');
            res.send(csv);
        } catch (err) {
        console.error(err);
        }
    })
    .catch((err) => {
        
        res.send({"ok":false});
    })
    
}
exports.docrate = function(req, res) {
    ekit.objects.getAll2(req.params.lang,{
        project:process.env.EKITSRV_PROJECTUID,
        proto:"5c2c4df007c805cd14b33530",subs:{p5c332e6d07c805cd14cf3cd9:req.params.uid}}
        ,null,{
            p5c332e6907c805cd14cf3c7e:1,
            p5c332e6a07c805cd14cf3c95: 1,
            p5c332e6b07c805cd14cf3cac:1,
            p5c332e6c07c805cd14cf3cc2:1
        },1,1000,null,'front').then((data) => {

            var items = JSON.parse(data.data).items;
            var increm = 0;
            var tm= 0;
            for(var o in items)
            {
                var n1 = items[o]["p5c332e6907c805cd14cf3c7e"];
                var n2 = items[o]["p5c332e6a07c805cd14cf3c95"];
                var n3 = items[o]["p5c332e6b07c805cd14cf3cac"];
                var n4 = items[o]["p5c332e6c07c805cd14cf3cc2"];
                var m = (parseInt(n1) + parseInt(n2) + parseInt(n3) + parseInt(n4)) /4;
                tm += m;
                increm++;
            }
            res.send({"ok":true,rate:(tm/increm)});
        })
        .catch(err => {
            console.log(err);
            res.send({"ok":false});
        });
}


//ENVOI MAIL DE CONTACT
exports.contact = function (req, res) {
    function onSMail(data) {
        res.send({"ok":true});
    }
    
    //LOAD TEMPLATE
    function onTemplate(data) {
        var regN = new RegExp("\\[\\[NETWORK_NAME\\]\\]","g");
    var regU = new RegExp("\\[\\[NETWORK_URL\\]\\]","g");
        var rdata = JSON.parse(data.data);
        var template = rdata;
        var mail = {
            subject:template.version.p5c332e4b07c805cd14cf39a5.replace("[[SENDER_NAME]]",req.body.contact.name).replace("[[NETWORK_NAME]]",process.env.EKITCLI_NETWORK_NAME),
            body:template.version.p5c332d0d07c805cd14cf1f23
                .replace("[[SENDER_NAME]]",req.body.contact.name)
                .replace("[[SENDER_MESSAGE]]",req.body.contact.message)
                .replace("[[SENDER_PHONE]]",req.body.contact.phone)
                .replace("[[PAGE]]",req.body.page)
                .replace("[[SENDER_EMAIL]]",req.body.contact.mail)
                .replace("[[NETWORK_NAME]]",process.env.EKITCLI_NETWORK_NAME)
                .replace(regU,process.env.EKITCLI_PROTOCOL+process.env.EKITCLI_DOMAIN),
            to:req.body.contact.to,
        };
        ekit.mails.send({mail:mail}, onSMail);
    } 
    ekit.objects.get(req.params.lang,"5c33306607c805cd14cf7f07",null,onTemplate,'front');
}
//END AUTH
//DATATYPES

exports.getUser = function (req, res) {
    
    res.send({user:req.session.user});
    
}
exports.update = function (req, res) {
    function onUpdate(data) {
        res.send(data); 
    }
    if (req.session && req.session.user)
    {
        req.session.user["name"] = req.body.user.name;
        req.session.user["surn"] = req.body.user.surn;
        req.session.user["job"] = req.body.user.job;
        req.session.user["mail"] = req.body.user.mail;
        req.session.user["pres"] = req.body.user.pres;
        req.session.user["facebook"] = req.body.user.facebook;
        req.session.user["linkedin"] = req.body.user.linkedin;
        req.session.user["twitter"] = req.body.user.twitter;
    }
    ekit.profile.update(req.body.user,req.session.token,onUpdate);
}

exports.validate = function (req, res) {
    
    //TODO LIRE LES PROTO PAR DEFAUT DANS FICHIER PROJET HEADER
    //TODO AJOUTER LES DROIT DE LECTURE SUR LE PROJET

    var prom_events = new Promise((resolve, reject) => {
        ekit.objects.addRule2("prototypes", "5c2c4deb07c805cd14b334b4",{
            uid:req.params.uid,
            rules: {
                    read:"true",
                    edit:"false",
                    del:"false",
                    share:"false",
                    rights:"false"
            }
        },false, req.session.token).then((data) => {
            resolve({ok:"ok"});
        })
        .catch(err => {
            
        });
    });
    var prom_projets = new Promise((resolve, reject) => {
        ekit.objects.addRule2("prototypes", "5c2c4dea07c805cd14b33488",{
            uid:req.params.uid,
            rules: {
                    read:"true",
                    edit:"false",
                    del:"false",
                    share:"false",
                    rights:"false"
            }
        },false, req.session.token).then((data) => {
            resolve({ok:"ok"});
        })
        .catch(err => {
            
        });
    });
    var prom_docs = new Promise((resolve, reject) => {
        ekit.objects.addRule2("prototypes", "5c2c4de807c805cd14b33449",{
            uid:req.params.uid,
            rules: {
                    read:"true",
                    edit:"false",
                    del:"false",
                    share:"false",
                    rights:"false"
            }
        },false, req.session.token).then((data) => {
            resolve({ok:"ok"});
        })
        .catch(err => {
            
        });
    });
    var prom_innovations = new Promise((resolve, reject) => {
        ekit.objects.addRule2("prototypes", "5c2c4dea07c805cd14b3349f",{
            uid:req.params.uid,
            rules: {
                    read:"true",
                    edit:"false",
                    del:"false",
                    share:"false",
                    rights:"false"
            }
        },false, req.session.token).then((data) => {
            resolve({ok:"ok"});
        })
        .catch(err => {
            
        });
    });
    
    var prom_actus = new Promise((resolve, reject) => {
        ekit.objects.addRule2("prototypes", "5c2c4de907c805cd14b33478",{
            uid:req.params.uid,
            rules: {
                    read:"true",
                    edit:"false",
                    del:"false",
                    share:"false",
                    rights:"false"
            }
        },false, req.session.token).then((data) => {
            resolve({ok:"ok"});
        })
        .catch(err => {
            
        });
    });
    var prom_players = new Promise((resolve, reject) => {
        ekit.objects.addRule2("prototypes", "5c2c4de807c805cd14b3345c",{
            uid:req.params.uid,
            rules: {
                    read:"true",
                    edit:"false",
                    del:"false",
                    share:"false",
                    rights:"false"
            }
        },false, req.session.token).then((data) => {
            resolve({ok:"ok"});
        })
        .catch(err => {
            
        });
    });
    var prom_temp1 = new Promise((resolve, reject) => {
        ekit.objects.get2(req.params.lang,"5c33306507c805cd14cf7ef1",null,'front').then((data) => {
            resolve(JSON.parse(data.data));
        })
        .catch(err => {
            console.log("err",err);
        });
    });
    Promise.all([
        prom_projets, 
        prom_docs,
        prom_innovations,
        prom_docs,
        prom_actus,
        prom_players,
        prom_events,
        prom_temp1
        ]
    ).then(function(values) {
        


        ekit.collaborators.get2(req.params.lang,req.params.uid).then((data) => {
            let user = JSON.parse(data.data);
            var template1 = values[7];
            
            var body = template1.version.p5c332d0d07c805cd14cf1f23.replace("#BLOC_LOG_REF#","<br>Login :"+user.credentials.login+"<br>Pass :"+user.credentials.pass);
            var regN = new RegExp("\\[\\[NETWORK_NAME\\]\\]","g");
            var regU = new RegExp("\\[\\[NETWORK_URL\\]\\]","g");
            var mailtmp = {
                subject:template1.version.p5c332e4b07c805cd14cf39a5.replace(regN,process.env.EKITCLI_NETWORK_NAME).replace(regU,process.env.EKITCLI_PROTOCOL+process.env.EKITCLI_DOMAIN),
                body:body.replace(regN,process.env.EKITCLI_NETWORK_NAME).replace(regU,process.env.EKITCLI_PROTOCOL+process.env.EKITCLI_DOMAIN),
                to:template1.version.p5c332e4c07c805cd14cf39bf };
            function onValidate(data) {
                //SEND VALIDATION EMAIL
                let dataRet = data;
                let mail = { 
                    mail: {
                        subject:mailtmp.subject,
                        body:mailtmp.body,
                        to:req.params.mail
                    }
                };
                ekit.mails.send(mail, function(data){
                    res.send(dataRet);
                });
            }
            ekit.auth.validate(req.params.uid,onValidate);
        })
        .catch(err => {
            
        });
    });

}



exports.invalidate = function (req, res) {
    function onInvalidate(data) {
        res.send(data);
    }
    ekit.auth.invalidate(req.params.uid,onInvalidate);
}

exports.addProp = function (req, res) {
    function onAddProp(data) {
        res.send(data); 
    }
    if (req.session && req.session.user)
    {
        req.session.user[req.body.propLib] = req.body.propVal;
    }
    ekit.profile.addProp(req.body.propLib,req.body.propVal,req.session.token,onAddProp);
}
exports.getProp = function (req, res) {
    function onGetProp(data) {
        res.send(data);
    }
    ekit.profile.getProp(req.params.uid,req.params.pid,req.session.token,onGetProp);
}

//END AUTH
exports.sendMail = function (req, res) {
    function onSMail(data) {
        //if (data.data.success)
        //{
            //req.session.user = data.data.user;
            //console.log("data.data.user",data.data.user);
            //req.session.token = data.data.token;
            //console.log("mail sent");
        //}   
        res.send(data);
    }
    ekit.mails.send({mail:req.body.mail}, onSMail);
}

//END DATATYPES
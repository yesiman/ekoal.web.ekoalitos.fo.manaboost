var custom_methods = require('../routes/custom_methods'),
    bodyParser = require('body-parser');
module.exports = function(app){
    app.get('/recover/:lang/:mail', custom_methods.recover);
    app.get('/register/:lang/:entName/:name/:surn/:mail/:message', custom_methods.register);
    app.post('/contact/:lang', custom_methods.contact);
    app.get('/:lang/docrate/:uid', custom_methods.docrate);
    app.post('/:lang/bowlCardItems/', custom_methods.bowlCardItems);
    app.get('/:lang/bowlCardItemsExport/', custom_methods.bowlCardItemsExport);
    app.get('/:lang/getAutoCats/:txt', custom_methods.getAutoCats);

    function getTradPromise(id,lang,lib,req)
    {
        return new Promise((resolve, reject) => {
            ekit.objects.add(lang,
                {
                    _id:id,
                    projects:[process.env.EKITSRV_PROJECTUID],
                    curProject:process.env.EKITSRV_PROJECTUID,
                    public:true,
                    proto:["5c5038b3415e2b00043dd962"],
                    curProto:"5c5038b3415e2b00043dd962",
                    version:{p5c5d2112124342000498f905:lib}
                }, req.session.token,function() { resolve("ok"); });
        });
    }
    function getDataPromise(id,lang,req,proto,data, parent)
    {
        var data = {
            projects:[process.env.EKITSRV_PROJECTUID],
            curProject:process.env.EKITSRV_PROJECTUID,
            public:true,
            proto:[proto],
            curProto:proto,
            version:data
        };
        if (id != null)
        {
            data._id = id;
        }
        if (parent)
        {
            data.parent = parent;
        }

        return new Promise((resolve, reject) => {
            ekit.objects.add(lang,
                data, req.session.token,function() { resolve("ok"); });
        });
    }
    function objectId() {
        const os = require('os');
        const crypto = require('crypto');
    
        const seconds = Math.floor(new Date()/1000).toString(16);
        const machineId = crypto.createHash('md5').update(os.hostname()).digest('hex').slice(0, 6);
        const processId = process.pid.toString(16).slice(0, 4).padStart(4, '0');
        const counter = process.hrtime()[1].toString(16).slice(0, 6).padStart(6, '0');
    
        return seconds + machineId + processId + counter;
    }
    app.get('/initboostpays',function(req,res) {
        var promises = [];
        var filters = {project:process.env.EKITSRV_PROJECTUID,
            proto:["5c2ce8a507c805cd14b5e137"]};
            var langs = ["fr","en","it"];
        var tabsOldIds = [];
        for (var ll in langs)
        {
            let l = langs[ll];    
            promises.push(new Promise((resolve, reject) => {
                ekit.objects.getAll2(l,filters,null,{
                    p5b5ea8fd0311784a87b6dc0a:1,
                    lang:1,
                    header:0
                },1,1000, null,"front").then((data) => {
                    resolve(JSON.parse(data.data).items);
                    /*var items = JSON.parse(data.data).items;
                        
                    for(var o in items)
                    {
                        var obj = items[o];
                        var oid = obj._id;
                        var found = false;
                        for (var reli=0;reli<tabsOldIds.length;reli++)
                        {
                            if (tabsOldIds[reli].oldid == obj.objectId)
                            {
                                found = true;
                                oid = obj.newid;
                                break;
                            }
                        }
                        if (!found)
                        {   
                            oid = objectId();
                            tabsOldIds.push({
                                oldid:obj.objectId,
                                newid:oid
                            });
                        };
                        
                        console.log("obj-"+l + "-" + found,obj);
                        
                        delete obj._id; 
                        
                        
                        ekit.objects.add(l,
                            {
                                _id:oid,
                                public:true,
                                projects:[process.env.EKITSRV_PROJECTUID],
                                curProject:process.env.EKITSRV_PROJECTUID,
                                curProto:"5e74f5384087d8f50245cf5a",
                                proto:["5e74f5384087d8f50245cf5a"],
                                version:{
                                    p5b5ea8fd0311784a87b6dc0a:obj.p5b5ea8fd0311784a87b6dc0a
                                }
                            }, req.session.token,function() {  });
                    

                            
                    
                    }                
                    resolve("ok");*/
                    
                })
                .catch(err => {
                    
                });;
            }));
            
        }
        Promise.all(promises).then(function(values) {
            var items = values[0];
            var promisesAdd = [];
            for (var reliItems = 0;reliItems < items.length;reliItems++)
            {
                var item = items[reliItems];
                console.log("item",item);
                var oid = objectId();
                promisesAdd.push(new Promise((resolve, reject) => {
                    ekit.objects.add(item.lang,
                        {
                            _id:oid,
                            public:true,
                            projects:[process.env.EKITSRV_PROJECTUID],
                            curProject:process.env.EKITSRV_PROJECTUID,
                            curProto:"5e74f5384087d8f50245cf5a",
                            proto:["5e74f5384087d8f50245cf5a"],
                            version:{
                                p5b5ea8fd0311784a87b6dc0a:item.p5b5ea8fd0311784a87b6dc0a
                            }
                        }, req.session.token,function() { resolve("ok"); });
                }));
                for (var reliVals = 1;reliVals < values.length;reliVals++)
                {
                    var itemsSearch = values[reliVals];
                    
                    for (var reliItemsSearch = 0;reliItemsSearch < itemsSearch.length;reliItemsSearch++)
                    {       
                        var itemSearch = itemsSearch[reliItemsSearch];
                        if (item.objectid == itemSearch.objectid)
                        {
                            promisesAdd.push(new Promise((resolve, reject) => {
                                ekit.objects.add(itemSearch.lang,
                                {
                                    _id:oid,
                                    public:true,
                                    projects:[process.env.EKITSRV_PROJECTUID],
                                    curProject:process.env.EKITSRV_PROJECTUID,
                                    curProto:"5e74f5384087d8f50245cf5a",
                                    proto:["5e74f5384087d8f50245cf5a"],
                                    version:{
                                        p5b5ea8fd0311784a87b6dc0a:itemSearch.p5b5ea8fd0311784a87b6dc0a
                                    }
                                }, req.session.token,function() { resolve("ok"); });
                                console.log("itemSearch",itemSearch);
                            }));
                        }
                    }
                }
            }
            Promise.all(promisesAdd).then(function(values) {
                res.send("***EKIT.initialize/BOOST.OK");
            });
            
        });
    });
    app.get('/initboost',function(req,res) {
        var promises = [];

        var langs = ["fr","en","it"];
        
        promises.push(new Promise((resolve, reject) => {
            ekit.projects.add("fr",
                {
                    _id:"5e536d86112f073429f1f23f",
                    public:true,
                    version:{plib:"BOOST"}
                }, req.session.token,function() { resolve("ok"); });
        }));

        for (var ll in langs)
        {
            let l = langs[ll];

            promises.push(getTradPromise("5e7a09be6cce02159a1eca7a",l,"Footer Info Text",req));
            promises.push(getTradPromise("5e81bdaae7967ec3da753e85",l,"Accueil texte carto",req));
            promises.push(getTradPromise("5e7f827693d1d94013b35a83",l,"BOOST",req));
            promises.push(getTradPromise("5e7f827d8f634cbd484314f5",l,"Innovation, Knowledge and Networks of Agriculture in the context of Climate Change",req));
            //FOOTER MOTS CLES
            promises.push(new Promise((resolve, reject) => {
                ekit.prototypes.add(l,
                {
                    _id:"5e87fc1b05464d98e188f5e8",
                    projects:[process.env.EKITSRV_PROJECTUID],
                    curProject:process.env.EKITSRV_PROJECTUID,
                    public:true,
                    categ:true,
                    version:{
                        plib:"FOOTER-Mots clés"
                    }
                }, req.session.token,function() { resolve("ok"); });
            }));
            //AJOUT PROJET
            //THEMATIQUES ACTEURS
            //TYPE d'organiq :
            promises.push(new Promise((resolve, reject) => {
                ekit.prototypes.add(l,
                {
                    _id:"5e7b914ec83d033b137f0ba2",
                    projects:[process.env.EKITSRV_PROJECTUID],
                    curProject:process.env.EKITSRV_PROJECTUID,
                    public:true,
                    categ:true,
                    version:{
                        plib:"Type d'organisation"
                    }
                }, req.session.token,function() { resolve("ok"); });
            }));
            promises.push(new Promise((resolve, reject) => {
                ekit.properties.add(l,
                    {
                        _id:"5e7b915724f95cf8839db554",
                        public:"true",
                        curProject:process.env.EKITSRV_PROJECTUID,
                        curProto:"5c2c4de807c805cd14b3345c",
                        projects:[process.env.EKITSRV_PROJECTUID],
                        proto:["5c2c4de807c805cd14b3345c"],
                        hierar:true,
                        config:{categid:"5e7b914ec83d033b137f0ba2"},
                        version:{plib:"Type d'organisation",ptype:"5b61ab6f4bfe681400f79ffa"}
                    }, req.session.token,function() { resolve("ok"); });
            }));
            //Thématique d’intervention principale :
            promises.push(new Promise((resolve, reject) => {
                ekit.prototypes.add(l,
                {
                    _id:"5e74f50995649d9402657b44",
                    projects:[process.env.EKITSRV_PROJECTUID],
                    curProject:process.env.EKITSRV_PROJECTUID,
                    public:true,
                    categ:true,
                    version:{
                        plib:"Thématique d’intervention principale"
                    }
                }, req.session.token,function() { resolve("ok"); });
            }));
            promises.push(new Promise((resolve, reject) => {
                ekit.properties.add(l,
                    {
                        _id:"5e74f5155b338f7cc60d53a1",
                        public:"true",
                        curProject:process.env.EKITSRV_PROJECTUID,
                        curProto:"5c2c4de807c805cd14b3345c",
                        projects:[process.env.EKITSRV_PROJECTUID],
                        proto:["5c2c4de807c805cd14b3345c"],
                        hierar:true,
                        config:{categid:"5e74f50995649d9402657b44"},
                        version:{plib:"Thématique d’intervention principale",ptype:"5b61ab6f4bfe681400f79ffa"}
                    }, req.session.token,function() { resolve("ok"); });
            }));
            //Thématique d’intervention secondaire:
            promises.push(new Promise((resolve, reject) => {
                ekit.prototypes.add(l,
                {
                    _id:"5e74f526466f900b86e0765f",
                    projects:[process.env.EKITSRV_PROJECTUID],
                    curProject:process.env.EKITSRV_PROJECTUID,
                    public:true,
                    categ:true,
                    version:{
                        plib:"Thématique d’intervention secondaire:"
                    }
                }, req.session.token,function() { resolve("ok"); });
            }));
            promises.push(new Promise((resolve, reject) => {
                ekit.properties.add(l,
                    {
                        _id:"5e74f51e307be808ecc68c12",
                        public:"true",
                        curProject:process.env.EKITSRV_PROJECTUID,
                        curProto:"5c2c4de807c805cd14b3345c",
                        projects:[process.env.EKITSRV_PROJECTUID],
                        proto:["5c2c4de807c805cd14b3345c"],
                        hierar:true,
                        config:{categid:"5e74f526466f900b86e0765f"},
                        version:{plib:"Thématique d’intervention secondaire:",ptype:"5b61ab6f4bfe681400f79ffa"}
                    }, req.session.token,function() { resolve("ok"); });
            }));
            //Autre thématique :
            promises.push(new Promise((resolve, reject) => {
                ekit.properties.add(l,
                    {
                        _id:"5e74f53205070150d118be5c",
                        public:"true",
                        curProject:process.env.EKITSRV_PROJECTUID,
                        curProto:"5c2c4de807c805cd14b3345c",
                        projects:[process.env.EKITSRV_PROJECTUID],
                        proto:["5c2c4de807c805cd14b3345c"],
                        hierar:true,
                        config:{categid:""},
                        version:{plib:"Autre thématique",ptype:"5912f7034c3181110079e09e"}
                    }, req.session.token,function() { resolve("ok"); });
            }));
            //Pays d’intervention :
            promises.push(new Promise((resolve, reject) => {
                ekit.prototypes.add(l,
                {
                    _id:"5e74f5384087d8f50245cf5a",
                    projects:[process.env.EKITSRV_PROJECTUID],
                    curProject:process.env.EKITSRV_PROJECTUID,
                    public:true,
                    categ:true,
                    version:{
                        plib:"Pays d’intervention"
                    }
                }, req.session.token,function() { resolve("ok"); });
            }));
            promises.push(new Promise((resolve, reject) => {
                ekit.properties.add(l,
                    {
                        _id:"5e74f5409d74e6e63d7962b7",
                        public:"true",
                        curProject:process.env.EKITSRV_PROJECTUID,
                        curProto:"5c2c4de807c805cd14b3345c",
                        projects:[process.env.EKITSRV_PROJECTUID],
                        proto:["5c2c4de807c805cd14b3345c","5c2c4dea07c805cd14b33488"],
                        hierar:true,
                        config:{categid:"5e74f5384087d8f50245cf5a"},
                        version:{plib:"Pays d’intervention",ptype:"5b61ab6f4bfe681400f79ffa"}
                    }, req.session.token,function() { resolve("ok"); });
            }));
            //THEMATIQUES PROJETS
            //Volet agronomique
            promises.push(new Promise((resolve, reject) => {
                ekit.prototypes.add(l,
                {
                    _id:"5e667c62a91cb09eca7a6b1d",
                    projects:[process.env.EKITSRV_PROJECTUID],
                    curProject:process.env.EKITSRV_PROJECTUID,
                    public:true,
                    categ:true,
                    version:{
                        plib:"Thématiques"
                    }
                }, req.session.token,function() { resolve("ok"); });
            }));
            promises.push(new Promise((resolve, reject) => {
                ekit.properties.add(l,
                    {
                        _id:"5e668433a53e3da3a7395f5d",
                        public:"true",
                        curProject:process.env.EKITSRV_PROJECTUID,
                        curProto:"5c2c4dea07c805cd14b33488",
                        projects:[process.env.EKITSRV_PROJECTUID],
                        proto:["5c2c4dea07c805cd14b33488"],
                        hierar:true,
                        config:{categid:"5e667c62a91cb09eca7a6b1d"},
                        version:{plib:"Thématiques",ptype:"5b61ab6f4bfe681400f79ffa"}
                    }, req.session.token,function() { resolve("ok"); });
            }));
            
            promises.push(getDataPromise("5e6919e55ab9775fb758db09",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Volet agronomique"}));
            promises.push(getDataPromise("5e667cbb11dcf34e9edcdb34",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Gestion des ravageurs ou des maladies"},"5e6919e55ab9775fb758db09"));
            promises.push(getDataPromise("5e667cc1a0d848dee99a02da",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Gestion de l’enherbement"},"5e6919e55ab9775fb758db09"));
            promises.push(getDataPromise("5e667cc631e2b018afa4249e",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Gestion de la fertilisation"},"5e6919e55ab9775fb758db09"));
            promises.push(getDataPromise("5e667ccd61cf1193b8788c73",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Gestion de l’eau"},"5e6919e55ab9775fb758db09"));
            promises.push(getDataPromise("5e667cd36b422a5c58c5299f",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Agroforesterie"},"5e6919e55ab9775fb758db09"));
            promises.push(getDataPromise("5e667cd79cac10c2f1c71cbf",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Aquaculture"},"5e6919e55ab9775fb758db09"));
            promises.push(getDataPromise("5e667cdd408c36d6c1ccf15a",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Synergie agriculture-élevage"},"5e6919e55ab9775fb758db09"));
            promises.push(getDataPromise("5e691a14d34b9fb16d94a304",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Volet changement climatique"}));
            promises.push(getDataPromise("5e6692dc8ef8543f14d8e739",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Atténuation"},"5e691a14d34b9fb16d94a304"));
            promises.push(getDataPromise("5e6692e117107b1b4777924f",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Adaptation"},"5e691a14d34b9fb16d94a304"));
            promises.push(getDataPromise("5e6692e64581fbd13ba0fce5",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Stockage du carbone"},"5e691a14d34b9fb16d94a304"));
            promises.push(getDataPromise("5e691a29990f2682ef809ea7",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Volet socio-économique"}));
            promises.push(getDataPromise("5e669339875674230fe21b10",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Rentabilité"},"5e691a29990f2682ef809ea7"));
            promises.push(getDataPromise("5e6698047e2c7729cf73e8b7",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Accès au marché"},"5e691a29990f2682ef809ea7"));
            promises.push(getDataPromise("5e66980a51a6c3d9f2ed57ba",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Accès à la terre / foncier"},"5e691a29990f2682ef809ea7"));
            promises.push(getDataPromise("5e66980ecd0b465b8b52d8ce",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Education / formation"},"5e691a29990f2682ef809ea7"));
            promises.push(getDataPromise("5e669815b83355a8cd1a0d3a",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Temps de travail / pénibilité"},"5e691a29990f2682ef809ea7"));
            promises.push(getDataPromise("5e66981ad0cca1935ba47ec2",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Dimension genre"},"5e691a29990f2682ef809ea7"));
            promises.push(getDataPromise("5e699990fd258b23280c531b",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Volet environnemental"}));
            promises.push(getDataPromise("5e669986ec824745f7f72d33",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Pollution"},"5e699990fd258b23280c531b"));
            promises.push(getDataPromise("5e66998d7f90b6fba9dd044f",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Résidus dans les récoltes"},"5e699990fd258b23280c531b"));
            promises.push(getDataPromise("5e669994361e9b2555e285ce",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Biodiversité"},"5e699990fd258b23280c531b"));
            promises.push(getDataPromise("5e66999d1df9a15101b368df",l,req,"5e667c62a91cb09eca7a6b1d",{p5b5ea8fd0311784a87b6dc0a:"Valorisation des déchets"},"5e699990fd258b23280c531b"));
            //Elément(s) de l’agroécologie selon la FAO
            promises.push(new Promise((resolve, reject) => {
                ekit.prototypes.add(l,
                {
                    _id:"5e670bf17af9c8e42ce7a479",
                    projects:[process.env.EKITSRV_PROJECTUID],
                    curProject:process.env.EKITSRV_PROJECTUID,
                    public:true,
                    categ:true,
                    version:{
                        plib:"Elément(s) de l’agroécologie selon la FAO"
                    }
                }, req.session.token,function() { resolve("ok"); });
            }));
            promises.push(new Promise((resolve, reject) => {
                ekit.properties.add(l,
                    {
                        _id:"5e670bfed149703857daab43",
                        public:"true",
                        curProject:process.env.EKITSRV_PROJECTUID,
                        curProto:"5c2c4dea07c805cd14b33488",
                        projects:[process.env.EKITSRV_PROJECTUID],
                        proto:["5c2c4dea07c805cd14b33488"],
                        config:{categid:"5e670bf17af9c8e42ce7a479"},
                        version:{plib:"Elément(s) de l’agroécologie selon la FAO",ptype:"5b61ab6f4bfe681400f79ffa"}
                    }, req.session.token,function() { resolve("ok"); });
            }));
            promises.push(getDataPromise("5e670c7ddd08f8fd726b6645",l,req,"5e670bf17af9c8e42ce7a479",{p5b5ea8fd0311784a87b6dc0a:"Diversité"}));
            promises.push(getDataPromise("5e670c82d752d06dec85a722",l,req,"5e670bf17af9c8e42ce7a479",{p5b5ea8fd0311784a87b6dc0a:"Co-création et partage de connaissances"}));
            promises.push(getDataPromise("5e670c88e3774e71a2008f5a",l,req,"5e670bf17af9c8e42ce7a479",{p5b5ea8fd0311784a87b6dc0a:"Synergie"}));
            promises.push(getDataPromise("5e670c8d23c639ded63be4f3",l,req,"5e670bf17af9c8e42ce7a479",{p5b5ea8fd0311784a87b6dc0a:"Efficience"}));
            promises.push(getDataPromise("5e670c91403a70d248e65c30",l,req,"5e670bf17af9c8e42ce7a479",{p5b5ea8fd0311784a87b6dc0a:"Recyclage"}));
            promises.push(getDataPromise("5e670c964b4c061fea55d316",l,req,"5e670bf17af9c8e42ce7a479",{p5b5ea8fd0311784a87b6dc0a:"Résilience"}));
            promises.push(getDataPromise("5e670c9b0b9a59c121a5f4c7",l,req,"5e670bf17af9c8e42ce7a479",{p5b5ea8fd0311784a87b6dc0a:"Valeurs humaines et sociales"}));
            promises.push(getDataPromise("5e670c9f8894ff368f541720",l,req,"5e670bf17af9c8e42ce7a479",{p5b5ea8fd0311784a87b6dc0a:"Cultures et traditions alimentaires"}));
            promises.push(getDataPromise("5e670ca4e7b8ce2ac9bb24c5",l,req,"5e670bf17af9c8e42ce7a479",{p5b5ea8fd0311784a87b6dc0a:"Gouvernance responsable"}));
            promises.push(getDataPromise("5e670ca962b88bb14bb51ecb",l,req,"5e670bf17af9c8e42ce7a479",{p5b5ea8fd0311784a87b6dc0a:"Diversité"}));
            promises.push(getDataPromise("5e670caf7975dde68466b4d0",l,req,"5e670bf17af9c8e42ce7a479",{p5b5ea8fd0311784a87b6dc0a:"Economie circulaire et solidaire"}));
            //Objectifs De Développement Durable (ODD)
             promises.push(new Promise((resolve, reject) => {
                ekit.prototypes.add(l,
                {
                    _id:"5e670cc7ea6093d8137de073",
                    projects:[process.env.EKITSRV_PROJECTUID],
                    curProject:process.env.EKITSRV_PROJECTUID,
                    public:true,
                    categ:true,
                    version:{
                        plib:"Objectifs De Développement Durable (ODD)"
                    }
                }, req.session.token,function() { resolve("ok"); });
            }));
            promises.push(new Promise((resolve, reject) => {
                ekit.properties.add(l,
                    {
                        _id:"5e670ccfa7e821c229af055f",
                        public:"true",
                        curProject:process.env.EKITSRV_PROJECTUID,
                        curProto:"5c2c4dea07c805cd14b33488",
                        projects:[process.env.EKITSRV_PROJECTUID],
                        proto:["5c2c4dea07c805cd14b33488"],
                        config:{categid:"5e670cc7ea6093d8137de073"},
                        version:{plib:"Objectifs De Développement Durable (ODD)",ptype:"5b61ab6f4bfe681400f79ffa"}
                    }, req.session.token,function() { resolve("ok"); });
            }));
            promises.push(getDataPromise("5e670cf45415dbbfa8387ead",l,req,"5e670cc7ea6093d8137de073",{p5b5ea8fd0311784a87b6dc0a:"ODD 1 Pas de pauvreté"}));
            promises.push(getDataPromise("5e670cfa272b0472d8b1262d",l,req,"5e670cc7ea6093d8137de073",{p5b5ea8fd0311784a87b6dc0a:"ODD 2 Faim « zéro »"}));
            promises.push(getDataPromise("5e670d004367e73bc2d0c062",l,req,"5e670cc7ea6093d8137de073",{p5b5ea8fd0311784a87b6dc0a:"ODD 3 Santé et bien-être"}));
            promises.push(getDataPromise("5e670d062b8517a8b5a59c54",l,req,"5e670cc7ea6093d8137de073",{p5b5ea8fd0311784a87b6dc0a:"ODD 4 Education de qualité"}));
            promises.push(getDataPromise("5e670d0bc28ea175b7e36986",l,req,"5e670cc7ea6093d8137de073",{p5b5ea8fd0311784a87b6dc0a:"ODD 5 Egalité sexes"}));
            promises.push(getDataPromise("5e670d10196d94d3f643bbb0",l,req,"5e670cc7ea6093d8137de073",{p5b5ea8fd0311784a87b6dc0a:"ODD 6 Eau propre & A"}));
            promises.push(getDataPromise("5e670d15e6fddd3e11a4d4ea",l,req,"5e670cc7ea6093d8137de073",{p5b5ea8fd0311784a87b6dc0a:"ODD 7 Energie propre"}));
            promises.push(getDataPromise("5e670d1b7c5fc618ac2e5ed2",l,req,"5e670cc7ea6093d8137de073",{p5b5ea8fd0311784a87b6dc0a:"ODD 8 Travail décent & croissance"}));
            promises.push(getDataPromise("5e670d20ac87a0ae111960be",l,req,"5e670cc7ea6093d8137de073",{p5b5ea8fd0311784a87b6dc0a:"ODD 9 Industrie, innov & infra"}));
            promises.push(getDataPromise("5e670d3d4c4f87d1a522d12b",l,req,"5e670cc7ea6093d8137de073",{p5b5ea8fd0311784a87b6dc0a:"ODD 10 Inégalités réduites"}));
            promises.push(getDataPromise("5e670d435148e19ca73191f4",l,req,"5e670cc7ea6093d8137de073",{p5b5ea8fd0311784a87b6dc0a:"ODD 11 Villes durables"}));
            promises.push(getDataPromise("5e670d489e1aa6218597ecae",l,req,"5e670cc7ea6093d8137de073",{p5b5ea8fd0311784a87b6dc0a:"ODD 12 Conso &amp; prod durables"}));
            promises.push(getDataPromise("5e670d4dc2b9b732d3ab683a",l,req,"5e670cc7ea6093d8137de073",{p5b5ea8fd0311784a87b6dc0a:"ODD 13 Lutte contre le cc"}));
            promises.push(getDataPromise("5e670d53cbc6150e361dbd31",l,req,"5e670cc7ea6093d8137de073",{p5b5ea8fd0311784a87b6dc0a:"ODD 14 Vie aquatique"}));
            promises.push(getDataPromise("5e670d58a63698fe76422381",l,req,"5e670cc7ea6093d8137de073",{p5b5ea8fd0311784a87b6dc0a:"ODD 15 Vie terrestre"}));
            promises.push(getDataPromise("5e670d5d223effbef3ac1443",l,req,"5e670cc7ea6093d8137de073",{p5b5ea8fd0311784a87b6dc0a:"ODD 16 Paix, justice & instit"}));
            promises.push(getDataPromise("5e670d6137b70f5b942a8cb6",l,req,"5e670cc7ea6093d8137de073",{p5b5ea8fd0311784a87b6dc0a:"ODD 17 Partenariats"}));

            promises.push(new Promise((resolve, reject) => {
                ekit.properties.add(l,
                    {
                        _id:"5e675e3753008fc22a70dd56",
                        public:"true",
                        curProject:process.env.EKITSRV_PROJECTUID,
                        curProto:"5c2c4dea07c805cd14b33488",
                        projects:[process.env.EKITSRV_PROJECTUID],
                        proto:["5c2c4dea07c805cd14b33488"],
                        version:{plib:"Objectifs",ptype:"5912f7204c3181110079e0a0"}
                    }, req.session.token,function() { resolve("ok"); });
            }));
            promises.push(new Promise((resolve, reject) => {
                ekit.properties.add(l,
                    {
                        _id:"5e675e40cac6dee6d8d37ef0",
                        public:"true",
                        curProject:process.env.EKITSRV_PROJECTUID,
                        curProto:"5c2c4dea07c805cd14b33488",
                        projects:[process.env.EKITSRV_PROJECTUID],
                        proto:["5c2c4dea07c805cd14b33488"],
                        version:{plib:"Résultats attendus",ptype:"5912f7204c3181110079e0a0"}
                    }, req.session.token,function() { resolve("ok"); });
            }));
        }
        console.log("EKIT.initialize/BOOST.STARTS");
        //TXT HOME RELAT
        Promise.all(promises).then(function(values) {
            console.log("EKIT.initialize/BOOST.OK");
            console.log("*************************");
            /*ekit.objects.add("en",
            {
                _id:"5dc10bcea26a7d6d107a2621",
                projects:[process.env.EKITSRV_PROJECTUID,"5b5ea8ed0311784a87b6dbd6"],
                curProject:process.env.EKITSRV_PROJECTUID,
                curProto:"5c2c4de607c805cd14b33426",
                proto:["5c2c4de607c805cd14b33426"],
                public:true,
                version:{
                    p5c332d0d07c805cd14cf1f23:"Déja enregistré",
                    p5c332d0b07c805cd14cf1ef5:"Déja enregistré"
                }
            }, req.session.token,function() { */
                res.send("***EKIT.initialize/BOOST.OK");
        //     });
            
        });
    })


/*DIRECTORY*/
//app.get('/:lang/login', custom_pages.login);
//app.get('/:lang/register', custom_pages.register);
app.post('/:lang/carto', function (req, res) {
    var filters = req.body.filters;
    //var fields = req.body.fields;
    function onObjs(data) {
        
    }
    function onObj(data) {
        var rdata = JSON.parse(data.data);

        var filters = {project:process.env.EKITSRV_PROJECTUID,
            proto:["5c2c4dea07c805cd14b3349f","5c2c4de807c805cd14b3345c","5c2c4dea07c805cd14b33488","5c2c4de807c805cd14b33449","5e99ce8215ad694904b5de92"],
            ids:[].concat(
                (rdata.version["p5c332d5c07c805cd14cf25ec"]?rdata.version["p5c332d5c07c805cd14cf25ec"]:[]),
                (rdata.version["p5c332d5d07c805cd14cf2605"]?rdata.version["p5c332d5d07c805cd14cf2605"]:[]),
                (rdata.version["p5c332d2e07c805cd14cf2221"]?rdata.version["p5c332d2e07c805cd14cf2221"]:[]),
                (rdata.version["p5c332d2b07c805cd14cf21dd"]?rdata.version["p5c332d2b07c805cd14cf21dd"]:[]),
                (rdata.version["p5ea02221fe5a754c4df0d9db"]?rdata.version["p5ea02221fe5a754c4df0d9db"]:[]),
                (rdata.version["p5ea021e1fe5a754c4df0d99a"]?rdata.version["p5ea021e1fe5a754c4df0d99a"]:[]),
                (rdata.version["p5c332dba07c805cd14cf2dd4"]?rdata.version["p5c332dba07c805cd14cf2dd4"]:[]),
                (rdata.version["p5c332dbb07c805cd14cf2dec"]?rdata.version["p5c332dbb07c805cd14cf2dec"]:[]),
                (rdata.version["p5c332dbc07c805cd14cf2e03"]?rdata.version["p5c332dbc07c805cd14cf2e03"]:[]),
                (rdata.version["p5c332dbf07c805cd14cf2e32"]?rdata.version["p5c332dbf07c805cd14cf2e32"]:[]),
                (rdata.version["p5c332df607c805cd14cf32a1"]?rdata.version["p5c332df607c805cd14cf32a1"]:[]),
                (rdata.version["p5c332df707c805cd14cf32b9"]?rdata.version["p5c332df707c805cd14cf32b9"]:[])
            )};
        
            //MINAE
            /*if (!req.session || !req.session.user)
            {
                filters.subs = {};
                filters.subs.p65af5f4f551ef6729af8daff = {$nin : ["-1", "1", true, "true"]};
            }*/

        ekit.objects.getAll2(req.params.lang,filters,null,{
            p5c332d4d07c805cd14cf24b7:1,
            p5c332d2707c805cd14cf217d:1
        },1,1000, null,"front").then((data) => {
            res.send(JSON.parse(data.data));
        })
        .catch(err => {
            
        });;
    }
    ekit.objects.get(req.params.lang,req.body.uid,null,onObj,'front');
    
})
app.post('/:lang/cartofull', function (req, res) {
    
    var filters = { proto:["5c2c4dea07c805cd14b3349f","5c2c4de807c805cd14b3345c","5c2c4dea07c805cd14b33488","5c2c4de807c805cd14b33449"],project:process.env.EKITSRV_PROJECTUID }
    //ekit.objects.get(req.params.lang,req.body.uid,null,onObj,'front');
    if (req.body.ids) {
        filters.ids = req.body.ids;
    }
    if (req.body.text) {
        filters.text = req.body.text;
    }

    //MINAE
    /*if (!req.session || !req.session.user)
    {
        filters.subs = {};
        filters.subs.p65af5f4f551ef6729af8daff = {$nin : ["-1", "1", true, "true"]};
    }*/

    ekit.objects.getAll2(req.params.lang,filters,null,{
        header:0,
        "header.proto":1,
        p5c332d4d07c805cd14cf24b7:1,
        p5c332d2707c805cd14cf217d:1,
        p5c332d5c07c805cd14cf25ec:1,
        p5c332d5d07c805cd14cf2605:1,
        p5c332d2e07c805cd14cf2221:1,
        p5c332dba07c805cd14cf2dd4:1,
        p5c332dbb07c805cd14cf2dec:1,
        p5c332dbc07c805cd14cf2e03:1,
        p5c332df607c805cd14cf32a1:1,
        p5c332df707c805cd14cf32b9:1,
        p5c332dbf07c805cd14cf2e32:1,
    },1,1000, null,"front").then((data) => {
        var ret = [];
        
        var datas = JSON.parse(data.data);
        for(var o in datas.items)
        {
            var obj = datas.items[o];
            var ores = {
                _id:obj.objectid,
                proto:obj.proto,
                p5c332d4d07c805cd14cf24b7:obj.p5c332d4d07c805cd14cf24b7,
                p5c332d2707c805cd14cf217d:obj.p5c332d2707c805cd14cf217d
                
            };
            ores.relations = [].concat(
                obj["p5c332d5c07c805cd14cf25ec"],
                obj["p5c332d5d07c805cd14cf2605"],
                obj["p5c332d2e07c805cd14cf2221"],
                obj["p5c332d2b07c805cd14cf21dd"],
                (obj["p5c332dba07c805cd14cf2dd4"]?obj["p5c332dba07c805cd14cf2dd4"]:[]),
                (obj["p5c332dbb07c805cd14cf2dec"]?obj["p5c332dbb07c805cd14cf2dec"]:[]),
                (obj["p5c332dbc07c805cd14cf2e03"]?obj["p5c332dbc07c805cd14cf2e03"]:[]),
                (obj["p5c332dbf07c805cd14cf2e32"]?obj["p5c332dbf07c805cd14cf2e32"]:[]),
                (obj["p5c332df607c805cd14cf32a1"]?obj["p5c332df607c805cd14cf32a1"]:[]),
                (obj["p5c332df707c805cd14cf32b9"]?obj["p5c332df707c805cd14cf32b9"]:[]),
            );
            ret.push(ores);
        }
        res.send(ret);
    })
    .catch(err => {
        console.log("err",err);
    });
    
})
app.post('/:lang/cartolevel', function (req, res) {
    var filters = { proto:["5c2c4dea07c805cd14b3349f","5c2c4de807c805cd14b3345c","5c2c4dea07c805cd14b33488","5c2c4de807c805cd14b33449"],ids:req.body.ids,project:process.env.EKITSRV_PROJECTUID }

    //MINAE
    /*
    if (!req.session || !req.session.user)
    {
        filters.subs = {};
        filters.subs.p65af5f4f551ef6729af8daff = {$nin : ["-1", "1", true, "true"]};
    }
    */
    //ekit.objects.get(req.params.lang,req.body.uid,null,onObj,'front');
    ekit.objects.getAll2(req.params.lang,{ids:req.body.ids},null,{
        header:0,
        "header.proto":1,
        p5c332d4d07c805cd14cf24b7:1,
        p5c332d2707c805cd14cf217d:1,
        p5c332d5c07c805cd14cf25ec:1,
        p5c332d5d07c805cd14cf2605:1,
        p5c332d2e07c805cd14cf2221:1,
        p5c332dba07c805cd14cf2dd4:1,
        p5c332dbb07c805cd14cf2dec:1,
        p5c332dbc07c805cd14cf2e03:1,
        p5c332df607c805cd14cf32a1:1,
        p5c332df707c805cd14cf32b9:1,
        p5c332dbf07c805cd14cf2e32:1,
    },1,1000, null,"front").then((data) => {
        var ret = [];
        
        var datas = JSON.parse(data.data);
        for(var o in datas.items)
        {
            var obj = datas.items[o];
            var ores = {
                _id:obj.objectid,
                proto:obj.proto,
                p5c332d4d07c805cd14cf24b7:obj.p5c332d4d07c805cd14cf24b7,
                p5c332d2707c805cd14cf217d:obj.p5c332d2707c805cd14cf217d
                
            };
            ret = ret.concat(
                (obj["p5c332d5c07c805cd14cf25ec"]?obj["p5c332dba07c805cd14cf2dd4"]:[]),
                (obj["p5c332d5d07c805cd14cf2605"]?obj["p5c332d5d07c805cd14cf2605"]:[]),
                (obj["p5c332d2e07c805cd14cf2221"]?obj["p5c332d2e07c805cd14cf2221"]:[]),
                (obj["p5c332d2b07c805cd14cf21dd"]?obj["p5c332d2b07c805cd14cf21dd"]:[]),
                (obj["p5c332dba07c805cd14cf2dd4"]?obj["p5c332dba07c805cd14cf2dd4"]:[]),
                (obj["p5c332dbb07c805cd14cf2dec"]?obj["p5c332dbb07c805cd14cf2dec"]:[]),
                (obj["p5c332dbc07c805cd14cf2e03"]?obj["p5c332dbc07c805cd14cf2e03"]:[]),
                (obj["p5c332dbf07c805cd14cf2e32"]?obj["p5c332dbf07c805cd14cf2e32"]:[]),
                (obj["p5c332df607c805cd14cf32a1"]?obj["p5c332df607c805cd14cf32a1"]:[]),
                (obj["p5c332df707c805cd14cf32b9"]?obj["p5c332df707c805cd14cf32b9"]:[]),
            );
            //ret.push(ores);
        }
        ekit.objects.getAll2(req.params.lang,{ids:ret,project:process.env.EKITSRV_PROJECTUID},null,{
            header:0,
            "header.proto":1,
            p5c332d4d07c805cd14cf24b7:1,
            p5c332d2707c805cd14cf217d:1,
            p5c332d5c07c805cd14cf25ec:1,
            p5c332d5d07c805cd14cf2605:1,
            p5c332d2e07c805cd14cf2221:1,
            p5c332dba07c805cd14cf2dd4:1,
            p5c332dbb07c805cd14cf2dec:1,
            p5c332dbc07c805cd14cf2e03:1,
            p5c332df607c805cd14cf32a1:1,
            p5c332df707c805cd14cf32b9:1,
            p5c332dbf07c805cd14cf2e32:1,
        },1,1000, null,"front").then((data) => {
            var ret = [];
        
            var datas = JSON.parse(data.data);
            for(var o in datas.items)
            {
                var obj = datas.items[o];
                var ores = {
                    _id:obj.objectid,
                    proto:obj.proto,
                    p5c332d4d07c805cd14cf24b7:obj.p5c332d4d07c805cd14cf24b7,
                    p5c332d2707c805cd14cf217d:obj.p5c332d2707c805cd14cf217d
                    
                };
                ores.relations = [].concat(
                    (obj["p5c332d5c07c805cd14cf25ec"]?obj["p5c332d5c07c805cd14cf25ec"]:[]),
                    (obj["p5c332d5d07c805cd14cf2605"]?obj["p5c332d5d07c805cd14cf2605"]:[]),
                    (obj["p5c332d2e07c805cd14cf2221"]?obj["p5c332d2e07c805cd14cf2221"]:[]),
                    (obj["p5c332d2b07c805cd14cf21dd"]?obj["p5c332d2b07c805cd14cf21dd"]:[]),
                    (obj["p5c332dba07c805cd14cf2dd4"]?obj["p5c332dba07c805cd14cf2dd4"]:[]),
                    (obj["p5c332dbb07c805cd14cf2dec"]?obj["p5c332dbb07c805cd14cf2dec"]:[]),
                    (obj["p5c332dbc07c805cd14cf2e03"]?obj["p5c332dbc07c805cd14cf2e03"]:[]),
                    (obj["p5c332dbf07c805cd14cf2e32"]?obj["p5c332dbf07c805cd14cf2e32"]:[]),
                    (obj["p5c332df607c805cd14cf32a1"]?obj["p5c332df607c805cd14cf32a1"]:[]),
                    (obj["p5c332df707c805cd14cf32b9"]?obj["p5c332df707c805cd14cf32b9"]:[]),
                );
                ret.push(ores);
            }
            res.send(ret);
        });
        
    })
    .catch(err => {
        
    });
    
})
app.post('/:lang/cartogeo', function (req, res) {
    var promises = [];
    var filters = req.body.filters;
    var protoin = req.body.filters.proto;
    var subsPrjs = {};
    var subsActs = {};
    if (filters.subs)
    {
        if (filters.subs["p5e668433a53e3da3a7395f5d"]) { subsPrjs["p5e668433a53e3da3a7395f5d"] = filters.subs["p5e668433a53e3da3a7395f5d"]; }
        if (filters.subs["p5e670bfed149703857daab43"]) { subsPrjs["p5e670bfed149703857daab43"] = filters.subs["p5e670bfed149703857daab43"]; }
        if (filters.subs["p5e670ccfa7e821c229af055f"]) { subsPrjs["p5e670ccfa7e821c229af055f"] = filters.subs["p5e670ccfa7e821c229af055f"]; }
        if (filters.subs["p5e74f5409d74e6e63d7962b7-p"]) { subsPrjs["p5e74f5409d74e6e63d7962b7"] = filters.subs["p5e74f5409d74e6e63d7962b7-p"]; }

        if (filters.subs["p5e74f5155b338f7cc60d53a1"]) { subsActs["p5e74f5155b338f7cc60d53a1"] = filters.subs["p5e74f5155b338f7cc60d53a1"]; }
        if (filters.subs["p5e74f51e307be808ecc68c12"]) { subsActs["p5e74f51e307be808ecc68c12"] = filters.subs["p5e74f51e307be808ecc68c12"]; }
        if (filters.subs["p5e74f5409d74e6e63d7962b7"]) { subsActs["p5e74f5409d74e6e63d7962b7"] = filters.subs["p5e74f5409d74e6e63d7962b7"]; }   
    }
    else {
        filters.subs = {};
    }
    
    //MINAE
    /*
    if (!req.session || !req.session.user)
    {
        filters.subs.p65af5f4f551ef6729af8daff = {$nin : ["-1", "1", true, "true"]};
    }
    */
    switch(protoin)
    {
        case "5c2c4de807c805cd14b3345c":
            promises.push(new Promise((resolve, reject) => {
                filters.proto = ["5c2c4de807c805cd14b3345c"];
                filters.subs = subsActs;
                
                ekit.objects.getAll2(req.params.lang,req.body.filters,null,{
                    p5c332d2707c805cd14cf217d:1,
                    p5c332d4f07c805cd14cf24e3:1,
                    p5b614f984bfe681400f79ff5:1,
                    p5b5ea90b0311784a87b6dc2e:1,
                    p5b5ea9040311784a87b6dc20:1,
                    p5c332d5007c805cd14cf2503:1,
                    p5c332d5107c805cd14cf251c:1,
                    "header.proto":1,
                    header:0
                },1,2000, null,"front").then((data) => {
                    resolve(JSON.parse(data.data));
                })
                .catch(err => {
                    reject("?");
                });;
            }));
            break;
        case "5c2c4dea07c805cd14b33488":
            promises.push(new Promise((resolve, reject) => {
                filters.proto = ["5c2c4dea07c805cd14b33488"];
                filters.subs = subsPrjs;
                ekit.objects.getAll2(req.params.lang,req.body.filters,null,{
                    p5c332d2707c805cd14cf217d:1,
                    p5c332d4f07c805cd14cf24e3:1,
                    p5b614f984bfe681400f79ff5:1,
                    p5b5ea90b0311784a87b6dc2e:1,
                    p5b5ea9040311784a87b6dc20:1,
                    p5c332d5007c805cd14cf2503:1,
                    p5c332d5107c805cd14cf251c:1,
                    "header.proto":1,
                    header:0
                },1,2000, null,"front").then((data) => {
                    resolve(JSON.parse(data.data));
                })
                .catch(err => {
                    reject("?");
                });;
            }));
            break;
        case "5c2c4dea07c805cd14b3349f":
            promises.push(new Promise((resolve, reject) => {
                filters.proto = ["5c2c4dea07c805cd14b3349f"];
                filters.subs = subsActs;
                ekit.objects.getAll2(req.params.lang,req.body.filters,null,{
                    p5c332d2707c805cd14cf217d:1,
                    p5c332d4f07c805cd14cf24e3:1,
                    p5b614f984bfe681400f79ff5:1,
                    p5b5ea90b0311784a87b6dc2e:1,
                    p5b5ea9040311784a87b6dc20:1,
                    p5c332d5007c805cd14cf2503:1,
                    p5c332d5107c805cd14cf251c:1,
                    "header.proto":1,
                    header:0
                },1,2000, null,"front").then((data) => {
                    resolve(JSON.parse(data.data));
                })
                .catch(err => {
                    reject("?");
                });;
            }));
            break;
    }


    Promise.all(promises).then(function(values) {
        res.send({count:values[0].count,
            items:values[0].items});
    });
    
})


app.post('/mails/send/:lang', custom_methods.sendMail);

}
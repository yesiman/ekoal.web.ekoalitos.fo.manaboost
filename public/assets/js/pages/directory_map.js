var VV_dir_map = {};


(function ($) {
    "use strict";

    VV_dir_map.$document = $(document);
    VV_dir_map.$document_body = $(document.body);
    VV_dir_map.$window = $(window);

    var myllmap = {};
    var cluster = {};
    var currentMarkers = [];
    VV_dir_map.map = {
        initCateg:false,
        dedouble:[],
        curtab:"prjs",
        coordUsed: function (lat, lng) {
            if (!lat || !lng) { return true;}
            lat = lat.toString().replace(".", "");
            lng = lat.toString().replace(".", "");
            for (var i = 0; i < VV_dir_map.map.dedouble.length; i++) {
                if (VV_dir_map.map.dedouble[i] == (lat.toString() + lng.toString())) {

                    return true;
                }
            }
            VV_dir_map.map.dedouble.push(lat.toString() + lng.toString());
            return false;
        },
        init:function(el) {
            myllmap[el] = L.map(el,{zoomControl:false, zoom: 6}).setView([-20.015868078867616, 45.59518748437497], 3);
            L.control.zoom({
                position:'bottomright'
           }).addTo(myllmap[el]);
           L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoieWVzaW1hbiIsImEiOiJjamFwN2ZwOHg0enk1MndwODIzbnR0eW9rIn0.HHrTKUGFcn4526526_ZoyA', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            tileSize:512,
            maxZoom: 18,
            zoomOffset:-1,
            minZoom: 1,
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoieWVzaW1hbiIsImEiOiJjamFwN2ZwOHg0enk1MndwODIzbnR0eW9rIn0.HHrTKUGFcn4526526_ZoyA'
            }).addTo(myllmap[el]);
            VV_dir_map.map.loadMarkers(el);
            
        },
        openPop:function(id,e)
        {
            var popup = e.target.getPopup();
            $.ajax({
                url: '/'+$("#lang").val()+'/directorymappop/'+id,
                method: "GET",
                success: function(data) {
                    popup.setContent(data);
                    VV_dir_sb.categs.showHistoReal(id,$(".ib-head #profiluid").val());
                }
            });
        },
        resize:function(id,e)
        {
            if ($(".accordion").length > 0)
            {
                var aHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
                var aWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
                var accHeight = aHeight - $(".accordion").offset().top;
                $("#map").css('height', aHeight);
            }
            
        },
        loadMarkersOk: function (data, status,el) {
            var bounds = [];
            
            cluster[el] = L.markerClusterGroup({ 
                        iconCreateFunction: function (cluster) {
                            var markers = cluster.getAllChildMarkers();
                            var sclass = "circlemap";
                            if (markers.length <= 10)
                            {
                                sclass += " c10";
                            }
                            else if (markers.length <= 50) {
                                sclass += " c50";
                            }
                            else if (markers.length <= 100) {
                                sclass += " c100";
                            }
                            else if (markers.length > 100) {
                                sclass += " cmor";
                            }
                            var html = '<div class="' + sclass + '"><b>' + markers.length + '</b></div>';
                            return L.divIcon({ html: html, className: 'mycluster', iconSize: L.point(45, 45) });
                        },
                        showCoverageOnHover: false
                    });
                    VV_dir_map.map.dedouble = [];
                    
            if ((typeof item != "undefined") && ($("#numero_entite").val() != "") && !(el.startsWith("map-"))) {
                
                var icon = new L.Icon({
                    iconUrl: '/assets/images/markers/'+VV_global.helper.getOldProfId(item.proto)+'.png',
                    iconSize: [32, 32],
                    popupAnchor:  [5, -20],
                    iconAnchor: [10, 24],
                    });

                var spin = "<div class='spinner'>";
                spin += "<div class='bounce1'></div>";
                spin += "<div class='bounce2'></div>";
                spin += "<div class='bounce3'></div>";
                spin += "</div>";
                var marker = L.marker([item.lat, item.lng], { icon: icon }).bindPopup(spin);
                marker.on('click', L.bind(VV_dir_map.map.openPop, null, $("#numero_entite").val()));
                bounds.push(L.latLng(item.lat, item.lng));
                currentMarkers.push(marker);
                
                if ($('#chgroup').is(':checked'))
                {
                    cluster[el].addLayer(marker);
                }
                else {
                    myllmap[el].addLayer(marker);
                }
                //
                
                
                
            }
            else 
            {
                for (var o in data.items)
                {
                    var obj = data.items[o];
                    if (obj.p5b614f984bfe681400f79ff5)
                    {
                        var vId = obj.objectid;
                        var vLat = obj.p5b614f984bfe681400f79ff5[1];
                        var vLng = obj.p5b614f984bfe681400f79ff5[0];
                        var vNumProf = VV_global.helper.getOldProfId(obj.proto[0]);
                        var title = obj.p5b5ea9040311784a87b6dc20;
                        if (
                            ((vLat != '') && (vLat != '0'))
                            &&
                            ((vLng != '') && (vLng != '0'))
                        ) {
                            //FAIRE RECURSIF...
                            if (VV_dir_map.map.coordUsed(vLat, vLng)) {
                                vLat = parseFloat(vLat) + 0.00001;
                                vLng = parseFloat(vLng) + 0.00001;
                            }
                            var icon = new L.Icon({
                                iconUrl: '/assets/images/markers/' + vNumProf + '.png',
                                iconSize: [32, 32],
                                popupAnchor:  [5, -20],
                                iconAnchor: [10, 24],
                                });
        
                            var spin = "<div class='spinner'>";
                            spin += "<div class='bounce1'></div>";
                            spin += "<div class='bounce2'></div>";
                            spin += "<div class='bounce3'></div>";
                            spin += "</div>";
                            var marker = L.marker([vLat, vLng], { icon: icon }).bindPopup(spin);
                            marker.on('click', L.bind(VV_dir_map.map.openPop, null, vId));
                            //markers.push(marker);
                            bounds.push(L.latLng(vLat, vLng));
                            currentMarkers.push(marker);
                            if ($('#chgroup').is(':checked'))
                            {
                                cluster[el].addLayer(marker);
                            }
                            else {
                                myllmap[el].addLayer(marker);
                            }
                        }
                        else{
                            
                        }
                    }
                }
              
                
            }
            
           // if ($("#numero_entite").val() != undefined) {
            
            
                if ((bounds.length > 0) && ($("#page").val() != 1))
                {
                     /*myllmap[el].fitBounds(bounds);*/
                     myllmap[el].setZoom(6);

                     /*alert("klm");*/
                }
            
                
           // }
           if ($('#chgroup').is(':checked'))
           {
            myllmap[el].addLayer(cluster[el]);
           }
            
            //if (OIP_annuaires)
            //{ OIP_annuaires.categs.resize();}
            $(".spinner-load").css("display","none");
        },
        loadMarkersErr: function (data, status) {
            $(".spinner-load").css("display","none");
            
        },
        loadMarkers: function (el) {
            
            $(".spinner-load").css("display","block");
            if (myllmap[el]) {  
                for (var r = 0;r < currentMarkers.length;r++) {
                    myllmap[el].removeLayer(currentMarkers[r]);
                }
            }
            if (cluster[el]) {  
                cluster[el].clearLayers(); 
            }
            //SELon onglet en cours alors on charge tel ou tel proto
            var fprot = "";
            var filters = {};
            var eid = "";
            if ($("#page").val() == "2_2")
            {
                switch (VV_dir_map.map.curtab)
                {
                    case "prjs":
                        fprot = "5c2c4dea07c805cd14b33488";
                        break;
                    case "acts":
                        fprot = "5c2c4de807c805cd14b3345c";
                        break;
                }
                
                    //5d5667bdd6c51e407429e3e4
                    filters = {
                        project:projectUID,
                        proto:fprot,
                        subs:{
                            p5b614f984bfe681400f79ff5:{$exists:true}
                        }
                    }
                }
            else {
                filters = {
                    project:projectUID,
                    proto:item.proto,
                    subs:{
                        p5b614f984bfe681400f79ff5:{$exists:true}
                    }
                }
            }
                
                if ($("#fulltextdir").length > 0)
                {
                    filters.text = $("#fulltextdir").val();
                }

                if ((typeof item != "undefined") && ($("#numero_entite").val() != "") && el && !(el.startsWith("map-"))) {
                    
                    filters.ids = [$("#numero_entite").val()];
                }

                var hasProjFilters = (($("#param1").val() && $("#param1").val().trim()!="") || 
                    ($("#param2").val() && $("#param2").val().trim()!="") || 
                    ($("#param3").val() && $("#param3").val().trim()!="") || 
                    ($("#param7").val() && $("#param7").val().trim()!=""));
                var hasActFilters = (($("#param4").val() && $("#param4").val().trim()!="") || 
                    ($("#param5").val() && $("#param5").val().trim()!="") || 
                    ($("#param6").val() && $("#param6").val().trim()!=""));

                if ($("#param1").val() && $("#param1").val().trim()!="")
                {
                    var p1 = $("#param1").val().split("|");
                    filters.subs["p5e668433a53e3da3a7395f5d"] = {$in:p1};
                    if (!VV_dir_map.map.initCateg)
                    {
                        for(var r in p1)
                        {
                            VV_dir_sb.categs.add('1',p1[r]);
                        }
                    }
                }
                if ($("#param2").val() && $("#param2").val().trim()!="")
                {
                    var p2 = $("#param2").val().split("|");
                    filters.subs["p5e670bfed149703857daab43"] = {$in:p2};
                    if (!VV_dir_map.map.initCateg)
                    {
                        for(var r in p2)
                        {
                            VV_dir_sb.categs.add('2',p2[r]);
                        }
                    }
                }
                if ($("#param3").val() && $("#param3").val().trim()!="")
                {
                    var p3 = $("#param3").val().split("|");
                    filters.subs["p5e670ccfa7e821c229af055f"] = {$in:p3};
                    if (!VV_dir_map.map.initCateg)
                    {
                        for(var r in p3)
                        {
                            VV_dir_sb.categs.add('3',p3[r]);
                        }
                    }
                }

                if ($("#param7").val() && $("#param7").val().trim()!="")
                {
                    var p7 = $("#param7").val().split("|");
                    filters.subs["p5e74f5409d74e6e63d7962b7-p"] = {$in:p7};
                    if (!VV_dir_map.map.initCateg)
                    {
                        for(var r in p7)
                        {
                            VV_dir_sb.categs.add('7',p7[r]);
                        }
                    }
                }

                
                if ($("#param4").val() && $("#param4").val().trim()!="")
                {
                    var p4 = $("#param4").val().split("|");
                    filters.subs["p5e74f5155b338f7cc60d53a1"] = {$in:p4};
                    if (!VV_dir_map.map.initCateg)
                    {
                        for(var r in p4)
                        {
                            VV_dir_sb.categs.add('4',p4[r]);
                        }
                    }
                }
                if ($("#param5").val() && $("#param5").val().trim()!="")
                {
                    var p5 = $("#param5").val().split("|");
                    filters.subs["p5e74f51e307be808ecc68c12"] = {$in:p5};
                    if (!VV_dir_map.map.initCateg)
                    {
                        for(var r in p5)
                        {
                            VV_dir_sb.categs.add('5',p5[r]);
                        }
                    }
                }
                if ($("#param6").val() && $("#param6").val().trim()!="")
                {
                    var p6 = $("#param6").val().split("|");
                    filters.subs["p5e74f5409d74e6e63d7962b7"] = {$in:p6};
                    if (!VV_dir_map.map.initCateg)
                    {
                        for(var r in p6)
                        {
                            VV_dir_sb.categs.add('6',p6[r]);
                        }
                    }
                }
                
                
                VV_dir_map.map.initCateg = true;
                

                //5c2ce9cd07c805cd14b5fd4e
                //5c2ce98407c805cd14b5f694
                
                
                //DANS UN SUBDIR DETAIL
                if (el && el.startsWith("map-"))
                {
                    //filters.proto = VV_dir_map.helper.getNewProfId(el.replace("map-","")); 
                    filters.ids = [];
                    if (!(typeof item === 'undefined')) 
                    {
                        if (item.lat && item.lng)
                        {
                            filters.ids.push(item.uid);
                        }

                    }
                    var tab = $("#" + el).closest(".tab-content");
                    $(".relatel").each(function(i) {
                        var lat = $(this).attr('lat');
                        var lng = $(this).attr('lng');
                        var uid = $(this).attr('uid');
                        if ((lat != "0") && (lng != "0"))
                        {
                            filters.ids.push(uid);
                        }
                    });
                    if (filters.ids.length == 0)
                    {
                        filters.ids = ["1"];
                    }
                    
                }                  
                $.ajax({
                    type: 'POST',
                    url: '/'+$("#lang").val()+'/cartogeo',
                    data: {
                        filters:filters,
                    },
                    success: function (data) { 
                        switch($("#page").val())
                        {
                            case "2_3":
                                //LOAD RELATS
                                VV_relat.d3.updateDataSet(data); 
                                break;
                            default:
                                VV_dir_map.map.loadMarkersOk(data,null, el);
                                break;
                        }
                        
                    },
                    error: this.loadMarkersErr,
                    
                });
        },
    }
    //document ready
    VV_dir_map.documentOnReady = {
        init: function () {
            VV_dir_map.map.resize();
            $('ul.tabs-navi a').click(function (el) {
                VV_dir_map.map.curtab = $(this).attr("data-content");
                VV_dir_map.map.loadMarkers("map");
            });
            $('#chgroup').click(function (el) {
                
                VV_dir_map.map.loadMarkers("map");
            });
            if ($("#map").length>0)
            {VV_dir_map.map.init('map');}
            
        }
    };
    //window on load
    VV_dir_map.windowOnLoad = {
        init: function () {
        }
    };
    VV_dir_map.windowOnResize = {
        init: function () {
            VV_dir_map.map.resize();
        }
    };
    //Inits
    VV_dir_map.$document.ready(
        VV_dir_map.documentOnReady.init
    );
    VV_dir_map.$window.on('load',
        VV_dir_map.windowOnLoad.init
    );
    VV_dir_map.$window.on('resize',
        VV_dir_map.windowOnResize.init
    );

})(jQuery);



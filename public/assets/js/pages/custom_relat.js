var VV_relat = {};
function redraw() {
    d3.select("#bbox").attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
}
(function ($) {
    "use strict";
    //
    VV_relat.$document = $(document);
    VV_relat.$document_body = $(document.body);
    VV_relat.$window = $(window);
    //Gestion des fonctions de la sidebar
    VV_relat.sidebar = {
        init: function () {
            $('#sidebar-bt').click(function () {
                var $lefty = $("#inner-search");
                $lefty.animate({
                    left: parseInt($lefty.css('left'), 10) == 0 ? -$lefty.outerWidth() : 0
                });
            });
            $('#sidebar-bt-histo').click(function () {
                var $lefty = $("#inner-histo");
                $lefty.animate({
                    right: parseInt($lefty.css('right'), 10) == 0 ? -$lefty.outerWidth() : 0
                });
            });
        }
    };
    //
    VV_relat.relat = {
        //MUT
        setFullScreen: function () {
            var i = document.getElementById("relat");
            if (document.fullscreenEnabled ||
	            document.webkitFullscreenEnabled ||
	            document.mozFullScreenEnabled ||
	            document.msFullscreenEnabled) {
                if (i.requestFullscreen) {
                    i.requestFullscreen();
                } else if (i.webkitRequestFullscreen) {
                    i.webkitRequestFullscreen();
                } else if (i.mozRequestFullScreen) {
                    i.mozRequestFullScreen();
                } else if (i.msRequestFullscreen) {
                    i.msRequestFullscreen();
                }
            }
        }
        ,
        closeFullScreen: function () {
            var i = document.getElementById("relat");
            if (document.fullscreenEnabled ||
	            document.webkitFullscreenEnabled ||
	            document.mozFullScreenEnabled ||
	            document.msFullscreenEnabled) {
                document.exitFullscreen();
            }
        }
        ,
        updateMapSize: function () {
            var aHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
            var aWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
            if (!$("#page").val().startsWith("2_"))
            {

            }
            aHeight = aHeight; //On enleve navbar en scroll
            $("#relat").css('height', aHeight);
            $("#relat").css('width', "100%");




            //$('#search_form').height(aHeight - 50);
            //$('.bloc-searchCategs').height(aHeight - 180);
        },
    };

    var width = $("#relat").width(),  // width and height of the SVG canvas
        height = $("#relat").height(),
        nodes = [],
        links = [],
        hiddenNodes = [],
        hiddenLinks = [],
        force,
        svg,
        selectedId = "",loaded=false,
            selectedProfilId = "", drag, sliderZoom, sliderLinks,sliderLinksLength;
    var min_zoom = 0.1;
    var max_zoom = 7;
    var zoom=null;
    //
    VV_relat.d3 = {
        
        updateLinksLength(val)
        {
            force.linkDistance(function (link) {
                return val;
            });
            VV_relat.d3.updateLinks();
        },
        updateZoom(val)
        {
            zoom.scaleTo(svg, val);
        },
        init: function () {
                if (!d3.select("#relat").node()) {
                    return;
                }
                    var brelat = d3.select("#relat").node().getBoundingClientRect();
                    width = brelat.width;  // width and height of the SVG canvas
                    height = brelat.height;

                    zoom = d3.zoom()
                        .scaleExtent([-40, 5])
                        .translateExtent([[-100, -100], [width + 90, height + 100]])
                        .on("zoom", zoomed);

                    
                    //var color = d3.scaleOrdinal(d3.schemeCategory20);
                    force = cola.d3adaptor(d3)
                        //.charge(-120)
                        .linkDistance(300)
                        //.symmetricDiffLinkLengths(10)
                        //.gravity(0.6)
                        .handleDisconnected(true)
                        //.avoidOverlaps(true)
                        .nodes(nodes)
                        .links(links)
                        
                        //.jaccardLinkLengths(50)
                        .size([width, height])
                        .on("tick", VV_relat.d3.tick);


                    
                        


                    svg = d3.select("#relat")
                    .append("svg")
                        .attr("width", "100%")
                        .attr("height", "100%")
                        .append("g")
                            .attr("id", "bbox").attr("class", "overlay").call(zoom);


                            var dragcontainer = d3.drag()
                            .on("drag", function(d, i) {
                              d3.select(this).attr("transform", "translate(" + (d.x = d3.event.x) + "," + (d.y = d3.event.y) + ")");
                            });
                          d3.select("g").datum({x: 0, y: 0}).call(dragcontainer)

                    //.attr('transform', 'translate(80,80) scale(0.7)')
                    //d
                    var defs = svg.append("svg:defs").append("svg:marker")
                        .attr("id", "triangle")
                        .attr("refX", 30)
                        .attr("refY", 3)
                        .attr("markerWidth", 10)
                        .attr("markerHeight", 10)
                        .attr("orient", "auto")
                        .append("path")
                        .attr("d", "M 0 0 6 3 0 6 0 3")
                        .style("fill", "black");

                    //d3.select("#inner-search").append("h5").html("Zoom")
                     sliderZoom = d3.select("#inner-search .more").append("p").append("input").attr("id", "lfocus")
                           .datum({})
                           .attr("type", "range")
                           .attr("value", 1)
                            .attr("min", 0.1)
                            .attr("max", 5)
                            .attr("step", 0.1)
                           .on("input", slided);

                    //AJOUT SLIDE TAILE DES LIENS
                    //d3.select("#inner-search .more").append("h5").html("Zoom");
                    sliderLinks = d3.select("#inner-search .more").append("p").append("input").attr("id", "llength")
                          .datum({})
                          .attr("type", "range")
                          .attr("min", 20)
                          .attr("max", 300)
                          .attr("step", 5)
                          .on("input", slidedLinkLength);
                    
                        document.querySelector('#llength').value = 130;
                    
                    
                    function dragstarted(d) {
                        d3.event.sourceEvent.stopPropagation();
                        d3.select(this).classed("dragging", true);
                    }
            
                    function dragged(d) {
                        d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
                    }
            
                    function dragended(d) {
                        d3.select(this).classed("dragging", false);
                    }

                    

                    function slided(d) {
                        zoom.scaleTo(svg, d3.select(this).property("value"));
                    }

                    function slidedLinkLength(d) {
                        
                        force.linkDistance(function (link) {
                            return sliderLinks.property("value");
                        });

                        VV_relat.d3.updateLinks();
                    }
                    function zoomed() {
                        const currentTransform = d3.event.transform;
                        svg.attr("transform", currentTransform);
                        sliderZoom.property("value", currentTransform.k);
                    }

                    //console.log("sliderZoom",sliderZoom.attr("value"));
                    //zoom.scaleTo(svg, sliderZoom);
                        
                    if (!($("#page").val() == "2_3"))
                    {
                        if (!VV_relat.d3.nodeExists($("#numero_entite").val())) {
                            VV_relat.d3.addNode($("#numero_entite").val(), $("#numero_profil").val(), ($("#page").val().startsWith("2_")?"GSDM":item.title));
                        }
                        if (!($("#page").val() == "2_5"))
                        {
                            VV_relat.d3.expand($("#numero_entite").val(), $("#numero_profil").val());
                        }
                        else{
                            VV_relat.d3.expand($("#numero_entite").val(), $("#numero_profil").val(),null,true);
                        }
                    }    
                    else {
                        //LOAD TOUS LES ACTEURS ET INNOS
                        VV_relat.d3.updateDataSet(null); 
                       
                    }

                    
                    force.linkDistance(function (link) {
                        return sliderLinks.property("value");
                    });

                    $("#searchWText").on("click", function (e) {
                        e.preventDefault();
                        VV_relat.d3.loadDataSet();
                     })
                    
            
        },
        scaleAndDraw: function () {
            //var root = svg.select("g");
            var el = svg.node();
            var bounds = el.getBoundingClientRect();
            var fullWidth = width,
                fullHeight = height;

            
            var lwidth = bounds.width,
                lheight = bounds.height;


            var midX = bounds.x + width / 2,
                midY = bounds.y + height / 2;

           
            if (lwidth == 0 || lheight == 0) return; // nothing to fit
            var scale = (0.75) / Math.max(lwidth / fullWidth, lheight / fullHeight);

            var tw = fullWidth / 2 - scale * midX;
            var th = fullHeight / 2 - scale * midY;

            
            if (tw <= 0 || th <= 0) return; // nothing to fit
            var translate = [fullWidth / 2 - scale * midX, fullHeight / 2 - scale * midY];
            


             
            svg
                .transition()
                .duration(3000 || 0) // milliseconds
                .call();
                //.call(d3.behavior.zoom().on("zoom", redraw));

            //sliderZoom.property("value", scale);
            //draw();
        },
        expand: function (eid, pid, elements,level1) {
            //if (!loaded && ($("#numero_entite").val() != ""))
            //{
            //    eid = $("#numero_entite").val();
            //}
            $('body').toggleClass('loading');
            var nuPid = VV_global.helper.getNewProfId(pid);
            
            //5b5ea8ed0311784a87b6dbd6
            var filters = {
                project:projectUID,
            }
            $.ajax({
                type: 'POST',
                url: '/'+$("#lang").val()+'/carto',
                data: {
                    uid:eid,
                    ciradmode:true
                },
                success: function (data) {
                    var items = [];
                    for(var o in data.items)
                    {
                        //alert("in");
                        var obj = data.items[o];
                        var sId = obj._id;

                        var title = (obj.p5c332d4d07c805cd14cf24b7 && (obj.p5c332d4d07c805cd14cf24b7!="")?obj.p5c332d4d07c805cd14cf24b7:obj.p5c332d2707c805cd14cf217d);
                        var vNumProf = VV_global.helper.getOldProfId(obj.proto[0]);
                        if (!VV_relat.d3.nodeExists(sId)) {
                            //alert("klm");
                            VV_relat.d3.addNode(sId, vNumProf, title);
                            //console.log("level1",level1);
                            if (($('#page').val() == "2_5") && (level1 == true)) {
                                items.push(sId);
                            }
                        }
                        if (!VV_relat.d3.linkExists(eid, sId)) {
                            VV_relat.d3.addLink(eid, sId);
                        }     
                        //$(this).children("relations").find("item").each(function () {
                        //    var dId = $(this).children("id").text();
                        //    if (!VV_relat.d3.nodeExists(dId)) {
                        //        VV_relat.d3.addNode(dId, $(this).children("idp").text(), $(this).children("title").text());
                        //    }
                        //    if (!VV_relat.d3.linkExists(sId, dId)) {
                        //        VV_relat.d3.addLink(sId, dId);
                        //    }       
                        //}); 
                    }
                    
                    /*$(data).find("acteur").each(function () {
                        //$("#result-list li[in-id=" + $(this).children("id").text() + "]").css("display", "");
                        var vLat = $(this).children("lat").text();
                        var vLng = $(this).children("lng").text();
                        var sId = $(this).children("id").text();
                        var vForfait = $(this).children("forfait").text();
                        var vLogo = $(this).children("logo").text();
                        var vNumProf = $(this).children("numeroprofil").text();
                        var title = $(this).children("nom").text();
                        if ($(this).children("relations").find("item").length > 0) {

                            //DISPATCH ENTRE A VISUALISER OU EN MEMOIRE


                            if (!VV_relat.d3.nodeExists(sId)) {
                                VV_relat.d3.addNode(sId, vNumProf, title);
                            }
                            $(this).children("relations").find("item").each(function () {
                                var dId = $(this).children("id").text();
                                if (!VV_relat.d3.nodeExists(dId)) {
                                    VV_relat.d3.addNode(dId, $(this).children("idp").text(), $(this).children("title").text());
                                }
                                if (!VV_relat.d3.linkExists(sId, dId)) {
                                    VV_relat.d3.addLink(sId, dId);
                                }       
                            }); 
                        }
                    });*/

                    if (!loaded) {
                        //VV_relat.d3.hideProfil(102);
                        //VV_relat.d3.hideProfil(114);
                        loaded = true;
                    }
                    else {
                        if (!$("#ch-102").is(":checked")) { VV_relat.d3.hideProfil(102); }
                        if (!$("#ch-108").is(":checked")) { VV_relat.d3.hideProfil(108); }
                        if (!$("#ch-120").is(":checked")) { VV_relat.d3.hideProfil(120); }
                        if (!$("#ch-113").is(":checked")) { VV_relat.d3.hideProfil(113); }
                    }
                    VV_relat.d3.update();
                    if (($('#page').val() == "2_5") && (level1 == true)) {
                        
                        //VV_relat.d3.expandLevel(items);
                    }
                    $('body').toggleClass('loading');
                }
            });

        },
        expandLevel: function (ids) {
            var filters = {
                project:projectUID,
            }
            $.ajax({
                type: 'POST',
                url: '/'+$("#lang").val()+'/cartolevel',
                data: {
                    ids:ids
                },
                success: function (data) {
                    VV_relat.d3.updateDataSetLevel2(data);
                }
            })
        },
        reduce: function (eid) {
            for (var i = links.length - 1; i >= 0; i--) {
                if (links[i].source.id == eid)
                {
                    var f = links[i].target.id;
                    links.splice(i, 1);
                    for (var i2 = nodes.length - 1; i2 >= 0; i2--) {
                        if (f == nodes[i2].id) {
                            var rem = true;
                            for (var i3 = links.length - 1; i3 >= 0; i3--) {
                                if ((links[i3].source.id == nodes[i2].id) || (links[i3].target.id == nodes[i2].id))
                                {
                                    rem = false;
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
            }
            
            
            VV_relat.d3.update();
            
        },
        checkProfil: function (idp, el) {
            if ($(el).is(":checked")) {
                this.showProfil(idp);
            }
            else {
                this.hideProfil(idp);
            }
        },
        fixedNodes: function (ch) {
            var fixed = $(ch).is(":checked");
            svg.selectAll(".node").each(function(d){
                d.fixed=fixed;//thsi will fix the node.
            });
            VV_relat.d3.update();
        },
        saveSvgAsPng() {
            /*alert("go");
            var doctype = '<?xml version="1.0" standalone="no"?>' + '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
            var source = (new XMLSerializer()).serializeToString(d3.select('svg').node());
            var blob = new Blob([ doctype + source], { type: 'image/svg+xml;charset=utf-8' });
            var url = window.URL.createObjectURL(blob);
            var img = d3.select('body').append('img')
                .attr('width', 100)
                .attr('height', 100)
                .node();
                

            img.onload = function(){
                // Now that the image has loaded, put the image into a canvas element.
                var canvas = d3.select('body').append('canvas').node();
                canvas.width = 100;
                canvas.height = 100;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                
                var canvasUrl = canvas.toDataURL("image/png");
                var img2 = d3.select('body').append('img')
                    .attr('width', 100)
                    .attr('height', 100)
                    .node();
                // this is now the base64 encoded version of our PNG! you could optionally 
                // redirect the user to download the PNG by sending them to the url with 
                // `window.location.href= canvasUrl`.
                img2.src = canvasUrl; 
                alert(canvasUrl);
            }
            // start loading the image.
            img.crossOrigin = 'Anonymous';
            img.src = url;*/
            d3.selectAll('.foreignObject, .node, .node-text, .circle, .main').each(function() {
                var element = this;
                var computedStyle = getComputedStyle(element, null);
                for (var i = 0; i < computedStyle.length; i++) {
                  var property = computedStyle.item(i);
                  var value = computedStyle.getPropertyValue(property);
                  element.style[property] = value;
                }
                $(".nbutton").each(function () {
                    $(this).css("display","none");
                }); 
            });
            saveSvgAsPng(document.getElementsByTagName("svg")[0], "relations.png", {backgroundColor: `#fff`});
        },
        loadDataSet:function()
        {
            $('body').toggleClass('loading');
            var ids = [];
            for (var i2 = nodes.length - 1; i2 >= 0; i2--) {
                nodes.splice(i2, 1);
            }
            links = [];
            
            //VV_relat.d3.update();
            var filters = {
                project:projectUID,
                text:$("#txtSearch").val()
            }
            $.ajax({
                type: 'POST',
                url: '/'+$("#lang").val()+'/cartofull',
                data: {
                    text:$("#txtSearch").val()
                },
                success: function (data) {
                    //
                    VV_relat.d3.addNode("maman","maman","maman");
                    for (var o in data)
                    {
                        
                        var obj = data[o];
                        var objrelats = obj.relations;

                        if (!VV_relat.d3.nodeExists(obj._id))
                        {
                            VV_relat.d3.addNode(obj._id,VV_global.helper.getOldProfId(obj.proto[0]),(obj.p5c332d4d07c805cd14cf24b7 && (obj.p5c332d4d07c805cd14cf24b7!="")?obj.p5c332d4d07c805cd14cf24b7:obj.p5c332d2707c805cd14cf217d));
                            VV_relat.d3.addLink("maman", obj._id);
                        }


                        if (objrelats.length>0)
                        {
                            
                            for (var orel in objrelats)
                            {
                                for (var otmp in data)
                                {
                                    var objtmp = data[otmp];
                                    if (objtmp._id == objrelats[orel])
                                    {
                                        
                                        if (!VV_relat.d3.nodeExists(objtmp._id))
                                        {
                                            VV_relat.d3.addNode(objtmp._id,VV_global.helper.getOldProfId(objtmp.proto[0]),(objtmp.p5c332d4d07c805cd14cf24b7 && (objtmp.p5c332d4d07c805cd14cf24b7!="")?objtmp.p5c332d4d07c805cd14cf24b7:objtmp.p5c332d2707c805cd14cf217d));
                                            VV_relat.d3.addLink("maman", objtmp._id);
                                        }
                                        if (!VV_relat.d3.linkExists(obj._id, objtmp._id)) {
                                            
                                            VV_relat.d3.addLink(obj._id, objtmp._id);
                                        }     
                                        break;
                                    }
                                }
                            }
                        }
                    }
                   
        
                    if (!loaded) {
                        //VV_relat.d3.hideProfil(102);
                        //VV_relat.d3.hideProfil(114);
                        loaded = true;
                    }
                    else {
                        
                    }
                    //CHECK ORPHANS
                    
                    if (!$("#ch-102").is(":checked")) { VV_relat.d3.hideProfil(102); }
                    if (!$("#ch-108").is(":checked")) { VV_relat.d3.hideProfil(108); }
                    if (!$("#ch-114").is(":checked")) { VV_relat.d3.hideProfil(114); }
                    if (!$("#ch-113").is(":checked")) { VV_relat.d3.hideProfil(113); }
                    
                    
                    VV_relat.d3.updateLinks();
                    VV_relat.d3.update();
                    $('body').toggleClass('loading');
                }
            });
        },
        updateDataSet:function(datas)
        {
            $('body').toggleClass('loading');
            var ids = [];
            for (var i2 = nodes.length - 1; i2 >= 0; i2--) {
                var found = false;
                for (var o in datas.items)
                {
                    if ((nodes[i2].objectid == datas.items[o].objectid)) {
                        found = true;
                        break;
                    }
                }
                if (!found)
                {
                    nodes.splice(i2, 1);
                }
                
            }
            links = [];
            
            //VV_relat.d3.update();
            var filters = {
                project:projectUID,
                ids:ids
            }
            $.ajax({
                type: 'POST',
                url: '/'+$("#lang").val()+'/cartofull',
                data: {
                    ids:ids,
                },
                success: function (data) {
                    //
                    VV_relat.d3.addNode("maman","maman","maman");
                    for (var o in data)
                    {
                        
                        var obj = data[o];
                        var objrelats = obj.relations;
                        if (objrelats.length>0)
                        {
                            
                            for (var orel in objrelats)
                            {
                                for (var otmp in data)
                                {
                                    var objtmp = data[otmp];
                                    if (objtmp._id == objrelats[orel])
                                    {
                                        if (!VV_relat.d3.nodeExists(obj._id))
                                        {
                                            VV_relat.d3.addNode(obj._id,VV_global.helper.getOldProfId(obj.proto[0]),(obj.p5c332d4d07c805cd14cf24b7 && (obj.p5c332d4d07c805cd14cf24b7!="")?obj.p5c332d4d07c805cd14cf24b7:obj.p5c332d2707c805cd14cf217d));
                                            VV_relat.d3.addLink("maman", obj._id);
                                        }
                                        if (!VV_relat.d3.nodeExists(objtmp._id))
                                        {
                                            VV_relat.d3.addNode(objtmp._id,VV_global.helper.getOldProfId(objtmp.proto[0]),(objtmp.p5c332d4d07c805cd14cf24b7 && (objtmp.p5c332d4d07c805cd14cf24b7!="")?objtmp.p5c332d4d07c805cd14cf24b7:objtmp.p5c332d2707c805cd14cf217d));
                                            VV_relat.d3.addLink("maman", objtmp._id);
                                        }
                                        if (!VV_relat.d3.linkExists(obj._id, objtmp._id)) {
                                            
                                            VV_relat.d3.addLink(obj._id, objtmp._id);
                                        }     
                                        break;
                                    }
                                }
                            }
                        }
                    }
                   
        
                    if (!loaded) {
                        //VV_relat.d3.hideProfil(102);
                        //VV_relat.d3.hideProfil(114);
                        loaded = true;
                    }
                    else {
                        
                    }
                    //CHECK ORPHANS
                    
                    if (!$("#ch-102").is(":checked")) { VV_relat.d3.hideProfil(102); }
                    if (!$("#ch-108").is(":checked")) { VV_relat.d3.hideProfil(108); }
                    if (!$("#ch-114").is(":checked")) { VV_relat.d3.hideProfil(114); }
                    if (!$("#ch-113").is(":checked")) { VV_relat.d3.hideProfil(113); }
                    
                    
                    zoom.scaleTo(svg, 0.7);
                    VV_relat.d3.update();
                    
                    force.linkDistance(function (link) {
                        return 200;
                    });
                    VV_relat.d3.updateLinks();
                    VV_relat.d3.scaleAndDraw();
                    $('body').toggleClass('loading');
                }
            });
        },
        updateDataSet2:function(datas)
        {
            $('body').toggleClass('loading');
            var ids = [];
            for (var i2 = nodes.length - 1; i2 >= 0; i2--) {
                var found = false;
                for (var o in datas.items)
                {
                    if ((nodes[i2]._id == datas.items[o]._id)) {
                        found = true;
                        break;
                    }
                }
                if (!found)
                {
                    nodes.splice(i2, 1);
                }
                
            }
            links = [];
            
            //VV_relat.d3.update();
            var filters = {
                project:projectUID,
                ids:ids
            }
            $.ajax({
                type: 'POST',
                url: '/'+$("#lang").val()+'/cartofull',
                data: {
                    ids:ids,
                },
                success: function (data) {
                    //
                    
                    for (var o in datas.items)
                    {
                        var obj = datas.items[o];
                        var vId = obj._id;
                        ids.push(vId);
                        var vNumProf = VV_global.helper.getOldProfId(obj.proto[0]);
                        var title = (obj.p5c332d4d07c805cd14cf24b7 && (obj.p5c332d4d07c805cd14cf24b7!="")?obj.p5c332d4d07c805cd14cf24b7:obj.p5c332d2707c805cd14cf217d);
                        var foundrelat = false;
                        for(var o in data)
                        {
                            //alert("in");
                            var obj = data[o];
                            for (var or in obj.relations)
                            {
                                if (obj.relations[or] == vId) {
                                    foundrelat = true;
                                    break;
                                }
                            }
                        }

                        if (foundrelat && !VV_relat.d3.nodeExists(obj._id))
                        {
                            VV_relat.d3.addNode(vId,vNumProf,title);
                        }
                        else {
                            //
                            
                        }
                    }
                    for(var o in data)
                    {
                        //alert("in");
                        var obj = data[o];
                        var sId = obj._id;
                        

                        var title = (obj.p5c332d4d07c805cd14cf24b7 && (obj.p5c332d4d07c805cd14cf24b7!="")?obj.p5c332d4d07c805cd14cf24b7:obj.p5c332d2707c805cd14cf217d);
                        var vNumProf = VV_global.helper.getOldProfId(obj.proto[0]);
                        for (var or in obj.relations)
                        {
                            if (VV_relat.d3.nodeExists(obj._id) && VV_relat.d3.nodeExists(obj.relations[or])) {
                                if (!VV_relat.d3.linkExists(obj._id, obj.relations[or])) {
                                    VV_relat.d3.addLink(obj._id, obj.relations[or]);
                                }     
                            }
                        }


                        
                        
                        //$(this).children("relations").find("item").each(function () {
                        //    var dId = $(this).children("id").text();
                        //    if (!VV_relat.d3.nodeExists(dId)) {
                        //        VV_relat.d3.addNode(dId, $(this).children("idp").text(), $(this).children("title").text());
                        //    }
                        //    if (!VV_relat.d3.linkExists(sId, dId)) {
                        //        VV_relat.d3.addLink(sId, dId);
                        //    }       
                        //}); 
                    }
                    //console.log("cartodatas",data);
                    /*$(data).find("acteur").each(function () {
                        //$("#result-list li[in-id=" + $(this).children("id").text() + "]").css("display", "");
                        var vLat = $(this).children("lat").text();
                        var vLng = $(this).children("lng").text();
                        var sId = $(this).children("id").text();
                        var vForfait = $(this).children("forfait").text();
                        var vLogo = $(this).children("logo").text();
                        var vNumProf = $(this).children("numeroprofil").text();
                        var title = $(this).children("nom").text();
                        if ($(this).children("relations").find("item").length > 0) {

                            //DISPATCH ENTRE A VISUALISER OU EN MEMOIRE


                            if (!VV_relat.d3.nodeExists(sId)) {
                                VV_relat.d3.addNode(sId, vNumProf, title);
                            }
                            $(this).children("relations").find("item").each(function () {
                                var dId = $(this).children("id").text();
                                if (!VV_relat.d3.nodeExists(dId)) {
                                    VV_relat.d3.addNode(dId, $(this).children("idp").text(), $(this).children("title").text());
                                }
                                if (!VV_relat.d3.linkExists(sId, dId)) {
                                    VV_relat.d3.addLink(sId, dId);
                                }       
                            }); 
                        }
                    });*/

                    if (!loaded) {
                        //VV_relat.d3.hideProfil(102);
                        //VV_relat.d3.hideProfil(114);
                        loaded = true;
                    }
                    else {
                        //if (!$("#ch-102").is(":checked")) { VV_relat.d3.hideProfil(102); }
                        //if (!$("#ch-108").is(":checked")) { VV_relat.d3.hideProfil(108); }
                        //if (!$("#ch-114").is(":checked")) { VV_relat.d3.hideProfil(114); }
                        //if (!$("#ch-113").is(":checked")) { VV_relat.d3.hideProfil(113); }
                    }
                    //CHECK ORPHANS
                    
                    VV_relat.d3.update();
                    $('body').toggleClass('loading');
                }
            });
        },
        updateDataSetLevel2:function(datas)
        {
            $('body').toggleClass('loading');
            for (var o in datas)
            {
                var obj = datas[o];
                var vId = obj._id;
                //ids.push(vId);
                var vNumProf = VV_global.helper.getOldProfId(obj.proto[0]);
                var title = (obj.p5c332d4d07c805cd14cf24b7 && (obj.p5c332d4d07c805cd14cf24b7!="")?obj.p5c332d4d07c805cd14cf24b7:obj.p5c332d2707c805cd14cf217d);

                if (!VV_relat.d3.nodeExists(vId))
                {
                    VV_relat.d3.addNode(vId,vNumProf,title);
                }
                
            }
                    for(var o in datas)
                    {
                        //alert("in");
                        var obj = datas[o];
                        var sId = obj._id;
                        

                        var title = (obj.p5c332d4d07c805cd14cf24b7 && (obj.p5c332d4d07c805cd14cf24b7!="")?obj.p5c332d4d07c805cd14cf24b7:obj.p5c332d2707c805cd14cf217d);
                        var vNumProf = VV_global.helper.getOldProfId(obj.proto[0]);
                        for (var or in obj.relations)
                        {
                            if (VV_relat.d3.nodeExists(obj._id) && VV_relat.d3.nodeExists(obj.relations[or])) {
                                if (!VV_relat.d3.linkExists(obj._id, obj.relations[or])) {
                                    VV_relat.d3.addLink(obj._id, obj.relations[or]);
                                }     
                            }
                        }


                        
                        
                        //$(this).children("relations").find("item").each(function () {
                        //    var dId = $(this).children("id").text();
                        //    if (!VV_relat.d3.nodeExists(dId)) {
                        //        VV_relat.d3.addNode(dId, $(this).children("idp").text(), $(this).children("title").text());
                        //    }
                        //    if (!VV_relat.d3.linkExists(sId, dId)) {
                        //        VV_relat.d3.addLink(sId, dId);
                        //    }       
                        //}); 
                    }
                    //console.log("cartodatas",data);
                    /*$(data).find("acteur").each(function () {
                        //$("#result-list li[in-id=" + $(this).children("id").text() + "]").css("display", "");
                        var vLat = $(this).children("lat").text();
                        var vLng = $(this).children("lng").text();
                        var sId = $(this).children("id").text();
                        var vForfait = $(this).children("forfait").text();
                        var vLogo = $(this).children("logo").text();
                        var vNumProf = $(this).children("numeroprofil").text();
                        var title = $(this).children("nom").text();
                        if ($(this).children("relations").find("item").length > 0) {

                            //DISPATCH ENTRE A VISUALISER OU EN MEMOIRE


                            if (!VV_relat.d3.nodeExists(sId)) {
                                VV_relat.d3.addNode(sId, vNumProf, title);
                            }
                            $(this).children("relations").find("item").each(function () {
                                var dId = $(this).children("id").text();
                                if (!VV_relat.d3.nodeExists(dId)) {
                                    VV_relat.d3.addNode(dId, $(this).children("idp").text(), $(this).children("title").text());
                                }
                                if (!VV_relat.d3.linkExists(sId, dId)) {
                                    VV_relat.d3.addLink(sId, dId);
                                }       
                            }); 
                        }
                    });*/

                    if (!loaded) {
                        //VV_relat.d3.hideProfil(102);
                        //VV_relat.d3.hideProfil(114);
                        loaded = true;
                    }
                    else {
                        //if (!$("#ch-102").is(":checked")) { VV_relat.d3.hideProfil(102); }
                        //if (!$("#ch-108").is(":checked")) { VV_relat.d3.hideProfil(108); }
                        //if (!$("#ch-114").is(":checked")) { VV_relat.d3.hideProfil(114); }
                        //if (!$("#ch-113").is(":checked")) { VV_relat.d3.hideProfil(113); }
                    }
                    //CHECK ORPHANS
                    
                    VV_relat.d3.update();
                $('body').toggleClass('loading');
        },
        hideProfil: function (idp) {
            var curEnt = $("#numero_entite").val();
            for (var i2 = nodes.length - 1; i2 >= 0; i2--) {
                if ((nodes[i2].id == curEnt) || !(nodes[i2].idProfil == idp)) {
                    continue;
                }
                for (var i = links.length - 1; i >= 0; i--) {
                    if ((links[i].source.id == (nodes[i2].id)) || (links[i].target.id == (nodes[i2].id))) {
                        hiddenLinks.push(links[i]);
                        links.splice(i, 1);
                    }
                }
                hiddenNodes.push(nodes[i2]);
                nodes.splice(i2, 1);
            }
            VV_relat.d3.update();
        },
        showProfil: function (idp) {
            var curEnt = $("#numero_entite").val();
            for (var i2 = hiddenNodes.length - 1; i2 >= 0; i2--) {
                if (hiddenNodes[i2].id == curEnt) {
                    continue;
                }
                if (hiddenNodes[i2].idProfil == idp) {
                    for (var i = hiddenLinks.length - 1; i >= 0; i--) {
                        if ((hiddenLinks[i].source.id == (hiddenNodes[i2].id)) ||
                            (hiddenLinks[i].target.id == (hiddenNodes[i2].id))) {
                            links.push(hiddenLinks[i]);
                            hiddenLinks.splice(i, 1);
                        }
                    }
                    nodes.push(hiddenNodes[i2]);
                    hiddenNodes.splice(i2, 1);
                }
                
            }
            VV_relat.d3.update();
            //SHOW NODES ON FIRST PLAN
            $("foreignObject.node").appendTo('#bbox');

        },

        tick: function () {
            var tnode = svg.selectAll(".node")
                .attr("x", function (d) { return d.x; })
                .attr("y", function (d) { return d.y; })
            svg.selectAll(".link")
                .attr("x1", function (d) { return d.source.x + 25; })
                .attr("y1", function (d) { return d.source.y + 25; })
                .attr("x2", function (d) { return d.target.x + 25; })
                .attr("y2", function (d) { return d.target.y + 25; });


        },
        update: function (data) {
            
            
            force.nodes(nodes)
                .links(links);
            var link_update = svg.selectAll("line").data(
                force.links(),
                function (d) { return d.source.id + "-" + d.target.id; }
            );
            link_update.enter()
                .insert("line", ".link")
                .attr("class", "link")
                .attr("class",
                    function (d) {
                        return "link" + (d.source.id=="maman"?" maman":"");
                    })
                .attr("marker-end", "url(#triangle)");
            link_update.exit().remove();
            //
            var node_update = svg.selectAll(".node").data(
                force.nodes(),
                function (d) {
                    return d.id;
                }
            );
            
            //FIGER LES NODES
            /*svg.selectAll(".node").each(function(d){
                d.fixed=true;//thsi will fix the node.
                alert("hj");
            });*/

            

            var drag = force.drag();
                /*.on("dragend",
                function (d) {
                    d.x = d3.event.x;
                    d.y = d3.event.y;
                    force.resume(); 
                }
            );*/

            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");
            var isie = (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./));
            var ncont;
            if (isie) {
                /*ncont = node_update.enter()
                    .append("g", ".node")
                    .attr("class", "node")
                    .attr("transform", function (d) { return "translate(" + d.x + ",80)" })

                
                var circle = ncont.append("circle")
                    .attr("r", 30)
                    .attr("stroke", "black")
                    .attr("fill", "white")

                ncont.append("text")
                    .attr("color", "black")
                    //.attr("dx", function (d) { return -20 })
                    .text(function (d) { return d.title })
                */
                /*ncont = node_update.enter().append("svg:text", ".node")
                    .attr("class", "nodetext")
                    .attr("dx", 12)
                    .attr("dy", ".35em")
                    .text(function (d) { return d.title });
                return;*/

                /*ncont = node_update.enter().append("g")
                    .attr("transform", function (d, i) { return "translate(0," + i * 50 + ")"; })
                    .attr("class", "node");
                ncont.append("svg:rect",".node")
                    .attr("width", 100)
                    .attr("height", 50 - 1);

                ncont.append("text")
                    //.attr("x", function (d) { return d.x - 3; })
                    //.attr("y", 50 / 2)
                    .attr("dy", ".35em")
                    .text(function (d) { return d.title; });*/

                
                
                var gcont = node_update.enter().append("g").call(drag);

                ncont = gcont.append("svg:text", ".node")
                    .attr("class", "node")
                    .style("fill", "white")
                    .style("width", "100")
                    //.attr("r", 30)
                    .style("stroke",
                    function (d) {
                        switch (d.idProfil) {
                            case "102":
                                return "#E30613";
                                break;
                            case "108":
                                return "#0B8E36";
                                break;
                            case "113":
                                
                                return "#EF70B7";
                                break;
                            case "114":
                                return "#12A19A";
                                break;
                            case "120":
                                return "#3d98b7";
                                break;
                            default:
                            
                                return "#333"
                        }
                    })
                    .text(function (d) { return d.title })
                    .attr("id",
                    function (d) {
                        return d.id
                    }).call(drag)
                    .on("click", function (d) {
                        var sel;
                        if (selectedId != "") {
                            sel = d3.selectAll("[id='" + selectedId + "']");
                            sel.attr('class', '');

                            sel = d3.selectAll("[id='" + selectedId + "'] .circle");
                            var bcolor = (d.id == selectedId ? "#d2d2d2" : "#fff");
                            var bimg = "url('/assets/images/profils/" + selectedProfilId + ".png')";
                            sel.style('background-img', bimg);
                            sel.style('background-color', bcolor);
                        }
                        VV_dir_sb.categs.showHisto(d.id, d.idProfil);
                        selectedId = d.id;
                        selectedProfilId = d.idProfil;

                        sel = d3.select("[id='" + d.id + "']");
                        sel.attr('class', 'selected');

                        sel = d3.select(this);
                        var bcolor = (d.id == selectedId ? "#d2d2d2" : "#fff");
                        var bimg = "url('/assets/images/profils/" + d.idProfil + ".png')";
                        sel.style('background-img', bimg)
                        sel.style('background-color', bcolor)
                    }, true);
                    
                ncont.append("svg:text")
                    //.attr("class", "nodetext")
                    //.attr("dx", 12)
                    //.attr("dy", ".35em")
                    .text(function (d) { return d.title });
                    //.attr("cx", 300)
                    //.attr("cy", 300);
                    //.append('xhtml:div')
                    //.attr("class", "main")
                    
            }
            else {
                
                ncont = node_update.enter()
                    .append("svg:foreignObject")
                    .attr("class", "node")
                    .attr("fill", "#fff")
                    .attr('width', '60px')
                    .attr('height', '80px')
                    .append('xhtml:div')
                    .attr("class", "main")
                    .attr("id",
                    function (d) {
                        return d.id
                    }).call(drag);

                ncont
                    .append("a")
                    .attr("class", "nbutton node-close")
                    .on("click", function (d) {
                        VV_relat.d3.reduce(d.id);
                    }, true)
                    .append("i")
                    .attr("class", "icon ico-close")
                    .attr("title", "TOTRAD");

                ncont
                    .append("a")
                    .attr("class", "nbutton node-expand")
                    .on("click", function (d) {
                        VV_relat.d3.expand(d.id, d.idProfil);
                    }, true)
                    .append("i")
                    .attr("class", "icon ico-plus")
                    .attr("title", "TOTRAD");
                    
                ncont.append('xhtml:div')
                    .attr("class",
                    function (d) {
                        return "circle bi-" + d.idProfil;
                    })
                    .style("background-color",
                    function (d) {
                        return (d.id == selectedId ? "#d2d2d2" : "#fff");
                    })
                    .on("click", function (d) {
                        var sel;
                        if (selectedId != "") {
                            sel = d3.selectAll("[id='" + selectedId + "']");
                            sel.attr('class', '');
                            
                            sel = d3.selectAll("[id='" + selectedId + "'] .circle");
                            var bcolor = (d.id == selectedId ? "#d2d2d2" : "#fff");
                            var bimg = "url('/assets/images/profils/" + selectedProfilId + ".png')";
                            sel.style('background-img', bimg);
                            sel.style('background-color', bcolor);
                        }
                        VV_dir_sb.categs.showHisto(d.id, d.idProfil);
                        selectedId = d.id;
                        selectedProfilId = d.idProfil;
                        //alert(d.id + "/",d.idProfil);
                        sel = d3.select("[id='" + d.id + "']");
                        sel.attr('class', 'selected');

                        sel = d3.select(this);
                        var bcolor = (d.id == d.id ? "#d2d2d2" : "#fff");
                        var bimg = "url('/assets/images/profils/" + d.idProfil + ".png')";
                        sel.style('background-img', bimg)
                        sel.style('background-color', bcolor)
                    }, true)
                ncont.append("xhtml:div")
                    .attr("class", "node-text")
                    .attr("title", function (d) {
                        return d.title;
                    })
                    .style("border",
                    function (d) {
                        switch (d.idProfil) {
                            case "102":
                                return "1px solid #E30613";
                                break;
                            case "108":
                                return "1px solid #0B8E36";
                                break;
                            case "113":
                            
                                return "1px solid #EF70B7";
                                break;
                            case "114":
                                return "1px solid #12A19A";
                                break;
                            default:
                                return "1px solid #333"
                        }
                    })
                    .text(function (d) {
                        return d.title;
                    });
            }
            
            
            node_update.exit().remove();
            force.start();
            
        },
        updateLinks: function (data) {
            var link_update = svg.selectAll(".link").data(
                force.links(),
                function (d) { return d.source.id + "-" + d.target.id; }
            );
            link_update.enter()
                .insert("line", ".link")
                .attr("class", "link");
            link_update.exit()
                .remove();
            force.start();
        },
        isProfileVisible: function(pid) {
            return $("#ch-" + pid).is(":checked");
        },
        addLink: function (source, target) {
            var source = VV_relat.d3.getNode(source);
            var target = VV_relat.d3.getNode(target);
            if (source && target) {
                links.push({ source: source, target: target });
            }
        },
        addNode: function (id, idProfil, title) {
            
            //alert(idProfil);
                //, fixed: (id == $("#numero_entite").val()) }
            nodes.push({ id: id, idProfil: idProfil, title: title, x: 0, y: 0 });
        },
        remNode: function (id) {

        },
        getNode: function (id) {
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].id == id) { return nodes[i] };
            }
        },
        nodeIsOrphan: function (id) {
            for (var i = 0; i < links.length; i++) {
                if ((links[i].source == id) || (links[i].target == id)) { return false; };
            }
            return true;
        },
        nodeExists: function (id) {
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].id == id) { return true; };
            }
            return false;
        },
        linkExists: function (sid, did) {
            for (var i = 0; i < links.length; i++) {
                if (((links[i].source == sid) && (links[i].target = did)) || ((links[i].target == sid) && (links[i].source = did))) { return true; };
            }
            return false;
        },
    }
    //document ready
    VV_relat.documentOnReady = {
        init: function () {
            //VV_relat.relat.updateMapSize();
            //VV_relat.sidebar.init();
            if ($("#page").val() == "2_5") 
            {
                VV_relat.d3.init();
                VV_relat.sidebar.init();
            }
            /*var sliderLength = document.getElementById('sliderLength');
            var sliderZoom = document.getElementById('sliderZoom');
            noUiSlider.create(sliderLength, {
                start: 60,
                animate: false,
                range: {
                    min: 20,
                    max: 150
                }
            });
            noUiSlider.create(sliderZoom, {
                start: 60,
                animate: false,
                range: {
                    min: 0.1,
                    max: 5
                }
            });
            sliderLength.noUiSlider.on('slide', function (values, handle) {
                VV_relat.d3.updateLinksLength(values[handle]);
                //alert(values[handle]);
            });
            sliderZoom.noUiSlider.on('slide', function (values, handle) {
                VV_relat.d3.updateZoom(values[handle]);
            });*/
            //OIP_relat.relat.init();
        }
    };
    //window on load
    VV_relat.windowOnLoad = {
        init: function () {

        }
    };
    //window on resize
    VV_relat.windowOnResize = {
        init: function () {
            switch ($("#numero_profil").val()) {
                case "102":
                case "108":
                case "113":
                case "114":
                    VV_relat.relat.updateMapSize();
                    break;
            }
        }
    };
    //Inits
    VV_relat.$document.ready(
        VV_relat.documentOnReady.init
    );
    VV_relat.$window.on('load',
    VV_relat.windowOnLoad.init
    );
    VV_relat.$window.on('resize',
    VV_relat.windowOnResize.init
   );

})(jQuery);
var VV_dir_sb = {};


(function ($) {
    "use strict";

    VV_dir_sb.$document = $(document);
    VV_dir_sb.$document_body = $(document.body); 
    VV_dir_sb.$window = $(window);


    VV_dir_sb.categs = {
            resize: function () {
                if (($("#page").val()=="2") || ($("#page").val().startsWith("7_"))) {return;}
                var aHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
                var aWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
                var accHeight = aHeight - $(".hm-tabs.tabs1").offset().top;
                $(".hm-tabs.tabs1").css('height', aHeight-75);
                $(".hm-tabs.tabs1 .tabs-body").css('height', "100%");
                //calcul taille des headers des accordons
                var headsHeight = 0;
                $("#accordion .panel.panel-default .panel-heading").each(function () {
                    headsHeight += $(this).innerHeight();
                });
                $("#accordion .panel.panel-default .criterias").each(function () {
                    headsHeight += $(this).innerHeight();
                });
    
                $("#accordion .panel-collapse").each(function () {
                    $(this).css('max-height', accHeight - headsHeight);
                });
                $('#inner-search').height(aHeight);
            },
            initCollapse: function () {
    
                $('#accordion .panel-collapse').on('shown.bs.collapse', function () {
                    $(this).parent().find(".fa").removeClass("fa-plus").addClass("fa-minus");
                });
                $('#accordion .panel-collapse').on('hidden.bs.collapse', function () {
                    $(this).parent().find(".fa").removeClass("fa-minus").addClass("fa-plus");
                });
                
            },
            removeAll:function(pid,parid) {
                
                $("[data-content=pc"+VV_dir_global.datas.curoldid+"] .news-tags .tag").each(function () {
                    $("[data-content=pc"+VV_dir_global.datas.curoldid+"] .acc_content li a i").removeClass("selected");    
                });
                switch (VV_dir_global.datas.curoldid)
                {
                    case "108":
                        $("#param1").val("");
                        $("#param2").val("");
                        $("#param3").val("");
                        break;
                    case "102":
                        $("#param4").val("");
                        break;
                    case "113":
                        $("#param5").val("");
                        $("#param6").val("");
                        $("#param7").val("");
                        $("#param8").val("");
                        break;
                }
                VV_dir_global.datas.load("#prof"+VV_dir_global.datas.curoldid);
                $("[data-content=pc"+VV_dir_global.datas.curoldid+"] .row.criterias .news-tags").empty();
            },
            uncheckParents: function (comp, obj) {
                var parComp = $(comp).parent().parent().attr('id');
                if (typeof parComp !== 'undefined') 
                {
                    if (parComp.indexOf("categ") > -1)
                    {
                        if ($("#" + parComp + " i:first").hasClass("selected")) {
                            $("#" + parComp + " i:first").removeClass("selected")
                            var cidParent = parComp.replace("categ", "");
                            var str = $(obj).val();
                            $("#stag" + cidParent).remove();
                            if (str.indexOf("|" + cidParent) >= 0) {
                                var toRemove = "|" + cidParent;
                                $(obj).val(str.replace(toRemove, ''));
                            } else if (str.indexOf(cidParent + "|") >= 0) {
                                var toRemove = cidParent + "|";
                                $(obj).val(str.replace(toRemove, ''));
                            } else if (str.indexOf(cidParent) >= 0) {   
                                var toRemove = cidParent;
                                $(obj).val(str.replace(toRemove, ''));
                            }
                        }
                        this.uncheckParents("#" + parComp, obj);
                    }
                }
            },
            add: function (pid, cid) {
                var isJsMode = ($("#page").val() == "2_2") || ($("#page").val() == "2_3") || ($("#page").val() == "2" || ($("#page").val() == "2_6")) ;
                var obj = document.getElementById("param" + pid);
                var str = $(obj).val();
                var toAdd = false;
                if(!($("#page").val() == "2") && !($("#page").val() == "2_6") && !VV_dir_map.map.initCateg)
                {
                    toAdd = true;   
                }
                else {
                    if (($("#page").val() == "2_6") && (pid == "1")) {
                        var cidB = cid;
                    }
                    else {
                        var cidB = cid.replace(/_1/g,' ').replace(/_2/g,'/').replace(/_3/g,'(').replace(/_4/g,')').replace(/_5/g,',');
                    }
                    if (str.indexOf("|" + cidB) >= 0) {
                        var toRemove = "|" + cidB;
                        $(obj).val(str.replace(toRemove, ''));
                    } else if (str.indexOf(cidB + "|") >= 0) {
                        var toRemove = cidB + "|";
                        $(obj).val(str.replace(toRemove, ''));
                    } else if (str.indexOf(cidB) >= 0) {
                        var toRemove = cidB;
                        $(obj).val(str.replace(toRemove, ''));
                    } else {
                        toAdd = true;
                        $(obj).val((($(obj).val() != '') ? ($(obj).val() + '|') : ('')) + cidB);
                    }
                }
                var comp = "#categ" + cid;

                if ($("#page").val()=="2")
                {
                     comp = "#categ" + cid;
                }
                if ($("#page").val()=="2_2")
                {
                     comp = "[data-content="+VV_dir_map.map.curtab+"] #categ" + cid;
                }

                if ($(comp + " i:first").hasClass("selected")) {
                    $(comp + " i:first").removeClass("selected")
                }
                else {
                    this.uncheckParents(comp, obj);
                    $(comp + " i:first").addClass("selected")
                }
                if (isJsMode) {
                    //MAJ CRITERIAS
                    if (toAdd)
                    {
                        var elementHtml = "";
                        var ele = ".criterias";
                    
                        if ($("#page").val()=="2")
                        {
                            
                            ele ="[data-content=pc"+VV_dir_global.datas.curoldid+"] .criterias";
                        }
                        
                        //if ($("#catPan" + pid).find(".news-tags").length == 0) {
                        if ($(ele).find(".news-tags").length == 0) {
                            elementHtml += '<div class="news-tags">';
                        }
                        
                        //elementHtml += '<li class="btn btn-sm" id="stag'+ cid +'">';
                        elementHtml += "<span class='tag' id='stag"+ cid +"'>";
                        if ($("#page").val()=="2")
                        {
                            elementHtml += " " + $(comp + " label").text();
                        }
                        else {
                            elementHtml += " " + $(comp + " a:first").text();
                        }
                        elementHtml += "<a  href='javascript:void(0);' onclick='VV_dir_sb.categs.add(\"" + pid + "\",\"" + cid + "\");'>";
                        elementHtml += 'x</a></span>';

                        
                        
                        if ($(ele).find(".news-tags").length == 0) {
                        //if ($("#catPan" + pid).find(".news-tags").length == 0) {
                            elementHtml += '</div>';
                            $(ele).append(elementHtml);
                        }
                        else {
                            
                            $(ele).find(".news-tags").append(elementHtml);
                        }
                    }
                    else {
                        $("#stag"+ cid).remove();
                    }
    
                    if ($("#page").val()=="2_2")
                    {
                        VV_dir_map.map.loadMarkers("map");
                    }
                    else {
                        if ($("#page").val()=="2_6")
                        {
                            VV_dir_global.datas.load();
                        }
                        else {
                            switch(pid)
                            {
                                case "1":
                                case "2":
                                case "3":
                                    VV_dir_global.datas.load("#prof108");
                                    break;
                                case "20":
                                case "21":
                                case "22":
                                case "23":
                                case "24":
                                case "25":
                                    scrollid = null;
                                    VV_dir_global.datas.load("#prof102");
                                    break;
                                case "5":
                                case "6":
                                case "7":
                                case "8":
                                    VV_dir_global.datas.load("#prof113");
                                    break;
                            }
                        }
                        
                    }
                }
                else {
                    var expiry = new Date();
                    expiry.setMinutes(expiry.getMinutes() + 10);
                    //CONCAT PAGE + PID pour keep corrects filters
                    document.cookie = "param" + pid + "_" + $("#page").val() + "=" + $(obj).val() + "; expires=" + expiry.toGMTString() + ";path=/";
                    $("#search_form").attr("action", "/" + $("#lang").val() + "/" + $("#page").val() + "/annuaire.html");
                    $("#search_form").submit();
                }
                
    
            },
            open: function (pid, cid) {
                var compLi = "#categ" + cid;
                var compUl = "#categ" + cid + " > ul";
    
                if ($(compLi).hasClass("opened"))
                {
                    $(compLi).removeClass("opened");
                    $(compUl).removeClass("opened");
                }
                else {
                    $(compLi).addClass("opened");
                    $(compUl).addClass("opened");
                }

                $(window).triggerHandler("resize");
            },
            showHistoReal: function (did,didprofil) {
                var spin = "<div class='spinner'>";
                spin += "<div class='bounce1'></div>";
                spin += "<div class='bounce2'></div>";
                spin += "<div class='bounce3'></div>";
                spin += "</div>";
    
                $(this).remove();
                $("#inner-histo .histos").prepend("<div id='be" + did + "'>" + spin + "</div>");
    
                $.ajax({
                    url: '/'+$("#lang").val()+'/detailcartohisto/' + did,
                    method: "GET",
                    success: function(data) {
                        $("#be" + did).hide();
                        $("#be" + did).addClass("hblock p" + didprofil);
                        console.log(data);
                        $("#be" + did).hide().html(data).fadeIn(500);
                    }
                });
            },
            showHisto: function (did, didprofil) {
                
                if ($("#be" + did).length) {
                    $("#be" + did).fadeOut(300, function () {
                        $(this).remove();
                        VV_dir_sb.categs.showHistoReal(did, didprofil);
                    });
                }
                else { VV_dir_sb.categs.showHistoReal(did, didprofil); }
    
            },
    
    }
    //document ready
    VV_dir_sb.documentOnReady = {
        init: function () {
            $( ".accordion ul li a" ).unbind( "click" );
            $('ul.tabs-navi a').click(function () {
                $(window).triggerHandler("resize");
            });
            $('ul.tabs-navi a').on('shon.bs.tab', function (e) {
                e.target // newly activated tab
                e.relatedTarget // previous active tab
              })
            $('#sidebar-bt-filters').click(function () {
                var $lefty = $("#inner-search");
                $lefty.animate({
                    left: parseInt($lefty.css('left'), 10) == 0 ? -$lefty.outerWidth()+1 : 0
                });
            });
            $('#sidebar-bt-histo').click(function () {
                var $lefty = $("#inner-histo");
                $lefty.animate({
                    right: parseInt($lefty.css('right'), 10) == 0 ? -$lefty.outerWidth()+1 : 0
                });
            });
            $('#fulltextdir').on('keypress', function(e) {
                if(e.which == 13) {
                    e.preventDefault();
                        /*if ($("#relat").length>0) {
                            
                        }
                        else
                        {*/
                            VV_dir_map.map.loadMarkers("map");
                       // }
                }
            })
            $('#bt-search').on("click", function(e) {
                e.preventDefault();
                /*if ($("#relat").length>0) {

                }
                else
                {*/
                    VV_dir_map.map.loadMarkers("map");
                //}
                
            });
            //SI BOWL ALORS PR2SELECTION PLATEFORME EN COURS

            if ($("#page").val()=="2_6")
            {
                if (olUid) {
                    VV_dir_sb.categs.add("1",olUid);
                }
                else {
                    VV_dir_sb.categs.add("1","HhZJj4gBcChJ5PWKQg0b");
                }
            }
        }
    };
    //window on load
    VV_dir_sb.windowOnLoad = {
        init: function () {
        }
    };
    VV_dir_sb.windowOnResize = {
        init: function () {
            VV_dir_sb.categs.resize();
        }
    };
    //Inits
    VV_dir_sb.$document.ready(
        VV_dir_sb.documentOnReady.init
    );
    VV_dir_sb.$window.on('load',
    VV_dir_sb.windowOnLoad.init
    );
    VV_dir_sb.$window.on('resize',
    VV_dir_sb.windowOnResize.init
    );

})(jQuery);
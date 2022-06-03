var VV_detail = {};

var elements = [];

var levels = {};

(function ($) {
    "use strict";

    VV_detail.$document = $(document);
    VV_detail.$document_body = $(document.body);
    VV_detail.$window = $(window)

    VV_detail.printer = {
        printPage: function () {
            //var toPrint = $(".container.detail");

            /*var popupWin = window.open('', '_blank', 'width=350,height=150,location=no,left=200px');
            popupWin.document.open();
            popupWin.document.write('<html><title>::Print Preview:</title></head><body">')
            popupWin.document.write(toPrint.html());
            popupWin.document.write('</body></html>');

            popupWin.document.close();
            */
            window.print();
            return true;
        }
    },
    VV_detail.tabUnder = {
        switch: function (tab,pid) {
            if (tab == "list") {
                $("#btMapMode-" + pid).removeClass("active");
                $("#btListMode-" + pid).addClass("active");
                $("#lst-" + pid).css("display", "");
                $("#map-" + pid).css("display", "none");
            }
            else {
                $("#btListMode-" + pid).removeClass("active");
                $("#btMapMode-" + pid).addClass("active");
                $("#lst-" + pid).css("display", "none");
                $("#map-" + pid).css("display", '');
                VV_dir_map.map2.init('map-' + pid);
            }
            
            //$("#register_company_nom").css("display", rcnd);
            //$(id1).removeClass("active");
            //$(id2).addClass("active");
            return true;
        }
    },
    VV_detail.blog = {
        curComment:-1,
        loadPosts: function (theme) {
            $.ajax({
                url: $("#lang").val() + "/forum/comments/" + uid,
                method: "GET",
                success: function(data) {
                    $(".commentsels").html(data);

                    VV_detail.blog.sendCommentBtInit();
                }
            });
            
        },
        addPost: function (id, name, date, message, parent) {
            var loged = ($("#loged").val() == "y");
            var multiStr = [
                '<div class="' + (parent != -1 ? (levels[id] == 2 ? 'post-comment-indent-large' : 'post-comment-indent-large-more'):'post-comment-large')+' margin-top-30" id="post-'+ id +'">',
                  '<div class="comment-left">',
                  '<img src="/assets/images/comment-photo1.jpg" alt="" />',
                  (loged && (levels[id] <= 1) ? '<a href="javascript:void(0);" onclick="VV_detail.blog.addReplyForm(\'post-' + id + '\')" class="reply-link">' :'<a href="javascript:void(0);" class="reply-link">'),
                  (loged && (levels[id] <= 1) ? '<i class="fa fa-reply"></i>' + language.t399+'                                          </a>' : '<i>&nbsp;</i>&nbsp;</a>'),
                  '</div>',
                '<div class="comment-right">',
                  '<div class="comment-author">' + name + '</div>',
                  '<div class="comment-date">' + date + '</div>',
                  '<div class="comment-text">' + message + '</div>',
                  '</div>',
                  '<div class="clearfix"></div>',
                  '</div>'
            ].join("\n");
            //CHECK IF PARENT EXISTS
            if (parent != -1) {
                var pidtab = parent.toString().split(";");
                
                $("#post-" + (pidtab[0]!=""?pidtab[0]:pidtab[1])).after(multiStr);
                
            }
            else {
                $(".commentsels").append(multiStr); 
            }
        },
        sendCommentBtInit:function(parentDom) {
            $("#sendComment").on('click', function (event) {
                //if (validForm("#contact_form")) {
                    $("#sendComment").css("display", "none");
                    $(".spinnerComment").css("display", "");
                    var d = new Date(),
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();
                    if (month.length < 2) month = '0' + month;
                    if (day.length < 2) day = '0' + day;
                    var item = {
                        curProject:projectUID,
                        curProto:"5c2c4def07c805cd14b33520",
                        projects:[projectUID],
                        proto: ["5c2c4def07c805cd14b33520"],
                        public:true,
                        version:{
                            p5c332d9907c805cd14cf2b18: [year, month, day].join('-'),
                            p5c332e5e07c805cd14cf3b71: $("#message").val(),
                            p5c332e5b07c805cd14cf3b2c: uid
                        }
                    };
                    if (parentDom)
                    {
                        VV_detail.blog.curComment = parentDom.replace("post-","");
                        item.parent = VV_detail.blog.curComment;
                    }
                    $.ajax({
                        url: '/objects/add/'+$("#lang").val(),
                        method: "POST",
                        data: item,
                        success: function(data) {
                            window.location.reload();
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            $(selectorr + " button").prop('disabled', false);
                            $(selectorr + " #modalloader").css("display","none");
                        }
                    });
                //}
                
            });
            
        },
        addReplyForm: function (parentDom) {
            $(".comment-form-cont").remove();
            $.ajax({
                url: $("#lang").val() + "/forum/commentform",
                method: "GET",
                success: function(data) {
                    $("#" + parentDom).append(data);
                    VV_detail.blog.sendCommentBtInit(parentDom);
                }
            });
            
        },
        checkSend: function (data) {
            location.reload();
        },
        init: function () {
            VV_detail.blog.loadPosts($("#numero_entite").val());
        }
    };

    VV_detail.relations = {
        geoinit:false,
        init: function () {

            
        },
        showRelatPg:function(pgid)
        {
            $('[id^=relatpage]').css("display","none");
            $('[id^=relatpagin]').removeClass("active");
            $('#relatpage' + pgid).css("display","");
            $('#relatpagin' + pgid).addClass("active");
        }
    };

    VV_detail.rate = {
        loadRatesOk: function (data) {
            $("#noteMoy").rating('update', parseInt(data.rate));
        },  
        loadRates: function (theme) {
            $.ajax({
                url: $("#lang").val() + '/docrate/'+ $("#numero_entite").val(),
                method: "GET",
                success: VV_detail.rate.loadRatesOk,
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('error ' + textStatus + " " + errorThrown);
                }
            });
            /*$.ajax({
                type: "POST",
                url: "/WebService.asmx/oipLoadNotes",
                data: JSON.stringify({ theme: $("#numero_entite").val()}),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: VV_detail.rate.loadRatesOk
            });*/
        },
        addRate: function () {
            $("#btAddRate").css("display", "none");
            $(".spinnerRate").css("display", "");
            $("#noteOk").css("display", "none");

            var item = {
                projects:[projectUID],
                curProject:projectUID,
                proto:["5c2c4df007c805cd14b33530"],
                curProto:"5c2c4df007c805cd14b33530",
                public:true,
                version: {
                    p5c332e6d07c805cd14cf3cd9: $("#numero_entite").val(),
                    p5c332e6907c805cd14cf3c7e: $("#note1").val(),
                    p5c332e6a07c805cd14cf3c95: $("#note2").val(),
                    p5c332e6b07c805cd14cf3cac: $("#note3").val(), 
                    p5c332e6c07c805cd14cf3cc2: $("#note4").val()
                }
            };
            
            //
            $.ajax({
                url: '/objects/add/'+$("#lang").val(),
                method: "POST",
                data: item,
                success: VV_detail.rate.checkSend,
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('error ' + textStatus + " " + errorThrown);
                }
            });

/*

            $.ajax({
                type: "POST",
                url: "/WebService.asmx/addNoteOIP",
                data: JSON.stringify({
                    idEntite: $("#numero_entite").val(),
                    note: {
                        note1: $("#note1").val(),
                        note2: $("#note2").val(),
                        note3: $("#note3").val(), 
                        note4: $("#note4").val()
                    }
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: VV_detail.rate.checkSend
            });*/
        },
        checkSend: function (data) {
            $("#btAddRate").css("display", "");
            $(".spinnerRate").css("display", "none");
            $("#noteOk").css("display", "");
            $(".rating").rating('update', 0);
            VV_detail.rate.loadRates();
        },
        init: function () {
            $('.rating').rating({
                showClear: false,
                showCaption: false,
                size: 'lg'
            });
            $("#btAddRate").on('click', function (event) {
                VV_detail.rate.addRate();
            });
            VV_detail.rate.loadRates();
        }
    };
    VV_detail.keywords = {
        init: function () {
            $(".kw-link").each(function () {
                $(this).on('click', function (event) {
                    var stitu = $(this).text().toLowerCase()
                                .replace(/ /g, '-')
                                .replace(/[^\w-]+/g, '');
                    $("#fulltext").val($(this).text().replace('#', ''));
                    $("#kwForm").attr("action", "/" + $("#lang").val() + "/2/" + stitu + ".html");
                    $("#kwForm").submit();
                    return false;
                });
            });
        }
    };
    //
    VV_detail.map = {
        init: function () {
            
            //mapInit($("#lat").val(), $("#lng").val(), "agency-map", "/themes/37/images/pin-commercial-green.png", true);
            var lat = item.lat;
            var lng = item.lng;
            var id = "agency-map";
   
            var pinicon = '/assets/images/markers/108.png'
            var ui = true;
            if (ui == false) {
                ui = true;
            } else {
                ui = false;
            }
            //if (w_width > 991) {
            //    offset = typeof offset !== 'undefined' ? 0.0075 : 0;
            //} else {
                var offset = 0;
            //}
                var mapStyle = [
        {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#e0efef"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "hue": "#1900ff"
                },
                {
                    "color": "#c0e8e8"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "lightness": 100
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "lightness": 700
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#7dcdcd"
                }
            ]
        }
                ];
            var mapOptions = {
                zoom: 15,
                disableDefaultUI: ui,
                draggable: true,
                zoomControl: true,
                scrollwheel: false,
                disableDoubleClickZoom: true,
                mapTypeControlOptions: {
                    position: google.maps.ControlPosition.LEFT_TOP
                },
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_TOP
                },
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_TOP
                },
                center: new google.maps.LatLng(lat - offset, lng),
                styles: mapStyle
            };

            var mapElement = document.getElementById(id);
            var map = new google.maps.Map(mapElement, mapOptions);

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: map,
                title: '',
                icon: pinicon
            });
            var myOptions = {
                disableAutoPan: false,
                maxWidth: 0,
                pixelOffset: new google.maps.Size(20, -90),
                zIndex: null,
                boxStyle:
                {
                    opacity: 0.8,
                },
                closeBoxURL: "",
                closeBoxMargin: "14px 4px 4px 4px",
                infoBoxClearance: new google.maps.Size(20, 20),
                isHidden: false,
                pane: "floatPane",
                enableEventPropagation: false
            };
            var infowindow = new InfoBox(myOptions);
            google.maps.event.addListener(marker, 'click', function () {
                
                    map.setCenter(this.position);
                    //map.setZoom(10);

                    //Affichage loader
                    var html = "";
                    html += "<div class='infob-wrapper'>";
                    html += "<div class='infoContent' >";
                    html += "<div class='spinner'>";
                    html += "<div class='bounce1'></div>";
                    html += "<div class='bounce2'></div>";
                    html += "<div class='bounce3'></div>";
                    html += "</div>";

                    //
                    //var idEntite = obj.get("numero_entite");
                    //var logo = obj.get("logo");
                    //
                    html += "<div class='wrapper_clear'></div>";
                    html += "</div>";
                    html += "<div class='wrapper_clear'></div>";
                    html += "</div>";
                    infowindow.close();
                    infowindow.setContent(html);
                    infowindow.open(map, this);



                    VV_dir_map.map.loadIBContent($("#numero_entite").val(), infowindow, "");
                
            });
            if (id == "estate-map") {
                estateMap = map;
            }
        }
    };
    VV_detail.contact = {
        checkSend: function (data) {

            $(".spinner").css("display", "none");
            console.log(data);
            if (data.ok == true) {
                $("#name").val("");
                $("#phone").val("");
                $("#mail").val("");
                $("#message").val("");
                $("#contactOk").css("display", "");
                setTimeout(function () {
                    $("#contactOk").css("display", "none");
                    $("#sendContact").css("display", "");
                }, 3000);
            }
            else {
                $("#sendContact").css("display", "");
            }
            
        },
        init: function () {
            $("#sendContact").click(function (event) {
                
                if ($('#honeyContact').val() != '') {
                    return false;
                }
                else {
                    var contact = {
                        idEntite: $("#numero_entite").val(),
                        idClient: $("#numero_client").val(),
                        to: $("#mto").val(),
                        name: $("#name").val(),
                        phone: $("#phone").val(),
                        mail: $("#mail").val(),
                        message: $("#message").val(),
                    }
                    if (validForm("#contact_form")) {
                        $("#sendContact").css("display", "none");
                        $(".spinner").css("display", "");
                        //
                        $.ajax({
                            url: '/contact/' + $("#lang").val(),
                            method: "POST",
                            data: {
                                contact:contact,
                                page:window.location.href
                            },
                            success: function(data) {
                                VV_detail.contact.checkSend(data);
                                //window.location.href = "/en/index";
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                console.log('error ' + textStatus + " " + errorThrown);
                            }
                        });

                    }
                }
                
                return false;
            });
        }
    };
    //document ready
    VV_detail.documentOnReady = {
        init: function () {
            
            if ($(".rich-content").length>0) {
                if ($(".rich-content").html().indexOf("[[NETWORKS]]")>-1){
                    const urlParams = new URLSearchParams(window.location.search);
                    const caller = urlParams.get('caller');
                    $.ajax({
                        url: "/me/registeredin/"+$("#lang").val() + "/" + caller,
                        method: "GET",
                        success: function(data) {
                            var final = JSON.parse(data.data).in;
                            var finals = "<ul>";
                            for (var i = 0;i<final.length;i++)
                            {
                                finals+= "<li>"+ final[i].lib+"</li>";
                            }
                            finals += "</ul>";
                            $(".rich-content").html($(".rich-content").html().replace("[[NETWORKS]]",finals))
                        }
                    });
                }
            }
            
            if ($(".commentsels").length > 0) {
                VV_detail.blog.init();
            }
            //$('#georelats').on('click', function (e) {
                //if (!VV_detail.relations.geoinit)
                //{
                //    VV_dir_map.map.init('map-relats');
                    
                //    VV_detail.relations.geoinit = true;
                //}
                
            //});
            $('#sidebar-bt-histo').click(function () {
                var $lefty = $("#inner-histo");
                $lefty.animate({
                    bottom: parseInt($lefty.css('bottom'), 10) == 0 ? -$lefty.outerHeight()+1 : 0
                });
            });
            $('#detailsearch').on('keypress', function(e) {
                if(e.which == 13) {
                        e.preventDefault();
                        location.href = '/'+$("#lang").val()+'/2/108/global.html?fulltext='+$("#detailsearch").val();
                        return false;
                }
        })
        
            switch ($("#numero_profil").val()) {
                case "113":
                VV_detail.contact.init();
            
                VV_detail.relations.init();
                case "108":
                    //VV_dir_map.map.init('map');
                VV_detail.contact.init();
                VV_detail.relations.init();
                case "102":
                    //VV_detail.rate.init();
                    break;
            }
            //VV_detail.blog.addReplyForm("nbComments");
            $('ul.tabs-navi a').click(function (e) {
                if ($(e.currentTarget).attr("data-content")=="localize") {
                    VV_dir_map.map.init('map_detail');
                }
            })

        }
    };
    //window on load
    VV_detail.windowOnLoad = {
        init: function () {
            
            if (($("#numero_profil").val() == "108") || ($("#numero_profil").val() == "113"))
            {
                
            }
            
        }
    };
    //Inits
    VV_detail.$document.ready(
        
        VV_detail.documentOnReady.init
    );
    VV_detail.$window.on('load',
        VV_detail.windowOnLoad.init
    );

})(jQuery);
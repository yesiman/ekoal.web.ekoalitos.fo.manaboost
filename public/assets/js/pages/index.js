var VV_home = {};


(function ($) {
    "use strict";

    VV_home.$document = $(document);
    VV_home.$document_body = $(document.body);
    VV_home.$window = $(window);

    VV_home.init = function () {    


        //VV_dir_map.map.init('map');
        /*$('.fulltext').on('keypress', function(e) {
        var closForm = $(this).closest("form");
        var input = $(closForm).children(".fulltext");
        if(e.which == 13) {
                e.preventDefault();
                location.href = '/'+$("#lang").val()+'/2/108/global.html?fulltext='+$(input).val();
                return false;
        }});*/
        $('.serch_input').on('keypress', function(e) {
            var input = $(e.target);
            if(e.which == 13) {
                e.preventDefault();
                location.href = '/'+$("#lang").val()+'/2/108/global.html?fulltext='+$(input).val();
                return false;
            }
        })
        $('.search_btn').on('click', function(e) {
            var closForm = $(this).closest("form");
            var input = $(closForm).children(".serch_input");
            if (e.preventDefault) e.preventDefault();
            location.href = '/'+$("#lang").val()+'/2/108/global.html?fulltext='+$(input).val();
            return false;
        });
        if ($("#swiper1").length) {
            //initialize swiper when document ready  
            var swiper1 = new Swiper('#swiper1', {
                // Optional parameters
                nextButton: '.slide-next',
                prevButton: '.slide-prev',
                loop: true,
                grabCursor: true,
                preloadImages: false,
                lazyLoading: true,
                lazyLoadingInPrevNext: true,
                loopAdditionalSlides: 0,
                autoplay: 2500,
                speed: 700
            });

            /*var slidesSum = $(".swiper-slide").length;
            $(".slide-desc-1").addClass("slide-desc-" + (slidesSum - 1));
            $(".slide-desc-" + (slidesSum - 2)).addClass("slide-desc-0");

            swiper1.on('onTransitionEnd', function () {

                $(".slide-desc-" + swiper1.previousIndex).removeClass("fadeInDown");
                $(".slide-desc-" + swiper1.previousIndex).addClass("fadeOutDown");
                $(".slide-desc-" + swiper1.activeIndex).removeClass("fadeOutDown");
                $(".slide-desc-" + swiper1.activeIndex).addClass("fadeInDown");
            });*/
        }
        if ($("#calendar").length>0)
        {
            $('#calendar').datepicker( "destroy" );
                                    //$('#eventscalendar').removeClass("hasDatepicker").removeAttr('id');
            let ldata = { anonymous:true,filters:{
                    proto:'5c2c4deb07c805cd14b334b4',
                    project:projectUID,
                    text:"",
                    public:true
            },
                    fields:{
                        p5c332db407c805cd14cf2d60:1,
                        p5c332db507c805cd14cf2d7b:1,
                        p5c332d0b07c805cd14cf1ef5:1,
                        p5c332d2807c805cd14cf2194:1,
                        p5c332d1907c805cd14cf2042:1
                    } };

            $.ajax({
                    url: '/getevents/en/1/100/',
                    method: "POST",
                    data:ldata,
                    success: function(data) {
                        var items = JSON.parse(data.data).items;
                        $("#calendar").datepicker({
                            container: '#calparent',
                            orientation: "auto top",
                            todayHighlight:true,
                            todayBtn:true,
                            beforeShowDay: function (date) {
                                    var theday = new Date((date.getMonth()+1) +'/'+ 
                                    date.getDate()+ '/' + 
                                    date.getFullYear());
                                    theday.setHours(23);
                                    theday.setSeconds(59);
                                    theday.setMinutes(59);
                                    //alert(theday);
                                    for(var o in items){
                                            var tmpdt = new Date(items[o]["p5c332db407c805cd14cf2d60"]);
                                            var tmpdtend = new Date(items[o]["p5c332db407c805cd14cf2d60"]);
                                            tmpdtend.setHours(23);
                                            tmpdtend.setSeconds(59);
                                            tmpdtend.setMinutes(59);
                                            if (items[o]["p5c332db507c805cd14cf2d7b"])
                                            {
                                                    tmpdtend = new Date(items[o]["p5c332db507c805cd14cf2d7b"]);
                                            }
                                            var selected = false;
                                            
                                                    selected = ((theday <= tmpdtend) && 
                                                            (theday >= tmpdt));
                                            //}
                                            //OCP_dashboard.news.bind(items[o]);
                                            if (selected) { return "selected"; }
                                    }
                                    
                                    return "";
                                    }
                            }).on("changeDate", function (ev) {
                                    var theday = new Date((ev.date.getMonth()+1) +'/'+ 
                                    ev.date.getDate()+ '/' + 
                                    ev.date.getFullYear());
                                    theday.setHours(23);
                                    theday.setSeconds(59);
                                    theday.setMinutes(59);

                                    $("h6.uppercase.tit").html(txtEvtsFrom + theday.toLocaleDateString());

                                    var evts = "";
                                    evts += "<ul>";
                                    var isitems = false;
                                    for(var o in items){
                                            var tmpdt = new Date(items[o]["p5c332db407c805cd14cf2d60"]);
                                            var tmpdtend = new Date(items[o]["p5c332db407c805cd14cf2d60"]);
                                            tmpdtend.setHours(23);
                                            tmpdtend.setSeconds(59);
                                            tmpdtend.setMinutes(59);
                                            if (items[o]["p5c332db507c805cd14cf2d7b"])
                                            {
                                                    tmpdtend = new Date(items[o]["p5c332db507c805cd14cf2d7b"]);
                                            }

                                            if (((theday <= tmpdtend) && 
                                            (theday >= tmpdt))){
                                                    evts+="<li>";
                                                    evts+="<a href='/"+$("#lang").val()+"/7_115/"+items[o]._id+"/"+encodeURIComponent(items[o]["p5c332d0b07c805cd14cf1ef5"])+".html'>";
                                                    evts += "<div class='mb24 boxed-img' style='height:150px;width:100%;text-align:center;vertical-align: middle;'>";
                                                    evts+="<img src='"+s3 + items[o]["p5c332d1907c805cd14cf2042"]+"' style='max-height:150px;'/></div>";
                                                    evts+="</a>";

                                                    evts+="<a href='/"+$("#lang").val()+"/7_115/"+items[o]._id+"/"+encodeURIComponent(items[o]["p5c332d0b07c805cd14cf1ef5"])+".html'>";
                                                    evts+="<h4 class='mb8'>"+items[o]["p5c332d0b07c805cd14cf1ef5"]+"</h4>";
                                                    evts+="<p class='mb0'>"+items[o]["p5c332d2807c805cd14cf2194"]+"</p>";
                                                    evts+="</a>";

                                                    //evts += `<span class="tooltip-content5"><span class="tooltip-text3"><span class="tooltip-inner2" style="font-size:16px;">`+items[o]["p5c332d0b07c805cd14cf1ef5"]+`.</span></span></span>`;
                                                    //evts += "<p>"+items[o]["p5c332d2807c805cd14cf2194"]+"</p>";
                                                            
                                                    //var tt = `<span class="mytooltip tooltip-effect-1">
                                                    //<span class="tooltip-item2">`+items[o]["p5c332d0b07c805cd14cf1ef5"]+`</span>
                                                    //<span class="tooltip-content4 clearfix"><span class="tooltip-text2">
                                                    //`+items[o]["p5c332d0b07c805cd14cf1ef5"]+`, also known as Euclid of Alexandria, was a Greek mathematician, often referred to as the "Father of Geometry". He was active in Alexandria during the reign of Ptolemy I. <a href="http://en.wikipedia.org/wiki/Euclid">Wikipedia</a></span></span>
                                                    //</span>`;


                                                    evts+="</li>";
                                                    isitems = true;
                                            }
                                    }
                                    if (!isitems)
                                    {
                                            evts+="<span>No events</span>";        
                                    }
                                    evts+="</ul>";
                                    $("#evts").html(evts);
                                    //console.log(date,e);
                                    
                            }).datepicker('setDate', new Date());;
                        }
                    });
                //$('#calendar')

        }

        /*$('#france-map').vectorMap({
            backgroundColor:"transparent",
            map: 'fr_regions_mill',
            zoomOnScroll:false,
            zoomButtons:false,
            onRegionClick:function(e, code)
            {
                location.href = '/'+$("#lang").val()+'/2_2/map.html';
            },
            onRegionTipShow: function (e, label, code) {
                e.preventDefault();
            },
            regionStyle: {
                initial: {
                  fill: '#96336c',
                  "fill-opacity": 1,
                  stroke: 'none',
                  "stroke-width": 0,
                  "stroke-opacity": 0
                },
                hover: {
                  "fill-opacity": 1,
                  fill: '#96336c',
                  cursor: 'pointer'
                },
                selected: {
                  fill: 'yellow'
                },
                selectedHover: {
                }
              }
        });*/
        
    }
    //document ready
    VV_home.documentOnReady = {
        init: function () {
            VV_home.init();
        }
    };
    //window on load
    VV_home.windowOnLoad = {
        init: function () {
            
        }
    };
    //Inits
    VV_home.$document.ready(
        VV_home.documentOnReady.init
    );
    VV_home.$window.on('load',
        VV_home.windowOnLoad.init
    );

})(jQuery);
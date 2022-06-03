var VV_dir_relat = {};


(function ($) {
    "use strict";

    VV_dir_relat.$document = $(document);
    VV_dir_relat.$document_body = $(document.body);
    VV_dir_relat.$window = $(window);

    var myllmap = {};
    var cluster = {};
    VV_dir_relat.relat = {
        init: function () {
            
        },
        resize:function(id,e)
        {
            if ($(".accordion").length > 0)
            {
                var aHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
                var aWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
                var accHeight = aHeight - $(".accordion").offset().top;
                $("#relat").css('height', aHeight);
            }
            
        },
    };
    //document ready
    VV_dir_relat.documentOnReady = {
        init: function () {
            //VV_dir_relat.relat.resize();

            if ($("#page").val() == "2_3")
            {
                if ($("#param1").val() && $("#param1").val().trim()!="")
            {
                var p1 = $("#param1").val().split("|");
                filters.subs["p5c332d5407c805cd14cf254c"] = {$in:p1};
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
                filters.subs["p5c332d2607c805cd14cf2166"] = {$in:p2};
                if (!VV_dir_map.map.initCateg)
                {
                    for(var r in p2)
                    {
                        VV_dir_sb.categs.add('2',p2[r]);
                    }
                }
            }
            
            VV_dir_map.map.initCateg = true;
            }
            


            VV_dir_relat.relat.resize();
                //VV_relat.d3.init();
        }
    };
    //window on load
    VV_dir_relat.windowOnLoad = {
        init: function () {
            VV_dir_relat.relat.resize();
        }
    };
    VV_dir_relat.windowOnResize = {
        init: function () {
            VV_dir_relat.relat.resize();
        }
    };
    //Inits
    VV_dir_relat.$document.ready(
        VV_dir_relat.documentOnReady.init
    );
    VV_dir_relat.$window.on('load',
    VV_dir_relat.windowOnLoad.init
    );
    VV_dir_relat.$window.on('resize',
    VV_dir_relat.windowOnResize.init
    );

})(jQuery);
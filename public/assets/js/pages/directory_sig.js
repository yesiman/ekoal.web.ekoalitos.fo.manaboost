var VV_dir_sig = {};


(function ($) {
    "use strict";

    VV_dir_sig.$document = $(document);
    VV_dir_sig.$document_body = $(document.body);
    VV_dir_sig.$window = $(window);

    var myllmap = {};
    var cluster = {};
    VV_dir_sig.map = {
        resize:function(id,e)
        {
                var aHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
                $("iframe").css('height', aHeight);
         
            
        },
    }
    //document ready
    VV_dir_sig.documentOnReady = {
        init: function () {
            VV_dir_sig.map.resize();
            
        }
    };
    //window on load
    VV_dir_sig.windowOnLoad = {
        init: function () {
        }
    };
    VV_dir_sig.windowOnResize = {
        init: function () {
            VV_dir_sig.map.resize();
        }
    };
    //Inits
    VV_dir_sig.$document.ready(
        VV_dir_sig.documentOnReady.init
    );
    VV_dir_sig.$window.on('load',
        VV_dir_sig.windowOnLoad.init
    );
    VV_dir_sig.$window.on('resize',
        VV_dir_sig.windowOnResize.init
    );

})(jQuery);
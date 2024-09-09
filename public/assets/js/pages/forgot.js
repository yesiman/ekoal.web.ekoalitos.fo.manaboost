var VV_forgot = {};

(function ($) {
    "use strict";
    //

    /* ---------------------------------------------------------------------- */
    /* -------------------------- Declare Variables ------------------------- */
    /* ---------------------------------------------------------------------- */
    VV_forgot.$document = $(document);
    VV_forgot.$document_body = $(document.body);
    VV_forgot.$window = $(window);
    var dedouble = [];

    VV_forgot.isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (VV_forgot.isMobile.Android() || VV_forgot.isMobile.BlackBerry() || VV_forgot.isMobile.iOS() || VV_forgot.isMobile.Opera() || VV_forgot.isMobile.Windows());
        }
    };

    VV_forgot.isRTL = {
        check: function () {
            if ($("html").attr("dir") == "rtl") {
                return true;
            } else {
                return false;
            }
        }
    };
    //
    VV_forgot.lostpass = {
        checkLog: function (data) {
            if (data.d != "") {
                $("#fpregisOk").css("display", "");
                setTimeout(function () {
                    window.location.href = "/" + $("#lang").val() + "/1/home.html";
                }, 3000);
            }
            else {
                $("#fpbadCredR").css("display", "");
                $("#forgot_btn_submit").css("display", "");
                $(".spinner").css("display", "none");
            }
        },
        call: function (event) {
            event.preventDefault();
            $("#fpregisOk").css("display", "none");
            $("#fpbadCredR").css("display", "none");
            $("#forgot_btn_submit").css("display", "none");
            $(".spinner").css("display", "");
            $.ajax({
                url: '/recover/'+$("#lang").val()+'/' + $("#usernameForPass").val(),
                success: function(data) {
                    VV_forgot.lostpass.checkLog(data);
                }
            });
            //}
            
           
            //}
        },  
        init: function () {
            
            $("#forgot_btn_submit").click(VV_forgot.lostpass.call);
            //$("#recover_btn_submit").click(recoverPassCall);
            $("#loginLost").keydown(function (event) {
                if (event.keyCode == 13) {
                    //recoverPassCall();
                }
            });
        }
    };
    //
    
    //document ready
    VV_forgot.documentOnReady = {
        init: function () {
            VV_forgot.lostpass.init();
        }
    };
    //window on load
    VV_forgot.windowOnLoad = {
        init: function () {
            
        }
    };
    
    //Inits
    VV_forgot.$document.ready(
        VV_forgot.documentOnReady.init
    );
    VV_forgot.$window.on('load',
    VV_forgot.windowOnLoad.init
    );

})(jQuery);
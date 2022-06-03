var VV_login = {};

(function ($) {
    "use strict";
    //

    /* ---------------------------------------------------------------------- */
    /* -------------------------- Declare Variables ------------------------- */
    /* ---------------------------------------------------------------------- */
    VV_login.$document = $(document);
    VV_login.$document_body = $(document.body);
    VV_login.$window = $(window);
    var dedouble = [];

    VV_login.isMobile = {
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
            return (VV_login.isMobile.Android() || VV_login.isMobile.BlackBerry() || VV_login.isMobile.iOS() || VV_login.isMobile.Opera() || VV_login.isMobile.Windows());
        }
    };

    VV_login.isRTL = {
        check: function () {
            if ($("html").attr("dir") == "rtl") {
                return true;
            } else {
                return false;
            }
        }
    };
    //
    VV_login.login = {
        checkLog: function (data) {
            if (data.d != "") {
                document.location.href = "/" + $("#lang").val() +"/11/Bo.html";
            } else {
                //$("#login_btn_submit").css("display", "");
                //$(".spinner").css("display", "none");
                //$("#badCred").css("display", "");
                return false;
            }
        },
        loginCall: function (event) {
            event.preventDefault();
            /*$("#login_btn_submit").css("display", "none");
            $(".spinner").css("display", "");
            $("#badCred").css("display", "none");*/
            //5d5667bdd6c51e407429e3e4
            $.ajax({
                url: '/login/' + $("#lang").val() + "/" +$("#username").val()+'/' + $("#password").val() + "/" + projectUID,
                success: function(data) {
                    //STORE TOKEN AS COOKIES
                    //GOTO WEBSITE
                    if (data.data.success == true)
                    {
                       window.location.href = "/"+$("#lang").val()+"/prototypes/" + projectUID;
                    }
                    else {
                        //Messge login /mdp invalide
                        $("#login_btn_submit").css("display", "");
                        $(".spinner").css("display", "none");
                        $("#badCred").css("display", "");
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $("#login_btn_submit").css("display", "");
                    $(".spinner").css("display", "none");
                    $("#badCred").css("display", "");
                }
            });
            //}
        },
        init: function () {
            $("#login_btn_submit").click(VV_login.login.loginCall);
            //$("#recover_btn_submit").click(recoverPassCall);
            $("#username").keydown(function (event) {
                if (event.keyCode == 13) {
                    VV_login.login.loginCall(event);
                }
            });
            $("#password").keydown(function (event) {
                if (event.keyCode == 13) {
                    VV_login.login.loginCall(event);
                }
            });
        }
    };
    //
    
    //document ready
    VV_login.documentOnReady = {
        init: function () {
            VV_login.login.init();
        }
    };
    //window on load
    VV_login.windowOnLoad = {
        init: function () {
            
        }
    };
    
    //Inits
    VV_login.$document.ready(
        VV_login.documentOnReady.init
    );
    VV_login.$window.on('load',
        VV_login.windowOnLoad.init
    );

})(jQuery);
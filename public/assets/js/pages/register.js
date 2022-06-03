var VV_register = {};

(function ($) {
    "use strict";
    //

    /* ---------------------------------------------------------------------- */
    /* -------------------------- Declare Variables ------------------------- */
    /* ---------------------------------------------------------------------- */
    VV_register.$document = $(document);
    VV_register.$document_body = $(document.body);
    VV_register.$window = $(window);
    var dedouble = [];

    VV_register.isMobile = {
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
            return (VV_register.isMobile.Android() || VV_register.isMobile.BlackBerry() || VV_register.isMobile.iOS() || VV_register.isMobile.Opera() || VV_register.isMobile.Windows());
        }
    };

    VV_register.isRTL = {
        check: function () {
            if ($("html").attr("dir") == "rtl") {
                return true;
            } else {
                return false;
            }
        }
    };
    //
    VV_register.register = {
        checkLog: function (data) {
            if (data.d != "") {
                document.location.href = "/"+$("#lang").val()+"/11/Bo.html";
            } else {
                alert("Identifiants invalides...");
                return false;
            }
        },
        regisCall: function (event) {
            event.preventDefault();




            if (validForm("#register-modal")) {

      
                $("#badNetworkR").css("display", "none");
                $("#badCredR").css("display", "none");
                $("#regis_btn_submit").css("display", "none");
                $(".spinner").css("display", "");
                //var inscription_str = "37|" + $('#register_company_profile').val() + "|" + $('#register_company_nom').val() + "|" + $('#register_company_siteweb').val() + "|" + $('#register_company_telephone').val() + "|" + $('#register_company_fax').val() + "|" + $('#register_company_email').val() + "|" + $('#register_company_adresse').val() + "|" + $('#register_company_ville').val() + "|" + $('#register_company_codepostal').val() + "|" + $('#register_company_presentation').val() + "|" + $('#reg_company_contact_nom').val() + "|" + $('#reg_company_contact_prenom').val() + "|" + $('#reg_company_contact_email').val() + "|" + $('#reg_company_contact_message').val() + "|" + $('#reg_company_contact_beref').val() + "|" + $('#reg_company_contact_fonction').val() + "|" + $('#reg_company_contact_telephone').val() + "|";

                var rcname = $('#register_company_nom').val();
                var rname = $("#reg_company_contact_nom").val();
                var rsname = $('#reg_company_contact_prenom').val();
                var remail = $('#reg_company_contact_email').val();
                var rmessage = $('#reg_company_contact_message').val();
                
                $.ajax({
                    url: '/register/' + $("#lang").val() + "/" + rcname +'/' + rname + "/" + rsname + "/" + remail + "/" + rmessage,
                    success: function(data) {
                        if (data.data.status == "email used")
                        {
                            switch (data.data.code)
                            {
                                case "001": //DEJA ACTIF SUR AUTRE RESEAU
                                case "002": //EN ATTENTE VALIDATION SUR UN AUTRE RESEAU
                                    //window.location.href = "/"+$("#lang").val()+"/7_24/5dc122312ce4984551d8dd56/registered.html?caller=" + remail;
                                    break;
                            }
                            $("#badCredR").css("display", "");
                            $("#regis_btn_submit").css("display", "");
                            $(".spinner").css("display", "none");
                        }
                        else {
                            $("#regisOk").css("display", "");
                            setTimeout(function(){ window.location.href = "/"+$("#lang").val()+"/1/home.html"; }, 3000);
                        }
                    // {
                            
                        
                        //$(".invalidcredregisterloader").css("display","none");
                        //    $("button").prop('disabled', false);
                        
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        $("#badCredR").css("display", "");
                        $("#regis_btn_submit").css("display", "");
                        $(".spinner").css("display", "none");
                        console.log('error ' + textStatus + " " + errorThrown);
                    }
                });


                
            }
            //}
        },
        switchRegis: function (to) {
            var id1 = "#btRegisUsr";
            var id2 = "#btRegisEnt";
            var rcnd = "";
            if (to == 'usr') {
                id1 = "#btRegisEnt";
                id2 = "#btRegisUsr";
                var rcnd = "none";
                $("#register_company_nom").removeClass("req");
            }
            else {
                $("#register_company_nom").addClass("req");
            }

            $("#register_company_nom").css("display", rcnd);
            $(id1).removeClass("active");
            $(id2).addClass("active");

            
            

        },
        init: function () {
            $(".forgot-link").click(function () {
                
                //$("#login-modal").modal('hide');
                //$("#forgot-modal").modal();
                //$('body').css('padding-right', '0px');
            });
            
            $("#regis_btn_submit").click(VV_register.register.regisCall);
        }
    };
    //
    
    //document ready
    VV_register.documentOnReady = {
        init: function () {
            VV_register.register.init();
        }
    };
    //window on load
    VV_register.windowOnLoad = {
        init: function () {
            
        }
    };
    
    //Inits
    VV_register.$document.ready(
        VV_register.documentOnReady.init
    );
    VV_register.$window.on('load',
    VV_register.windowOnLoad.init
    );

})(jQuery);
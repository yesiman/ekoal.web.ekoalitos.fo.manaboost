var VV_global = {};


(function ($) {
    "use strict";

    VV_global.$document = $(document);
    VV_global.$document_body = $(document.body);
    VV_global.$window = $(window);
    VV_global.helper = {
        getOldProfId:function(nuid)
        {
            switch (nuid)
            {
                case "5c2c4dea07c805cd14b33488":
                    return "113";
                case "5c2c4de807c805cd14b3345c":
                    return "108";
                case "5c2c4de807c805cd14b33449":
                    return "102";
                case "5c2c4dea07c805cd14b3349f":
                    return "114";
                case "5c2c4de907c805cd14b33478":
                    return "110";
                case "5c2c4deb07c805cd14b334b4":
                    return "115";
                case "5e99ce5d1b088f21c5f20aa0":
                    return "116";
                case "5e99ce8215ad694904b5de92":
                    return "120";
                case "63886809fa24617a5dc55c41":
                    return "117";
            }
        },
        getNewProfId:function(oldid)
        {
            switch (oldid)
            {
                case "1133":
                case "113":
                    return "5c2c4dea07c805cd14b33488";
                case "108":
                    return "5c2c4de807c805cd14b3345c";
                case "1022":
                case "102":
                    return "5c2c4de807c805cd14b33449";
                case "114":
                    return "5c2c4dea07c805cd14b3349f";
                case "110":
                    return "5c2c4de907c805cd14b33478";
                case "115":
                    return "5c2c4deb07c805cd14b334b4";
                case "116":
                    return "5e99ce5d1b088f21c5f20aa0";
                case "117":
                    return "63886809fa24617a5dc55c41";
            }
        }
    }
    //
    VV_global.init = function () {
        //MOTEUR DE RECHERCHE
        function search(e)
        {}
        //if ($(".main-search-button").length > 0)
        //{
        $('.fulltext').on('keypress', function(e) {
            var input = $(e.target);
            if(e.which == 13) {
                    e.preventDefault();
                    location.href = '/'+$("#lang").val()+'/2/108/global.html?fulltext='+$(input).val();
                    return false;
            }
        })
        $('.top_search_icon').on('click', function(e) {
            var closForm = $(this).closest("form");
            var input = $(closForm).children(".top_search_con");
            input = $(input).children(".fulltext");
            if (e.preventDefault) e.preventDefault();
            location.href = '/'+$("#lang").val()+'/2/108/global.html?fulltext='+$(input).val();
            return false;
        });
        $('#exportBowlCard').on('click', function(e) {
            var exists = EKIT_OS_HELPER.cookies.exist("bowl");
            this.items = [];
            if (exists) {
                this.items = JSON.parse(EKIT_OS_HELPER.cookies.get("bowl"));
                //LOAD FROM SERVER
                var ids = "";
                for (var reli = 0;reli < this.items.length;reli++)
                {
                    ids+=this.items[reli]._id+";";
                }
                window.open($("#lang").val()+'/bowlCardItemsExport?ids='+ids);
            };
        });
        //}
        VV_global.card.bind();
    }
    VV_global.card = {
        items:[],
        remCart: function (uid) {
            var exist = false;
            for (var reli = 0;reli < VV_global.card.items.length;reli++)
            {
                if (VV_global.card.items[reli]._id ==uid) {
                    VV_global.card.items.splice(reli,1);
                    break;
                }
            }
            document.cookie = "bowl=" + JSON.stringify(VV_global.card.items) + "; path=/";
            VV_global.card.bind();
        },
        bind:function() {
            var exists = EKIT_OS_HELPER.cookies.exist("bowl");
            this.items = [];
            if (exists) {
                this.items = JSON.parse(EKIT_OS_HELPER.cookies.get("bowl"));
                //LOAD FROM SERVER
                var ids = [];
                for (var reli = 0;reli < this.items.length;reli++)
                {
                    ids.push(this.items[reli]._id);
                }
                $.ajax({
                    url: "/" + $("#lang").val()+'/bowlCardItems/',
                    method: "POST",  
                    data: {
                        ids:ids,
                    },
                    success: function(data) {
                        $(".top_cart_con ul.top_cart_list").html("");
                        if (data.items) 
                        {
                            for (var reli = 0;reli < data.items.hits.length;reli++)
                            {
                                $(".top_cart_con ul.top_cart_list").append(
                                    `
                                    <li>
                                    <a target="_blank" href="`+data.items.hits[reli]._source.external.url+`">
                                        <img src="/mediasBowls/`+data.items.hits[reli]._source.external.origin+`/`+data.items.hits[reli]._source.external.thumbnail+`" alt="Product Name">
                                        <span class="cart_top_details">
                                        <span class="top_cart_title">`+(data.items.hits[reli]._source.meta.title?data.items.hits[reli]._source.meta.title:"Inconnu")+`</span>
                                        </span>
                                    </a>
                                    <span class="top_catt_remove" onclick="VV_global.card.remCart('`+data.items.hits[reli]._id+`')"></span>
                                    </li>
                                    `
                                )
                            }
                            $("#cart_els_cnt").text(data.items.hits.length);
                        }
                        else {
                            $("#cart_els_cnt").text(0);
                        }
                        
                    }
                });
                
                
            }
            
        }
    }
    //document ready
    VV_global.documentOnReady = {
        init: function () {
            VV_global.init();
            $(".back-to-top").on("click", function (a) {
                a.preventDefault();
                $("html, body").animate({
                    scrollTop: 0
                }, 800);
                return false;
            });
        }
    };
    //window on load
    VV_global.windowOnLoad = {
        init: function () {
            
        }
    };
    //Inits
    VV_global.$document.ready(
        VV_global.documentOnReady.init
    );
    VV_global.$window.on('load',
        VV_global.windowOnLoad.init
    );

})(jQuery);
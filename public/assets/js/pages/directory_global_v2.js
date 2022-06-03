
var VV_dir_global = {};

function moveImage(e,img)
{
    var parent = $("#"+img).parent();
    $("#"+img).css("top",(e.pageY - $(parent).offset().top) + 20);
    $("#"+img).css("left",(e.pageX - $(parent).offset().left) + 20);
}

(function ($) {
    "use strict";

    VV_dir_global.$document = $(document);
    VV_dir_global.$document_body = $(document.body);
    VV_dir_global.$window = $(window);

    VV_dir_global.bowl = {
        addCart: function (uid) {
            var exist = false;
            for (var reli = 0;reli < VV_global.card.items.length;reli++)
            {
                if (VV_global.card.items[reli]._id ==uid) {
                    exist = true;
                    break;
                }
            }
            if (!exist)
            {
                VV_global.card.items.push({
                    _id:uid,
                });
            }
            document.cookie = "bowl=" + JSON.stringify(VV_global.card.items) + "; path=/";
            VV_global.card.bind();
        }
    }
    VV_dir_global.datas = {
        load: function (target) {
            jQuery.ias().destroy();
            var idP = "102";
            
            VV_dir_global.datas.curoldid = idP;
            //if (VV_dir_global.datas.tabloaded[idP]) {return;}
            //VV_dir_global.datas.tabloaded[idP] = true;
            var idPreal = "";
            idPreal = VV_global.helper.getNewProfId(idP);
            var urll = $("#lang").val()+'/directoryres/1/' + idPreal + "/" + idP + "?fulltext=test";
            
            $.ajax({
                url: urll,
                method: "GET",
                success: function(data) {
                    $('#results').html(data);
                    
                    //$("#prof"+idP + " .badge").html(rescount);
                    var spin = '<div class="custloader"><div class="dot1"></div><div class="dot2"></div></div>';
                    
                        $(window).triggerHandler("resize");
                    
                    var ias = jQuery.ias({
                        container: "#results-" + idP,
                        item: ".blog_grid_block",
                        pagination: "#navigation-" + idP,
                        next: "#next-page-" + idP + " a",
                        loader: spin,
                        triggerPageTreshold: 3,
                        tresholdMargin: 50,
                        loaderDelay: 100,
                        trigger: "TO TRAD NEX PAGE",
                        history: false,
                        noneLeft: function () {
                            // hide new items while they are loading
                            //var $newElems = $(items).show().css({ opacity: 0 });
                            // ensure that images load before adding to masonry layout
                            //$newElems.imagesLoaded(function () {
                            // show elems now they're ready
                            //  $newElems.animate({ opacity: 1 });
                            //$('#homeModules').masonry('appended', $newElems, true);
                            //$('#anuBlocks').after($('.ias_trigger'));
                            //});
                            console.log("noneleft");
                            return true;
                        },
                        onLoadItems: function (items) {
                            //});
                            console.log("onLoadItems");
                            return true;
                        },
                        onRenderComplete: function (items) {
                            console.log("onRenderComplete");
                            //init_pic_hover();
                        },
                        onPageChange: function (pageNum, pageUrl, scrollOffset) {
                            console.log("onPageChange");
                            //$('#anuBlocks').after($('.ias_trigger'));
                            //console.log('Welcome on page ' + pageNum);
                            //init_pic_hover();
                        }
                    });
                    ias.extension(new IASSpinnerExtension({
                        html: spin, // optionally
                    }));
                    ias.extension(new IASTriggerExtension({
                        offset: 5,
                        text: "Suite"
                    }));
                }
            });
            
        }
    };
    //document ready
    VV_dir_global.documentOnReady = {
        init: function () {
            $('.search_btn').on('click', function(e) {
                //var closForm = $(this).closest("form");
                //var input = $(closForm).children(".serch_input");
                //if (e.preventDefault) e.preventDefault();
                VV_dir_global.datas.load("#prof"+VV_dir_global.datas.curoldid);
                //VV_dir_global.datas.load("#" + e.currentTarget.curoldid);
                //location.href = '/'+$("#lang").val()+'/2/'+VV_dir_global.datas.curoldid+'/global.html?fulltext='+$("#s.serch_input").val().trim();
                //return false;
            });
            VV_dir_global.datas.load("");
        }
    };
    //window on load
    VV_dir_global.windowOnLoad = {
        init: function () {
            
        }
    };
    //Inits
    VV_dir_global.$document.ready(
        VV_dir_global.documentOnReady.init
    );
    VV_dir_global.$window.on('load',
        VV_dir_global.windowOnLoad.init
    );

})(jQuery);
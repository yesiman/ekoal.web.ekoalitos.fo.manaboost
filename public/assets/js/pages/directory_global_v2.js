
var VV_dir_global = {};

function moveImage(e,img)
{
    var parent = $("#"+img).parent();
    //$("#"+img).css("top",(e.pageY - $(parent).offset().top) + 20);
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
        updateCatBowlCounts(data) {
            for (const key in data) {
                $("#b"+key.replace(/\s/g,'_1').replace(/\//g,'_2').replace(/\(/g,'_3').replace(/\)/g,'_4').replace(/\,/g,'_5')).html(data[key]);
            }
        },
        load: function (target) {
            var spin = '<div class="custloader"><div class="dot1"></div><div class="dot2"></div></div>';
            $('ul.products_filter.clearfix').html(spin);
            jQuery.ias().destroy();
            var idP = "102";
            if ($("#page").val() == "2_7") {
                //AGRITROP
                idP = "117";
            }
            
            VV_dir_global.datas.curoldid = idP;
            //if (VV_dir_global.datas.tabloaded[idP]) {return;}
            //VV_dir_global.datas.tabloaded[idP] = true;
            var idPreal = "";
            
            idPreal = VV_global.helper.getNewProfId(idP);
            var urll = $("#lang").val()+'/directoryres/1/' + idPreal + "/" + idP + "?fulltext="+$("#s.serch_input").val().trim();
            urll+=VV_dir_global.datas.getParamaVar("1");
            urll+=VV_dir_global.datas.getParamaVar("2");
            urll+=VV_dir_global.datas.getParamaVar("3");
            urll+=VV_dir_global.datas.getParamaVar("4");
            urll+=VV_dir_global.datas.getParamaVar("5");
            urll+=VV_dir_global.datas.getParamaVar("6");
            $.ajax({
                url: urll,
                method: "GET",
                success: function(data) {
                    $('ul.products_filter.clearfix').html(data);
                    if ($("#page").val() == "2_6") {
                        $("#nbRes").text(bcount + " résultats");
                    }
                    if ($("#page").val() == "2_7") {
                        $("#nbRes").text(rescount + " résultats");
                    }
                    
                    var ebci = $("#ebowlCounters").val();
                    if (ebci)
                    {
                        VV_dir_global.datas.updateCatBowlCounts(JSON.parse(ebci).sources);
                        VV_dir_global.datas.updateCatBowlCounts(JSON.parse(ebci).countries);
                        VV_dir_global.datas.updateCatBowlCounts(JSON.parse(ebci).languages);
                        VV_dir_global.datas.updateCatBowlCounts(JSON.parse(ebci).extensions);
                        VV_dir_global.datas.updateCatBowlCounts(JSON.parse(ebci).provinces);
                        VV_dir_global.datas.updateCatBowlCounts(JSON.parse(ebci).keywords);
                        
                    }

                    if ($("#page").val() == "2_7") {
                        $(".docprev img").on("error", function(e) {
                            console.log($(this).attr("alt"));
                            $(this).remove();
                        });
                    }

                    var ias = jQuery.ias({
                        container: "#results-"+idP,
                        item: ".blog_grid_block",
                        pagination: "#navigation-"+idP,
                        next: "#next-page-"+idP + " a",
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
                    ias.on('rendered',function(e){ 
                        if ($("#page").val() == "2_7") {
                            $(".docprev img").on("error", function(e) {
                                $(this).remove();
                            });
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
            
        },
        getParamaVar(catid) {
            if (!$("#param"+catid).val()) {return "";}
            var ret = "&param"+catid+"=";
            var hasParmaval = ($("#param"+catid).val().length > 1);
            /*
            if ($("#checkAll"+catid).is(":checked"))
            {
                ret+="";
            }*/
            //else {
                if (hasParmaval)
                {
                    ret+=$("#param"+catid).val();
                }
                else {
                    ret+="999";
                }
            //}
            return ret;
        }
    };
    //document ready
    VV_dir_global.documentOnReady = {
        init: function () {
            $('.bsearch_inp').on('keypress', function(e) {
                if(e.which == 13) {
                    if (e.preventDefault) e.preventDefault();
                    VV_dir_global.datas.load("#prof"+VV_dir_global.datas.curoldid);
                };
            });

            $('.bsearch_btn').on('click', function(e) {

                //var closForm = $(this).closest("form");
            //var input = $(closForm).children(".serch_input")                
                if (e.preventDefault) e.preventDefault();
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

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
                VV_global.card.items.push({_id:uid});
            }
            document.cookie = "bowl=" + JSON.stringify(VV_global.card.items) + "; path=/";
            VV_global.card.bind();
        }
    }

    VV_dir_global.init = function () {
        VV_dir_global.datas.curoldid = oldid;
        /* */
        function autocomplete(inp, arr) {
            /*the autocomplete function takes two arguments,
            the text field element and an array of possible autocompleted values:*/
            var currentFocus;
            /*execute a function when someone writes in the text field:*/
            inp.addEventListener("input", function(e) {
                var a, b, i, val = this.value;
                /*close any already open lists of autocompleted values*/
                closeAllLists();
                if (!val) { return false;}
                currentFocus = -1;
                /*create a DIV element that will contain the items (values):*/
                a = document.createElement("DIV");
                a.setAttribute("id", this.id + "autocomplete-list");
                a.setAttribute("class", "autocomplete-items");
                /*append the DIV element as a child of the autocomplete container:*/
                this.parentNode.appendChild(a);
                /*for each item in the array...*/


                $( "[data-content=pc"+VV_dir_global.datas.curoldid+"] [id^=categ]" ).each(function( index ) {
                    var cid =  $(this).attr("id").replace("categ","");
                    var txt =  $(this).children("li a").text().trim();
                    if (txt.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                        /*create a DIV element for each matching element:*/
                        b = document.createElement("DIV");
                        /*make the matching letters bold:*/
                        b.innerHTML = "<strong>" + txt.substr(0, val.length) + "</strong>";
                        b.innerHTML += txt.substr(val.length);
                        /*insert a input field that will hold the current array item's value:*/
                        b.innerHTML += "<input type='hidden' value='" + txt + "'>";
                        /*execute a function when someone clicks on the item value (DIV element):*/
                            b.addEventListener("click", function(e) {
                            /*insert the value for the autocomplete text field:*/
                            inp.value = "";
                            var comp = "[data-content=pc"+VV_dir_global.datas.curoldid+"] #categ" + cid + " a";
                            $(comp).first().trigger("click");
                            /*close the list of autocompleted values,
                            (or any other open lists of autocompleted values:*/
                            closeAllLists();
                        });
                        a.appendChild(b);
                      }
                });
                
            });
            /*execute a function presses a key on the keyboard:*/
            inp.addEventListener("keydown", function(e) {
                var x = document.getElementById(this.id + "autocomplete-list");
                if (x) x = x.getElementsByTagName("div");
                if (e.keyCode == 40) {
                  /*If the arrow DOWN key is pressed,
                  increase the currentFocus variable:*/
                  currentFocus++;
                  /*and and make the current item more visible:*/
                  addActive(x);
                } else if (e.keyCode == 38) { //up
                  /*If the arrow UP key is pressed,
                  decrease the currentFocus variable:*/
                  currentFocus--;
                  /*and and make the current item more visible:*/
                  addActive(x);
                } else if (e.keyCode == 13) {
                  /*If the ENTER key is pressed, prevent the form from being submitted,*/
                  
                  //if (currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    //if (x) x[currentFocus].click();
                  //}
                
                if (e.preventDefault) e.preventDefault();
                  //location.href = '/'+$("#lang").val()+'/2/'+VV_dir_global.datas.curoldid+'/global.html?fulltext='+$("#s.serch_input").val().trim();
                  VV_dir_global.datas.load("#prof"+VV_dir_global.datas.curoldid);
                  return false;
                }
            });
            function addActive(x) {
              /*a function to classify an item as "active":*/
              if (!x) return false;
              /*start by removing the "active" class on all items:*/
              removeActive(x);
              if (currentFocus >= x.length) currentFocus = 0;
              if (currentFocus < 0) currentFocus = (x.length - 1);
              /*add class "autocomplete-active":*/
              x[currentFocus].classList.add("autocomplete-active");
            }
            function removeActive(x) {
              /*a function to remove the "active" class from all autocomplete items:*/
              for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
              }
            }
            function closeAllLists(elmnt) {
              /*close all autocomplete lists in the document,
              except the one passed as an argument:*/
              var x = document.getElementsByClassName("autocomplete-items");
              for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
              }
            }
          }
          /*execute a function when someone clicks in the document:*/
          document.addEventListener("click", function (e) {
              closeAllLists(e.target);
          });
        }
        autocomplete(document.getElementById("s"), ["test","retest"]);
        /*$('.serch_input').on('keypress', function(e) {
            var input = $(e.target);
            if(e.which == 13) {
                e.preventDefault();
                location.href = '/'+$("#lang").val()+'/2/108/global.html?fulltext='+$(input).val();
                return false;
            }
        })*/
        $('#linem').on('click', function(e) {
            $("#listm").removeClass("active");
            $("#linem").addClass("active");
            VV_dir_global.datas.load("#prof"+VV_dir_global.datas.curoldid);
        });
        $('#listm').on('click', function(e) {
            $("#linem").removeClass("active");
            $("#listm").addClass("active");
            VV_dir_global.datas.load("#prof"+VV_dir_global.datas.curoldid);
        });

        
        $('#btFiltersMore').on('click', function(e) {
            //var closForm = $(this).closest("form");
            //var input = $(closForm).children(".serch_input");
            if (e.preventDefault) e.preventDefault();
            VV_dir_global.datas.load("#prof"+VV_dir_global.datas.curoldid);
            //VV_dir_global.datas.load("#" + e.currentTarget.curoldid);
            //location.href = '/'+$("#lang").val()+'/2/'+VV_dir_global.datas.curoldid+'/global.html?fulltext='+$("#s.serch_input").val().trim();
            //return false;
        });
        $('.search_btn').on('click', function(e) {
            //var closForm = $(this).closest("form");
            //var input = $(closForm).children(".serch_input");
            if (e.preventDefault) e.preventDefault();
            VV_dir_global.datas.load("#prof"+VV_dir_global.datas.curoldid);
            //VV_dir_global.datas.load("#" + e.currentTarget.curoldid);
            //location.href = '/'+$("#lang").val()+'/2/'+VV_dir_global.datas.curoldid+'/global.html?fulltext='+$("#s.serch_input").val().trim();
            //return false;
        });
        $(".tabs-navi li").click(function (e) {
            VV_dir_global.datas.load("#" + e.currentTarget.id);
        });
        VV_dir_global.datas.load("#prof"+VV_dir_global.datas.curoldid);
    }
    VV_dir_global.datas = {
        curoldid:"108",
        tabloaded:{},
        updateCatBowlCounts(data) {
            for (const key in data) {
                $("#b"+key.replace(/\s/g,'__')).html(data[key]);
            }
        },
        getParamaVar(catid) {
            var ret = "&param"+catid+"=";
            var hasParmaval = ($("#param"+catid).val().length > 3);
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
        },
        load: function (target) {
            jQuery.ias().destroy();
            var idP = target.replace("#prof", "");
            var spin = '<div class="custloader"><div class="dot1"></div><div class="dot2"></div></div>';
            $('#is-container-' + idP).html(spin);
            VV_dir_global.datas.curoldid = idP;
            //if (VV_dir_global.datas.tabloaded[idP]) {return;}
            VV_dir_global.datas.tabloaded[idP] = true;
            var idPreal = "";
            idPreal = VV_global.helper.getNewProfId(idP);
            var urll = "/" + $("#lang").val()+'/directoryres/1/' + idPreal + "/" + idP + "?fulltext="+$("#s.serch_input").val().trim();
            urll+=VV_dir_global.datas.getParamaVar("1");
            urll+=VV_dir_global.datas.getParamaVar("2");
            urll+=VV_dir_global.datas.getParamaVar("3");
            urll+=VV_dir_global.datas.getParamaVar("4");
            urll+=VV_dir_global.datas.getParamaVar("5");
            urll+=VV_dir_global.datas.getParamaVar("6");
            urll+=VV_dir_global.datas.getParamaVar("7");
            urll+=VV_dir_global.datas.getParamaVar("8");


            /*urll+=VV_dir_global.datas.getParamaVar("20");
            urll+=VV_dir_global.datas.getParamaVar("21");
            urll+=VV_dir_global.datas.getParamaVar("22");
            urll+=VV_dir_global.datas.getParamaVar("23");
            urll+=VV_dir_global.datas.getParamaVar("24");
            urll+=VV_dir_global.datas.getParamaVar("25");*/



            urll+=("&mode="+($("#linem").hasClass("active")?"1":"2"))

            urll+="&pub="+$("#inpPublishers").val();
            $.ajax({
                url: urll,
                method: "GET",  
                success: function(data) {
                    $('#is-container-' + idP).html(data);
                    $("#prof"+idP + " .badge").html(rescount);
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
                    
                    $(window).triggerHandler("resize");
                    var iass_container = "#results-" + idP;
                    var iass_item = ".blog_grid_block";
                    switch (idP)
                    {
                        case "102":
                            //iass_item = "li"
                            break;
                    }
                    var ias = jQuery.ias({
                        container:iass_container,
                        item: iass_item,
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
            VV_dir_global.init();
            $("#menu-toggle").click(function(e) {
                e.preventDefault();
                $("#sidebar-wrapper").toggleClass("active");
            });
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
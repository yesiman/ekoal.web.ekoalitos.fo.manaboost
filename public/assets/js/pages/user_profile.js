var OCP_uprofile = {
        projectuid:"5b693ec2c60bb31400d7ad3c",
        protouid:"5c4e8f86d947cf00040725b0",
        fieldsuids:{
                title:"5b5ea8fd0311784a87b6dc0a",
                starts:"5b5ea9200311784a87b6dc52",
                ends:"5b5ea9200311784a87b6dc54",
                desc:"5b694ca4c60bb31400d7ad6b", 
                members:"5c4e94bfd947cf000407262a"
        }
    };
    (function ($) {
        "use strict";
        //
        OCP_uprofile.$document = $(document);
        OCP_uprofile.$document_body = $(document.body);
        OCP_uprofile.$window = $(window);
        //
        OCP_uprofile.tabs = {
                profile:{
                    relatsToRem:[],
                    relatsToAdd:[],
                    updateProp:function(propLib,propVal) {
                            $.ajax({
                                    url: '/profile/addProp/',
                                    method: "POST",
                                    data:{
                                            propLib:propLib,
                                            propVal:propVal
                                    },
                                    success: function(data) {
                                    },
                                    error: function(jqXHR, textStatus, errorThrown) {
                                            console.log('error ' + textStatus + " " + errorThrown);
                                    }
                            });
                    },
                    /*initSel2:function(el,proto) {
                            var initval = ($(el).attr("value")?JSON.parse($(el).attr("value")):"");
                            let sel2datas= {
                                    ajax: {
                                    url: '/objects/'+$("#lang").val()+'/1/20/',
                                    type: "post",
                                    data: function (params) {
                                            var q = {
                                            filters:{
                                                    public:true,
                                                    onlyTitleCol:true,
                                                    proto:proto,project:puid},
                                            forcepage:(params.page || 1)
                                            }
                                            if (params.term)
                                            {
                                            q.filters.text = params.term;
                                            }
                                            return q;
                                    },
                                    processResults: function (data, params) {
                                            params.page = params.page || 1;
                                            var res = [];
                                            var items = JSON.parse(data.data).items;
                                            for(var o in items)
                                            {
                                            res.push({id:items[o]._id,text:items[o].title,});
                                            }
                                            return {
                                            results: res,
                                            pagination: {
                                            more: (params.page * 20) < JSON.parse(data.data).count
                                            }
                                            };
                                    }
                                    }
                            };
                            
                            $(el).select2(sel2datas);
                            if (initval.length > 0)
                            {
                                    $.ajax({
                                            url: '/objects/'+$("#lang").val()+'/1/1000/',
                                            method: "POST",
                                            data:{
                                                filters:{public:true,ids:initval,onlyTitleCol:true,proto:proto,project:puid}
                                            },
                                            success: function(data) {
                                                    
                                                    var items = JSON.parse(data.data).items;
                                                    for(var o in items)
                                                    {
                                                            $(el).append(
                                                                    new Option(items[o].title, items[o]._id, true, true)
                                                            ).trigger('change');
                                                            
                                                    }
                                            },
                                            error: function(jqXHR, textStatus, errorThrown) {
                                                console.log('error ' + textStatus + " " + errorThrown);
                                            }
                                    });
                                                
                            }
                            $(el).on('select2:select', function(e){
                                    var id = e.params.data.id;
                                    var option = $(e.target).children('[value='+id+']');
                                    option.detach();
                                    $(e.target).append(option).change();
                                    for (var i = 0;i < OCP_uprofile.tabs.profile.relatsToRem.length;i++)
                                    {
                                        if ((OCP_uprofile.tabs.profile.relatsToRem[i].relatEntUid == id) && (OCP_uprofile.tabs.profile.relatsToRem[i].relatPropUid == "60defca3b6cc42586e64b5c3"))        
                                        {
                                            OCP_uprofile.tabs.profile.relatsToRem.splice(i,1);
                                            break;
                                        }
                                    }
        
                                    //var optionrs = $('#relatsselector option[value='+$(sel2).attr("name").substring(1)+']');
                                            OCP_uprofile.tabs.profile.relatsToAdd.push({
                                                    thisEntUid:userid,
                                                    relatEntUid:id,
                                                    relatPropUid:"60defca3b6cc42586e64b5c3"
                                        });
                                  });
                                  $(el).on('select2:unselect', function(e){
                                    var id = e.params.data.id;
                                    var option = $(e.target).children('[value='+id+']');
                                    //var optionrs = $('#relatsselector option[value='+$(sel2).attr("name").substring(1)+']');
                                    option.detach();
                                    $(e.target).append(option).change();
                                    for (var i = 0;i < OCP_uprofile.tabs.profile.relatsToAdd.length;i++)
                                    {
                                    if ((OCP_uprofile.tabs.profile.relatsToAdd[i].relatEntUid == id) && (OCP_uprofile.tabs.profile.relatsToAdd[i].relatPropUid == "60defca3b6cc42586e64b5c3"))    
                                    {
                                            OCP_uprofile.tabs.profile.relatsToAdd.splice(i,1);
                                            break;
                                    }
                                    }
                                    OCP_uprofile.tabs.profile.relatsToRem.push({
                                    thisEntUid:userid,
                                    relatEntUid:id,
                                    relatPropUid:"60defca3b6cc42586e64b5c3"
                                    });
                                  });
                    },*/
                        init:function() {
                            //$(".select2-multiple").select2();
                            $( "#showPass" ).mousedown(function() {
                                    var x = document.getElementById("profPass");
                                    x.type = "text";
                            });
                            $( "#showPass" ).mouseup(function() {
                                    var x = document.getElementById("profPass");
                                    x.type = "password";
                            });
                            $( "#showPass" ).mouseout(function() {
                                    var x = document.getElementById("profPass");
                                    x.type = "password";
                            });
    
                            //OCP_uprofile.tabs.profile.initSel2("#s2actors","5c2c4de807c805cd14b3345c");
                            //OCP_uprofile.tabs.profile.initSel2("#s2projects","5c2c4dea07c805cd14b33488");
                            //OCP_uprofile.tabs.profile.initSel2("#s2docs","5c2c4de807c805cd14b33449");
    
                            $('#profilImg').change(function(){
                                    $(".profil-image-container").addClass("upload");
                                    $("#profilImgLoader").css("display","");
                                    var file = document.getElementById('profilImg').files[0];
                                    
                                    //ON RETIRE LEXTENSION
                                    //file.name.in et rempmlce nom par id user
                    
                    
                                    var filenameText = file.name.replace(/\.[^/.]+$/, "");
                                    var filext = (file.name.replace(filenameText,""));
    
                                    var guid = EKIT_OS_HELPER.datas.generateUUID();
                                    var filename = userid + filext;
                                    //
                                    let t = this;
                                    
                                    
                                    EKIT_OS_HELPER.medias.upload(filenameText,filename,file,$("#lang").val(),
                                        function(data) {
                                                
                                                //ONPRIGRESS
                                        },function(data)
                                        {
                                            $(".profil-image-container").removeClass("upload");
                                            $("#profilImgLoader").css("display","none");
                                            OCP_uprofile.tabs.profile.updateProp("avatarext",filext);
                                            location.reload();
                                        });
                            
                                    });
                                    $('.profil-image-container').click(function(e){
                                            
                                            $("#profilImg").trigger("click");
                                    });
                                    $('#btUnregisProfile').on('click', function(e) {
                                            swal(trads.verifyMsg, {
                                                    buttons: {
                                                            ok:trads.yes,
                                                            cancel:trads.no
                                                            },
                                                    })
                                                    .then((value) => {
                                                    switch (value) {
                                                            case "ok":
                                                                    $.ajax({
                                                                            url: '/users/unregister/',
                                                                            method: "POST",
                                                                            data:{
                                                                                  uid:userid
                                                                            },
                                                                            success: function(data) {
                                                                                    //LOGOUT
                                                                                    //REFRESH
                                                                                    location.href = '/logout/'+$("#lang").val();
                                                                            },
                                                                            error: function(jqXHR, textStatus, errorThrown) {
                                                                                    console.log('error ' + textStatus + " " + errorThrown);
                                                                            }
                                                                    });
                                                            break;   
                                                            default:
                                                            //swal("Got away safely!");
                                                    }
                                            });
    
    
    
                                            
                                    });
                                $('#btSubProfile').on('click', function(e) {
                                        
                                        var eName = !EKIT_OS_HELPER.validation.validate($("#profName"));
                                        var eMail = !EKIT_OS_HELPER.validation.validate($("#profMail"));
                                        var ePass = !EKIT_OS_HELPER.validation.validate($("#profPass"));
                                        var error = (eName || eMail || ePass);
    
                                        if (error)
                                        {
    
                                        }
                                        else {
                                            var dtaa = $("#s2actors").select2("data");
                                            var dtap = $("#s2projects").select2("data");
                                            var dtad = $("#s2docs").select2("data");
                                            var ardta = [];
                                            for (var o in dtaa)
                                            {
                                                    ardta.push(dtaa[o].id);
                                            }
                                            for (var o in dtap)
                                            {
                                                    ardta.push(dtap[o].id);
                                            }
                                            for (var o in dtad)
                                            {
                                                    ardta.push(dtad[o].id);
                                            }
            
            
                                                
                                                $("button").prop('disabled', true);
                                                $("#profileloader").css("display","");
                                                var user = {
                                                        name:$("#profName").val(),
                                                        surn:$("#profSurn").val(),
                                                        job:$("#s2job").val(),
                                                        mail:$("#profMail").val(),
                                                        pres:$("#profMessage").val(),
                                                        facebook:$("#profFbk").val(),
                                                        linkedin:$("#profLinkedin").val(),
                                                        twitter:$("#profTwitter").val(),
                                                        publicProfile:$("#ch-ppublic").parent().parent().hasClass('checked'),
                                                        p60defca3b6cc42586e64b5c3:ardta
    
                                                        
                                                };
                                                user["credentials.login"] = $("#profMail").val();
                                                user["credentials.pass"] = $("#profPass").val();
                                                $.ajax({
                                                        url: '/profile/update/',
                                                        method: "POST",
                                                        data:{
                                                                user:user,
                                                                relatsToAdd:OCP_uprofile.tabs.profile.relatsToAdd,
                                                                relatsToRem:OCP_uprofile.tabs.profile.relatsToRem
                                                        },
                                                        success: function(data) {
                                                                //alert(propLib+"="+propVal);
                                                                $("button").prop('disabled', true);
                                                                $("#profileloader").css("display","none");
                                                                window.location.reload();
                                                        },
                                                        error: function(jqXHR, textStatus, errorThrown) {
                                                                $("button").prop('disabled', true);
                                                                $("#profileloader").css("display","none");
                                                                console.log('error ' + textStatus + " " + errorThrown);
                                                        }
                                                });
                                        }
                                })
                        }
                },
    
                /*$.ajax({
                        url: '/collaborators/find/' + this.curPage + "/10/" + $("#collabsfilter").val() + "/true",
                        success: function(data) {
                            var items = JSON.parse(data.data).items;
                            $("#rightstable tbody").empty();
                            if (items)
                            {
                                if (items.length <= 0) {
                                    //lastPage = true;
                                }
                                else {
                                    for(var o in items)
                                    {
                                        var collab = EKIT_OS.object_modal.collaborators.getCollabRules(items[o]._id);
                                        var html = "<tr id='trc"+ items[o]._id +"' disabled><td>"+items[o].surname+" " + items[o].name+"</td>";
                                        html += "<td><input type='checkbox' " + (collab && EKIT_OS.helper.isTrue(collab.rules.read)?"checked":"") + " class='check cic chread' disabled></td>";
                                        html += "<td><input type='checkbox' " + (collab && EKIT_OS.helper.isTrue(collab.rules.edit)?"checked":"") + " class='check cic chedit' disabled></td>";
                                        html += "<td><input type='checkbox' " + (collab && EKIT_OS.helper.isTrue(collab.rules.del)?"checked":"") + " class='check cic chdel' disabled></td>";
                                        html += "<td><input type='checkbox' " + (collab && EKIT_OS.helper.isTrue(collab.rules.share)?"checked":"") + " class='check cic chshare' disabled></td>";
                                        
                                        html += "<td class='text-nowrap'><a href='javascript:void(0)' class='btedit' onclick='EKIT_OS.object_modal.collaborators.editRow(this);' data-toggle='tooltip' data-original-title='Edit'><i class='fa fa-pencil text-inverse m-r-10'></i></a>";
                                        html += "<a href='javascript:void(0)' data-toggle='tooltip' class='btvalid' onclick='EKIT_OS.object_modal.collaborators.editRow(this);' style='display:none;' data-original-title='Valid'><i class='fa fa-check text-success'></i></a></td>";    
                                        html += "<a href='javascript:void(0)' data-toggle='tooltip' class='btvalid' onclick='EKIT_OS.object_modal.collaborators.editRow(this);' style='display:none;' data-original-title='Valid'><i class='fa fa-check text-success'></i></a></td></tr>";    
                                        $("#rightstable tbody").append(html);
                                    }   
                                    $('input.check.cic').iCheck({radioClass: 'iradio_square-green',checkboxClass: 'icheckbox_flat-green'});
                                }
                            }
                        }
                    });*/
    
    
                projects:{
                        curProject:-1,
                        toRemove:[],
                        init:function() {
                                $('#prjmembers').select2({
                                        multiple:true,
                                        ajax: {
                                                url: function (params) {
                                                        return '/collaborators/find/1/1000/' + params.term + "/true";
                                                },
                                                processResults: function (data) {
                                                        var ret = [];
                                                        
                                                        var rdata = JSON.parse(data.data);
                                                        for (var o in rdata.items)
                                                        {
                                                                var nuo = {
                                                                        id:rdata.items[o]._id,
                                                                        text:rdata.items[o].name,
                                                                };
                                                                ret.push(nuo);
                                                        }
    
                                                        return {
                                                                results: ret
                                                        };
                                                },
                                                dataType: 'json'
                                                // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
                                        }
                                });
                                $('#prjmembers').on('select2:unselect', function (e) {
                                        OCP_uprofile.tabs.projects.toRemove.push(e.params.data.id);
                                });
                                $('#btnAddPrj').on('click', function(e) {
                                        this.curProject = -1;
                                        OCP_uprofile.tabs.projects.toRemove = [];
                                        $('#prjmembers').val(null).trigger('change');
                                        $("#projectDetail").css("display","");
                                });
                                $('#btnCancel').on('click', function(e) {
                                        this.curProject = -1;
                                        OCP_uprofile.tabs.projects.toRemove = [];
                                        $('#prjmembers').val(null).trigger('change');
                                        $("#projectDetail").css("display","none");
                                });
                                $('#btnValid').on('click', function(e) {
                                        OCP_uprofile.tabs.projects.valid();
                                });
                                $('.mydatepicker').bootstrapMaterialDatePicker({ weekStart: 0, time: false });
                                
                        },
                        edit:function(uid) {
                                this.curProject = uid;
                                function onload(data)
                                {
                                        if (data)
                                        {
                                                $("#prjtit").val(data.version.p5b5ea8fd0311784a87b6dc0a);
                                                $("#prjfrom").val(data.version.p5b5ea9200311784a87b6dc52);
                                                $("#prjto").val(data.version.p5b5ea9200311784a87b6dc54);
                                                $("#prjdesc").val(data.version.p5b694ca4c60bb31400d7ad6b);
                                                $("#prjmembers").val(data.version.p5c4e94bfd947cf000407262a);
                                        }
                                        else {
                                                $("#prjtit").val("");
                                                $("#prjfrom").val("");
                                                $("#prjto").val("");
                                                $("#prjdesc").val("");
                                                $("#prjmembers").val("");
                                        }
                                        $("#projectDetail").css("display",""); 
                                        if (data.version.p5c4e94bfd947cf000407262a && (data.version.p5c4e94bfd947cf000407262a.length > 0))
                                        {
                                                $.ajax({
                                                        url:'/collaborators/find/1/1000/true',
                                                        method: "POST",
                                                        data: {
                                                                ids:data.version.p5c4e94bfd947cf000407262a
                                                        },
                                                        success: function(data) {
                                                                var dtas = JSON.parse(data.data).items;
                                                                for(var d in dtas){
                                                                        var option = new Option(dtas[d].name, dtas[d]._id, true, true);
                                                                        $("#prjmembers").append(option).trigger('change');
                                                                }
                                                        },
                                                        error: function(jqXHR, textStatus, errorThrown) {
                                                        
                                                        console.log('error ' + textStatus + " " + errorThrown);
                                                        }
                                                });     
                                        }
                                          
                                }
                                EKIT_OS_HELPER.datas.get("objects",uid,onload);
                        },
                        valid:function() {
                                var eTit = !EKIT_OS_HELPER.validation.validate($("#prjtit"));
                                var eDesc = !EKIT_OS_HELPER.validation.validate($("#prjdesc"));
                                var error = (eTit || eDesc);
                                
                                if (error)
                                {}
                                else {
                                        $("button").prop('disabled', true);
                                        $("#projectLoader").css("display","");
                                        var users = $("#prjmembers").select2("data");
                                        var usersIds = [];
                                        var usersRules = [];
                                        //RECUP IDS MEMBERS
                                        for(var c in users)
                                        {
                                                usersIds.push(users[c].id);
                                                usersRules.push({
                                                        uid:users[c].id,
                                                        rules: {
                                                                read:"true",
                                                                edit:"false",
                                                                del:"false",
                                                                share:"false",
                                                                rights:"false"
                                                        }
                                                });
                                        }
                                        for(var c in OCP_uprofile.tabs.projects.toRemove)
                                        {
                                                usersRules.push({
                                                        uid:OCP_uprofile.tabs.projects.toRemove[c],
                                                        rules: {
                                                                read:"false",
                                                                edit:"false",
                                                                del:"false",
                                                                share:"false",
                                                                rights:"false"
                                                        }
                                                });
                                        }
                                        var item = {
                                                projects: ["5b693ec2c60bb31400d7ad3c"],
                                                curProject: "5b693ec2c60bb31400d7ad3c",
                                                proto: ["5c4e8f86d947cf00040725b0"],
                                                curProto:"5c4e8f86d947cf00040725b0",
                                                version:{
                                                        p5b5ea8fd0311784a87b6dc0a:$("#prjtit").val(),
                                                        p5b5ea9200311784a87b6dc52:$("#prjfrom").val(),
                                                        p5b5ea9200311784a87b6dc54:$("#prjto").val(),
                                                        p5b694ca4c60bb31400d7ad6b:$("#prjdesc").val(),
                                                        p5c4e94bfd947cf000407262a:usersIds
                                                }
                                        };
                                        
                                        if (this.curProject != -1)
                                        {
                                                item._id = 
                                                        item.version.objectid = this.curProject;
                                        }
                                        $.ajax({
                                                url: '/objects/add/en/',
                                                method: "POST",
                                                data: item,
                                                success: function(data) {
                                                        //AJOUTE/REMOVE DES DROITS DES MEMBRES
                                                        $.ajax({
                                                                url: '/rules/add/objects/' + JSON.parse(data.data).updatedUid,
                                                                method: "POST",
                                                                data: {
                                                                        collab:usersRules,
                                                                        subs:false
                                                                },
                                                                success: function(data) {
                                                                        
                                                                        //RELOAD
                                                                        this.curProject = -1;
                                                                        OCP_uprofile.tabs.projects.toRemove = [];
                                                                        $('#prjmembers').val(null).trigger('change');
                                                                        $("#projectDetail").css("display","none"); 
                                                                        $("button").prop('disabled', false);
                                                                        $("#projectLoader").css("display","none");
                                                                        //window.location.reload();
                                                                        //TODO RELOAD PROJECTS UNIQUE
                                                                },
                                                                error: function(jqXHR, textStatus, errorThrown) {
                                                                $("button").prop('disabled', false);
                                                                $("#projectLoader").css("display","none"); 
                                                                //$("#modalloader").css("display","none");
                                                                //OCP_dashboard.pubs.loader.hide();
                                                                console.log('error ' + textStatus + " " + errorThrown);
                                                                }
                                                        });
                                                        
                                                        
                                                        
                                                },
                                                error: function(jqXHR, textStatus, errorThrown) {
                                                $("button").prop('disabled', false);
                                                $("#projectLoader").css("display","none"); 
                                                //$("#modalloader").css("display","none");
                                                //OCP_dashboard.pubs.loader.hide();
                                                console.log('error ' + textStatus + " " + errorThrown);
                                                }
                                        });
                                }
                                
                        }
                }
        },
        
        //document ready
        OCP_uprofile.documentOnReady = {
                init: function () {
                        OCP_uprofile.tabs.profile.init();
                        OCP_uprofile.tabs.projects.init();
                }
        };
        //window on load
        OCP_uprofile.windowOnLoad = {
                init: function () {
                        
                }
        };
        //OCP_dashboard
        OCP_uprofile.$document.ready(
                OCP_uprofile.documentOnReady.init()
        );
        OCP_uprofile.$window.on('load',
                OCP_uprofile.windowOnLoad.init()
        );
    })(jQuery);
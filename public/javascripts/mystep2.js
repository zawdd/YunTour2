//function 工具函数
var toggleFooterButton = function () {
    if ($(".input-changed").length == 0) {
        $("#footerbtn-savechange, #footerbtn-discardchange").hide();
        $("#footer-inside .large-button-action-next").show();
    } else {
        $("#footerbtn-savechange, #footerbtn-discardchange").show();
        $("#footer-inside .large-button-action-next").hide();
    }
}
var initTrackChange=function(){
    $(".track-change").each(function(n,t){
        var i=$(t).attr("type")=="checkbox"?$(t).is(":checked"):$(t).val();
        $(t).data("initval",i),
        $(t).unbind("change.tracking"),
        $(t).bind("change.tracking",function(){
            var i=$(t).attr("type")=="checkbox"?$(t).is(":checked"):$(t).val();i!=$(t).data("initval")?$(this).addClass("input-changed"):
            $(this).removeClass("input-changed"),toggleFooterButton()}),
            $(t).attr("type")!="hidden"&&$(t).attr("type")!="checkbox"&&($(t).unbind("keyup.tracking"),
            $(t).bind("keyup.tracking", function(){
                $(this).val()!=$(t).data("initval")?$(this).addClass("input-changed"):$(this).removeClass("input-changed"),toggleFooterButton()
            })
    )});
    $("#footerbtn-savechange, #footerbtn-discardchange").hide();
    $("#footer-inside .large-button-action-next").show();
}
var checkChanges = function(){
    if ($(".input-changed").length > 0)
        return true;
}
var setUnloadWarning = function () {
    $(window).bind('beforeunload', function () {
        if (checkChanges())
            return "You have unsaved changes";
    });
}
var unsetUnloadWaring = function(){
    $(window).unbind('beforeunload');
}
var initBlackBar = function(){
    if( $("#sortableCheckboxFromList").length > 0 && $("#sortableCheckboxFromList").children().length > 0 ){
        var index = $("#sortableCheckboxFromList")[0].selectedIndex; 
        if(index == 0){
            $(".bb-prev").addClass("bb-disabled");
        }else{
            $(".bb-prev").removeClass("bb-disabled");
        }

        if(index == $("#sortableCheckboxFromList").children().length - 1){
            $(".bb-next").addClass("bb-disabled");
        }else{
            $(".bb-next").removeClass("bb-disabled");
        }

        if($("#StopID").val() == 0){
            $(".bb-delete, .bb-reorder").addClass("bb-del-disabled");
        }else{
            $(".bb-delete").removeClass("bb-del-disabled");
            if($("#sortableCheckboxFromList").children().length > 1){
                $(".bb-reorder").removeClass("bb-del-disabled");
            }else{
                $(".bb-reorder").addClass("bb-del-disabled");
            }
        }
    }else{
        $(".bb-prev, .bb-next").addClass("bb-disabled");
        $(".bb-delete, .bb-reorder").addClass("bb-del-disabled");
    }
}
var setNoStopState = function(){
    $("#sortableCheckboxFromList").selectBox("destroy");
    $("#stop-container, #re-list-container, #sortableCheckboxFromList").empty();
    $(".bb-delete,#launch-reorder").addClass("bb-del-disabled"); 
    $("#button-savechange, #button-discardchange, #sortableCheckboxFromList").hide();
    $("#button-addnewstop, .add-stop-arrow, .nostops").show();
}
//添加SelectBox    
var reorderSelectBoxFromList = function() {
    var n;
    $("#sortableCheckboxFromList").children().length > 0 && (n = $("#sortableCheckboxFromList").selectBox("value")),
    $("#sortableCheckboxFromList").selectBox("destroy").empty(),
    $("#sortableListToCheckbox li a").each(function(t) {
        var i = $(this).data("name");
        $("#sortableCheckboxFromList").append($("<option />").attr("value", $(this).attr("rel")).append(t + 1 + ". " + i)),
        $("#sortableCheckboxFromList").children().filter("[value=" + n + "]").attr("selected", "selected"),
        $(this).html(t + 1 + ". " + i)
    }),
    $("#sortableCheckboxFromList").selectBox().bind("open",function() {})
}

///initReorder
function initReorder() {
    reorderSelectBoxFromList(),
    $("#sortableListToCheckbox").sortable({
        stop: function() {}
    }).disableSelection()
}

$(document).ready(function() {
	initReorder(),
	$("#file_upload1").uploadify({   
        'swf' : '/uploadify.swf',
        'uploader' : '/uploadhandler',
        'fileTypeExts' : '*.gif; *.jpg; *.png; *.jpeg',
        'buttonText' : '请选择图片',
        'removeCompleted' : false,
        'multi' : true,
        'onUploadSuccess' : function(file, data, response){ /////////////////////////////请在onComplete函数里将cover-img修改
        var imgPath = JSON.parse(data).uploadFileName;
		$("#thumb-container").attr("style", "background-repeat:no-repeat; background-image:url("+ imgPath +"); background-size: 144px; background-position:center;");
		$(".images-list li:first").find("img").attr("src", imgPath);
<<<<<<< HEAD
		$("#stopthumbnail").val(imgPath).trigger("change");
=======
		$("#stopthumbnail").attr("value", imgPath);
>>>>>>> 30623feb1a160ec6f9b1b16e10110de67a1c8be1
        }
    });
    
    $('#file_upload2').uploadify({
        'swf' : '/uploadify.swf',
        'uploader' : '/uploadhandler',
        // Your options here
        'fileTypeExts' : '*.gif; *.jpg; *.png, *.jpeg',
        'buttonText' : '请选择图片',
        'removeCompleted' : false,
        'multi' : true,
        'itemTemplate' : '<div></div>',
		'onUploadSuccess' : function(file, data, response) { /////////////////////////////请在onComplete函数里将cover-img修改
        	var imgPath = JSON.parse(data).uploadFileName;
        	var cloneLi = $(".images-list li:first").clone();
        	cloneLi.find("img").attr("src", imgPath);
        	$(".images-list").append(cloneLi);
<<<<<<< HEAD
					var str = $("#stopimages").val();
					str = str + imgPath + ",";
	        //英文的逗号	
					$("#stopimages").attr("value", str).trigger("change");
		
			}	    
    });
		$("#footerbtn-discardchange").click(function (e) {
			$(".input-changed").each(function (index) {
          $(this).val($(this).data("initval"));
          $(this).removeClass("input-changed");
      });

			var coverPath = $("stopthumbnail").data();
      $("#cover-img").attr("src", coverPath);
        
      toggleFooterButton();
      e.preventDefault();
		});
    $("#footerbtn-savechange").bind("click", function (e) {
	    
       $(window).unbind('beforeunload');//////////////清除之前为了track-change，会重新bind
=======
		var str = $("#stopimages").val();
		str = str + imgPath + ",";
	        //英文的逗号	
		$("#stopimages").attr("value", str);
		
	}	    
    });
    $("#footerbtn-savechange").bind("click", function (e) {
	    
       //$(window).unbind('beforeunload');//////////////清除之前为了track-change，会重新bind
>>>>>>> 30623feb1a160ec6f9b1b16e10110de67a1c8be1
       $('#stop-form').trigger('submit');/////////////trigger(submit)
       //toggleFooterButton();//////////////////////////底部button变
       //e.preventDefault();
    });

    $("#file_upload3").uploadify({   
        'swf' : '/uploadify.swf',
        'uploader' : '/uploadhandler',
        'fileTypeExts' : '*.mp3',
        'buttonText' : '请选择mp3	',
        'removeCompleted' : false,
        'multi' : true,
<<<<<<< HEAD
				'onUploadSuccess' : function(file, data, response) { /////////////////////////////请在onComplete函数里将cover-img修改
=======
		'onUploadSuccess' : function(file, data, response) { /////////////////////////////请在onComplete函数里将cover-img修改
>>>>>>> 30623feb1a160ec6f9b1b16e10110de67a1c8be1
        	var audPath = JSON.parse(data).uploadFileName;
        	$("#jquery_jplayer_1").jPlayer("destroy");
        	$("#jquery_jplayer_1").jPlayer({
				 ready: function (event) {
					 $(this).jPlayer("setMedia", {
					 	mp3:audPath
					 }).jPlayer("play", 0);
				 },
				 swfPath: "javascripts",
				 supplied: "mp3",
				 preload: 'auto',
				 wmode: "window"
			 });
<<<<<<< HEAD
			 $("#stopaudio").attr("value", audPath).trigger("change");
=======
		$("#stopaudio").attr("value", audPath);
>>>>>>> 30623feb1a160ec6f9b1b16e10110de67a1c8be1
        }
        
    });
	
    $(window).scroll(function() {
        $("#add-images-crop").dialog("option", "position", "center"),
        $(window).scrollTop() > 334 ? ($(".black-bar-container").addClass("fixed").css("top", "-15px"), 
        $(".step2-container").css("margin-top", "84px")) : ($(".black-bar-container").removeClass("fixed").css("top", "0"), 
        $(".step2-container").css("margin-top", "-10px"))
    });

    $(".f-del").bind("click", function () {
	 		confirm("真的要删除吗?", "确认", function () {
	 		tours = [];
	 		tours.push($("#lineId").val());
	 		$.ajax({/////////////////////////////////////////POST到url然后，delete了这个路线，求接口
                type: "POST",
                url: baseUrl + "Delete",
                traditional: true,
                data: { 'listTour': tours },
                success: function (result) {
                    $(window).unbind('beforeunload');
                    location.href = "/";
                },
                error: function () {
                    info("Unexpected error");
                    hideLoading();
                }
            });
	 		});
	 	});
    $(".il-remove").live("click",function() {
        var t = $(this).parent().parent();
        //n = $(t).find("img").data("position"),
        //i = $(".seek-marker");
        return confirm("真的要删除该图片？", "",
        function() {
            $.ajax({
                url: baseUrl + "Stop/DeleteImage/",///////////////////////////修改这个接口
                type: "POST",
                async: !0,
                data: {
                    imageID: values[n].imageID
                },
                success: function(r) {
                    if (r && r.success) return info("删除成功"),
                    $(t).empty(),
                    //$(i[n]).remove(),
                    //values.remove(n),
                    //checkNoImages(),
                    //reorder(),
                    !1;
                    info("失败")
                }
            })
        }),
        !1
    }),
    
    $(".rewind").click(function () {
        var duration = myPlayer.data('jPlayer').status.duration;
        var currentTime = myPlayer.data('jPlayer').status.currentTime - 1;

        currentTime = currentTime > 0 ? currentTime : 0;

        myPlayer.jPlayer("play", currentTime); // Move play-head to start.
        return false;
    });
    $(".forward").click(function () {
        var duration = myPlayer.data('jPlayer').status.duration;
        var currentTime = myPlayer.data('jPlayer').status.currentTime + 1;

        currentTime = currentTime < duration ? currentTime : duration;

        myPlayer.jPlayer("play", currentTime); // Move play-head to start.
        return false;
    });

    $(".elastic").elastic();
<<<<<<< HEAD
=======
    
    $(".f-del").bind("click", function () {
	 	confirm("真的要删除吗?", "确认", function () {
	 		tours = [];
	 		tours.push($("#lineId").val());
	 		$.ajax({/////////////////////////////////////////POST到url然后，delete了这个路线，求接口
                type: "POST",
                url: baseUrl + "Delete",
                traditional: true,
                data: { 'listTour': tours },
                success: function (result) {
                    $(window).unbind('beforeunload');
                    location.href = "/";
                },
                error: function () {
                    info("Unexpected error");
                    hideLoading();
                }
            });
	 	});
	 });
>>>>>>> 30623feb1a160ec6f9b1b16e10110de67a1c8be1
});

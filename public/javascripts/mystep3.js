var poly;
var map;
var path = [], 
markers = [],  
ind = num,
no = 0;

function initialize() {
  var china = new google.maps.LatLng(23.1, 113.3);
  
  var mapOptions = {
    zoom: 12,
    center: china,
    zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP,
        style: google.maps.ZoomControlStyle.SMALL
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  
  //画线
  var polyOptions = {
	  strokeColor: "#36bde4",
	  strokeOpacity: .8,
	  strokeWeight: 4
	}
  poly = new google.maps.Polyline(polyOptions);
  poly.setMap(map);
  
  google.maps.event.addListener(map, 'click', addLatLng);
  
}


function addLatLng(event) {
	path = poly.getPath();
	// Because path is an MVCArray, we can simply append a new coordinate
	// and it will automatically appear
	
	if(no < num) {

		// Add a new marker at the new plotted point on the polyline.
		var marker = new google.maps.Marker({
		    position: event.latLng,
		    title: '#' + path.getLength(),
		    map: map
		});
		setIcon(marker, no+1);
		path.push(event.latLng);
		markers.push(marker);
		$("#map-form input#"+(no+1)).attr("value", event.latLng.lat()+','+event.latLng.lng()).addClass("input-changed");
		no++;

	} else {
		if(ind<num) {
			markers[ind].setPosition(event.latLng);
			poly.getPath().setAt(ind, event.latLng);
			$("#map-form input#"+(ind+1)).attr("value", event.latLng.lat()+','+event.latLng.lng());
		}
	}
	//showLatLng(event.latLng, marker);
}
var g = google.maps, 
marker_width = 32,
marker_height = 48,
activemarker_width = 48,
activemarker_height = 72,
setIcon = function(marker, n) {
	var img = new g.MarkerImage("/images/" + n,
    new g.Size(marker_width, marker_height), 
    new g.Point(0, 0), 
    new g.Point(marker_width / 2, marker_height));
    marker.setIcon(img);
},
setIcon2 = function(marker, n) {
	var img = new g.MarkerImage("/images/" + n + "_1",
    new g.Size(activemarker_width, activemarker_height), 
    new g.Point(0, 0), 
    new g.Point(activemarker_width / 2, activemarker_height));
    marker.setIcon(img);
},
findMarker = function(n) {
    if(n<markers.length)
    	return markers[n];
    else
    	return null;
}

$(function () {
    $("#stop-container li").live("click", function (e) {
        $("li.stl-selected").removeClass("stl-selected");
        $(this).addClass("stl-selected");
        if(ind<markers.length){
        	var marker = findMarker(ind);
        	setIcon(marker, ind+1);
        }
        ind = $(this).attr("rel")-1;
        marker = findMarker(ind);
        setIcon2(marker, ind+1);

        e.preventDefault();
    });
    //刚加的，还没有退出删除
    /*
    $(".footerbtn-savechange").live("click", function() {
    	$("#map-form").submit();
    	location.href = "/create";
    });
	*/
    $("#footerbtn-savechange").bind("click", function (e) {
       	//$(window).unbind('beforeunload');//////////////清除之前为了track-change，会重新bind
       	if($(".input-changed").length == num) {
        	$('#map-form').trigger('submit');/////////////trigger(submit)
				} else {
					alert("请添加坐标");
				}
       // toggleFooterButton();//////////////////////////底部button变
         e.preventDefault();
     });
});

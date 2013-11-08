function countCharacters(n) {
    var t = $(n).val().length;
    $(n).next().children().text(t)
}
$(document).ready(function() {
    $(".step-disabled a").click(function() {
        return ! 1
    }),
    $(".forcounter").keyup(function(n) {
        countCharacters(n.target)
    }).each(function() {
        countCharacters($(this))
    }),
    $(".c-map-footer :checkbox").iButton(),
    $(".geoloc-control input.txtfield").ToggleInputValue(),
    $("a.help-toggle-off").click(function() {
        return $(this).toggleClass("help-toggle-on"),
        $(this).parent().children(".geo-help-content").slideToggle(),
        !1
    }),
    $(".geoloc-switch :checkbox").bind("change",
    function() {
        $(this).is(":checked") ? $(this).parent().parent().parent().children(".geoloc-control").slideDown() : $(this).parent().parent().parent().children(".geoloc-control").slideUp()
    }),
    $(".td-info").qtip({
        content: {
            attr: "title"
        },
        position: {
            my: "bottom left",
            at: "top right",
            adjust: {
                x: -15
            }
        },
        show: {
            event: "click",
            delay: 0
        },
        events: {
            render: function(n, t) {
                var i = t.elements.tip
            }
        },
        style: {
            tip: {
                corner: "bottom left",
                mimic: "bottom center",
                offset: 20,
                width: 11,
                height: 7
            }
        }
    })
});
var geocoder, rendererOptions = {
    draggable: !0,
    markerOptions: {
        visible: !1}},
directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions),
directionsService = new google.maps.DirectionsService,
activeMarker = null,
markers = [],
vmarkers = [],
smarkers = [],
waypoints = [],
stops = [],
g = google.maps,
map = null,
polyLine,
tmpPolyLine,
testLine,
g = google.maps,
TheMarker = null,
OldIcon = null,
infowaypoint;
$(document).ready(function() {
    var n, t, i;
    $.ajaxSetup({
        cache: !1}),
    n = new google.maps.LatLng(40.7834345, -73.9662495),
    t = {
        zoom: 14,
        center: n,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP,
            style: google.maps.ZoomControlStyle.SMALL
        },
        scaleControl: !1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    map = new google.maps.Map(document.getElementById("map-canvas"), t),
    geocoder = new google.maps.Geocoder,
    google.maps.event.trigger(map, "resize"),
    i = strWaypointTooltip,
    infowaypoint = new google.maps.InfoWindow({
        content: i,
        disableAutoPan: !0,
        maxWidth: "200px"
    }),
    //showLoading(),
    $.get(baseUrl + "Tour/MapData/" + tourID).done(function(n) {
        loadMapData(n),
        setTimeout(function() {
            $(".stepmap-aside").jScroll(),
            $(".stepmap-list-container").jScrollPane();
            //hideLoading()
        },
        500)})});
var purgeMarkerList = function(n) {
    for (var t = 0; t < n.length; t++) n[t].setMap(null)
},
loadMapData = function(n) {
    var i, f, s, t, r, e, u, o, h;
    for (purgeMarkerList(smarkers), purgeMarkerList(vmarkers), purgeMarkerList(markers), initPolyline(), markers = [], vmarkers = [], waypoints = [], stops = [], $("#stop-container").empty(), t = 0; t < n.Stops.length; t++) i = n.Stops[t],
    u = createStop(i),
    smarkers.push(u),
    stops.push(i),
    $("#stop-container").append("<li id=" + i.EncryptStopID + '><a href="#"><span class="clearfix"><b>' + i.StopOrder + "<\/b> <em>" + i.Name + "<\/em><\/span><\/a><\/li>");
    for ($("#stop-container").sortable({
        update: function() {
            //showLoading(),
            $.ajax({
                url: baseUrl + "Tour/UpdateOrders",
                type: "POST",
                async: !0,
                traditional: !0,
                data: {
                    encryptTourID: tourID,
                    orders: $(this).sortable("toArray")
                },
                success: function(n) {
                    info(strUpdateSucceedMessage),
                    polyLine.setMap(null),
                    tmpPolyLine.setMap(null),
                    loadMapData(n)
                },
                error: function() {
                    alert("Unexpected error, please reload your page.")
                },
                complete: function() {
                    //hideLoading()
                }
            })
        }
    }), $("#stop-container").disableSelection(), f = $(".stepmap-list-container").data("jsp"), f && f.reinitialise(), t = 0; t < n.Waypoints.length; t++) r = n.Waypoints[t],
    waypoints.push(r),
    e = new google.maps.LatLng(r.latitude, r.longitude),
    u = createWayPoint(r),
    markers.push(u),
    markers.length != 1 && (o = createVMarker(e, s), vmarkers.push(o), o = null),
    s = r.waypointID,
    h = polyLine.getPath(),
    h.push(e),
    u = null;
    centerMap()
},
addStop = function(n) {
    stops.push(n)
},
addWayPoint = function(n) {
    waypoints.push(n)
},
createWayPoint = function(n) {
    var r = new google.maps.LatLng(n.latitude, n.longitude),
    i = new g.MarkerImage(markerFolder + "/square.png", new g.Size(11, 11), new g.Point(0, 0), new g.Point(6, 6)),
    u = new g.MarkerImage(markerFolder + "/square_over.png", new g.Size(11, 11), new g.Point(0, 0), new g.Point(6, 6)),
    t = new g.Marker({
        position: r,
        map: map,
        data: n.linkID,
        id: n.waypointID,
        icon: i,
        draggable: !0,
        visible: n.linkTo == "" || n.linkTo == null
    });
    return g.event.addListener(t, "drag",
    function() {
        for (var n = 0; n < markers.length; n++) if (markers[n] == t) {
            polyLine.getPath().setAt(n, t.getPosition()),
            moveVMarker(n);
            break
        }
        n = null
    }),
    g.event.addListener(t, "dragend",
    function(n) {
        updateLocation({
            type: "waypoint",
            ID: t.id,
            lat: n.latLng.lat(),
            lng: n.latLng.lng()
        })
    }),
    n.linkTo && n.linkTo != "" || (g.event.addListener(t, "mouseover",
    function() {
        t.setIcon(u)
    }), g.event.addListener(t, "mouseout",
    function() {
        t.setIcon(i)
    }), g.event.addListener(t, "click",
    function() {
        $.ajax({
            type: "POST",
            url: baseUrl + "Tour/DeleteWayPoint",
            data: {
                waypointID: t.id
            },
            cache: !1,
            async: !0,
            success: function() {}
        });
        for (var n = 0; n < markers.length; n++) if (markers[n] == t) {
            t.setMap(null),
            markers.splice(n, 1),
            polyLine.getPath().removeAt(n),
            removeVMarkers(n);
            break
        }
        n = null
    })),
    t
},
marker_width = 32,
marker_height = 48,
shadow_width = 50,
shadow_height = 25,
activeshadow_width = 76,
activeshadow_height = 39,
activemarker_width = 48,
activemarker_height = 72,
setIcon = function(n, t) {
    var i = new g.MarkerImage(baseUrl + "Image/Marker/" + n.data.StopOrder, new g.Size(marker_width, marker_height), new g.Point(0, 0), new g.Point(marker_width / 2, marker_height)),
    r = new g.MarkerImage(baseUrl + "Image/ActiveMarker/" + n.data.StopOrder, new g.Size(activemarker_width, activemarker_height), new g.Point(0, 0), new g.Point(activemarker_width / 2, activemarker_height)),
    u = new g.MarkerImage(baseUrl + "Content/Images/pinshadow.png", new g.Size(shadow_width, shadow_height), new g.Point(0, 0), new g.Point(0, shadow_height)),
    f = new g.MarkerImage(baseUrl + "Content/Images/pinshadow-active.png", new g.Size(activeshadow_width, activeshadow_height), new g.Point(0, 0), new g.Point(0, activeshadow_height)),
    e = t ? f: u,
    o = t ? r: i;
    n.setIcon(o),
    n.setShadow(e)
},
createStop = function(n) {
    var i = new google.maps.LatLng(n.Latitude, n.Longitude),
    t = new g.Marker({
        position: i,
        map: map,
        id: n.StopID,
        data: n,
        draggable: !0
    });
    return setIcon(t, !1),
    g.event.addListener(t, "drag",
    function() {
        for (var n = 0; n < markers.length; n++) if (markers[n].data == t.id) {
            markers[n].setPosition(t.getPosition()),
            polyLine.getPath().setAt(n, t.getPosition()),
            moveVMarker(n);
            break
        }
        n = null
    }),
    g.event.addListener(t, "click",
    function() {
        $("#StopLocation").html($("<span />").html(n.Address).text()),
        $("li.stl-selected").removeClass("stl-selected");
        var r = $("#stop-container").find("#" + t.data.StopID);
        r.addClass("stl-selected"),
        setIcon(t, !0),
        activeMarker && setIcon(activeMarker, !1),
        activeMarker = t
    }),
    g.event.addListener(t, "dragend",
    function(n) {
        var i;
        geocoder.geocode({
            latLng: n.latLng
        },
        function(r, u) {
            if (u != google.maps.GeocoderStatus.OK || !r[0] == null) return resetMarkerPosition(t);
            i = r[0].formatted_address,
            confirm("Do you want to update the addresse of stop " + t.data.order + " to :\n" + i, "Confirmation",
            function() {
                $("#StopLocation").val($("<span />").html(i).text()),
                updateLocation({
                    type: "stop",
                    ID: t.id,
                    lat: n.latLng.lat(),
                    lng: n.latLng.lng(),
                    adresse: i
                }),
                t.data.lat = n.latLng.lat(),
                t.data.lng = n.latLng.lng()
            },
            function() {
                resetMarkerPosition(t)
            })
        })
    }),
    t
},
resetMarkerPosition = function(n) {
    var i = new google.maps.LatLng(n.data.Latitude, n.data.Longitude),
    t;
    for (n.setPosition(i), t = 0; t < markers.length; t++) if (markers[t].data == n.id) {
        markers[t].setPosition(n.getPosition()),
        polyLine.getPath().setAt(t, n.getPosition()),
        moveVMarker(t);
        break
    }
    return ! 1
},
updateLocation = function(n) {
    var t = {
        encryptTourID: tourID
    };
    $.extend(t, n),
    $.ajax({
        type: "POST",
        url: baseUrl + "Tour/UpdateLocation",
        data: t,
        cache: !1,
        success: function() {
            info("Location updated")
        },
        error: function() {
            info("Erreur lors de la mise à jour de l'adresse")
        }
    })
},
initPolyline = function() {
    var n = {
        strokeColor: "#36bde4",
        strokeOpacity: .8,
        strokeWeight: 4
    },
    t = {
        strokeColor: "#36bde4",
        strokeOpacity: .4,
        strokeWeight: 4
    };
    polyLine = new g.Polyline(n),
    polyLine.setMap(map),
    tmpPolyLine = new g.Polyline(t),
    tmpPolyLine.setMap(map)
},
createVMarker = function(n, t) {
    var r = markers[markers.length - 2].getPosition(),
    u = new g.MarkerImage(markerFolder + "/square_transparent.png", new g.Size(11, 11), new g.Point(0, 0), new g.Point(6, 6)),
    f = new g.MarkerImage(markerFolder + "/square_transparent_over.png", new g.Size(11, 11), new g.Point(0, 0), new g.Point(6, 6)),
    i = new g.Marker({
        position: new g.LatLng(n.lat() - .5 * (n.lat() - r.lat()), n.lng() - .5 * (n.lng() - r.lng())),
        map: map,
        pred: t,
        icon: u,
        draggable: !0
    });
    return g.event.addListener(i, "mouseover",
    function() {
        i.setIcon(f)
    }),
    g.event.addListener(i, "mouseout",
    function() {
        i.setIcon(u)
    }),
    g.event.addListener(i, "dragstart",
    function() {
        for (var t, n = 0; n < vmarkers.length; n++) if (vmarkers[n] == i) {
            t = tmpPolyLine.getPath(),
            t.push(markers[n].getPosition()),
            t.push(vmarkers[n].getPosition()),
            t.push(markers[n + 1].getPosition());
            break
        }
        n = null
    }),
    g.event.addListener(i, "drag",
    function() {
        for (var n = 0; n < vmarkers.length; n++) if (vmarkers[n] == i) {
            tmpPolyLine.getPath().setAt(1, i.getPosition());
            break
        }
        n = null
    }),
    g.event.addListener(i, "dragend",
    function() {
        for (var t = 0; t < vmarkers.length; t++) if (vmarkers[t] == i) {
            var n = i.getPosition(),
            r = markers[t].getPosition(),
            e = new g.LatLng(n.lat() - .5 * (n.lat() - r.lat()), n.lng() - .5 * (n.lng() - r.lng())),
            u = markers[t + 1].getPosition(),
            f = new g.LatLng(n.lat() - .5 * (n.lat() - u.lat()), n.lng() - .5 * (n.lng() - u.lng()));
            $.ajax({
                type: "POST",
                url: baseUrl + "Tour/CreateWayPoint",
                data: {
                    encryptTourID: tourID,
                    lat: n.lat(),
                    lng: n.lng(),
                    after: i.pred
                },
                cache: !1,
                async: !1,
                error: function(n) {
                    alert("erreur" + n)
                },
                success: function(o) {
                    var s = createVMarker(f, o.WaypointID),
                    h = createWayPoint({
                        waypointID: o.WaypointID,
                        latitude: n.lat(),
                        longitude: n.lng(),
                        order: o.WayOrder,
                        linkID: 0,
                        linkTo: null
                    });
                    s.setPosition(f),
                    markers.splice(t + 1, 0, h),
                    polyLine.getPath().insertAt(t + 1, n),
                    i.setPosition(e),
                    vmarkers.splice(t + 1, 0, s),
                    tmpPolyLine.getPath().removeAt(2),
                    tmpPolyLine.getPath().removeAt(1),
                    tmpPolyLine.getPath().removeAt(0),
                    n = null,
                    r = null,
                    e = null,
                    u = null,
                    f = null,
                    s = null,
                    h = null
                }
            });
            break
        }
    }),
    i
},
moveVMarker = function(n) {
    var t = markers[n].getPosition(),
    i,
    r;
    n != 0 && (i = markers[n - 1].getPosition(), vmarkers[n - 1].setPosition(new g.LatLng(t.lat() - .5 * (t.lat() - i.lat()), t.lng() - .5 * (t.lng() - i.lng()))), i = null),
    n != markers.length - 1 && (r = markers[n + 1].getPosition(), vmarkers[n].setPosition(new g.LatLng(t.lat() - .5 * (t.lat() - r.lat()), t.lng() - .5 * (t.lng() - r.lng()))), r = null),
    t = null,
    n = null
},
removeVMarkers = function(n) {
    if (markers.length > 0 && (n != markers.length ? (vmarkers[n].setMap(null), vmarkers.splice(n, 1)) : (vmarkers[n - 1].setMap(null), vmarkers.splice(n - 1, 1))), n != 0 && n != markers.length) {
        var i = markers[n - 1].getPosition(),
        t = markers[n].getPosition();
        vmarkers[n - 1].setPosition(new g.LatLng(t.lat() - .5 * (t.lat() - i.lat()), t.lng() - .5 * (t.lng() - i.lng()))),
        i = null,
        t = null
    }
    n = null
},
findMarker = function(n) {
    for (var t in smarkers) if (smarkers[t].data.StopID == n) return smarkers[t]
},
centerMap = function() {
    var s, h, f, c, u, a;
    if (markers != null && markers.length != 0) {
        if (markers.length == 1) s = markers[0].getPosition().lat(),
        h = markers[0].getPosition().lng();
        else {
            var n = 9999,
            t = 9999,
            i = -99999,
            r = -99999;
            for (f = 0; f < markers.length; f++) if (c = markers[f], c != null) {
                var l = c.getPosition(),
                e = l.lat(),
                o = l.lng();
                n = n < e ? n: e,
                t = t < o ? t: o,
                i = i > e ? i: e,
                r = r > o ? r: o
            }
            u = new google.maps.LatLngBounds,
            u.extend(new google.maps.LatLng(n, t)),
            u.extend(new google.maps.LatLng(n, r)),
            u.extend(new google.maps.LatLng(i, r)),
            u.extend(new google.maps.LatLng(i, t)),
            map.fitBounds(u),
            s = (n + i) / 2,
            h = (t + r) / 2
        }
        a = new google.maps.LatLng(s, h),
        map.setCenter(a),
        map.getZoom() > 18 && map.setZoom(14)
    }
}
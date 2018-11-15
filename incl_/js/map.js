	var artistID = getParameterByName("artist");
	var validArtistID = (artists[artistID] != null);
	var artistName = (validArtistID) ? artists[artistID].name : null;

	var projectID = getParameterByName("project");
	var validProjectID = (projects[projectID] != null);
	var projectName = (validProjectID) ? projects[projectID].name : null;


/* LOAD MARKER FILE */

	var mapLoc = getParameterByName("loc");
	if (!mapLoc) mapLoc = "OAK";
	loadFile( "incl_/js/markers_" + mapLoc + ".js", "js" );


/* CREATE MARKER ICONS */

	var highlight = null;
	var prevIcon = null;

	var genIcon = L.Icon.extend({
	  options: {
		  iconSize: [28, 40],
		  iconAnchor: [14, 20],
		  popupAnchor: [0, -6]
	  }
	});

	var defaultIcon = new genIcon({
    	iconUrl: 'img_/pin_1.png',
	  	iconRetinaUrl: 'img_/pin_1@2x.png',
  });

	var activeIcon = new genIcon({
    	iconUrl: 'img_/pin_active.png',
	  	iconRetinaUrl: 'img_/pin_active@2x.png',
  });

	function setHighlight(e) {
	  if (this == highlight) {	/* toggle marker */
	  	removeHighlight();	
	  	return;
	  } 
  	removeHighlight();
		prevIcon = this.options.icon;	
		this.setIcon( activeIcon );
  	highlight = this;
	}

	function removeHighlight() {
	  if (highlight != null) {
	  	highlight.setIcon( prevIcon );
	    highlight = null;
	    prevIcon = null;
	  }
	}

	function preloadImage(img) {
	  new Image().src = img;
	  console.log('preload: ' + img);
	}


/* ADD MARKERS INTO LAYERS */

	var allMarkers = [];
	var muralMarkers = [];
	var mosaicMarkers = [];
	var muralLayer;
	var mosaicLayer;

	function addMarker( grp, obj, idx ) {

		var customIcon = new genIcon({
  		iconUrl: 'img_/pin_' + obj.type + '.png',
	  	iconRetinaUrl: 'img_/pin_' + obj.type + '@2x.png',
  	});

		var marker = L.marker(L.latLng(obj.latitude, obj.longitude), { 
			title: obj.title, 
			icon: customIcon 
		});

		var popup = '<a href="javascript:showDetail(\'' + idx + '\', \'' + mapLoc + '\')"><div class="pic" style="background-image:url(' + obj.img_sm + ')"></div><div class="title">' + obj.title + '</div><div class="artist">' + getArtist(obj); + '</div></a>';
		
		marker.on('click', setHighlight);		
		marker.bindPopup(popup);
		grp.push(marker);
		allMarkers.push([obj.latitude, obj.longitude]);
	}

	function addMarkersToLayer() { 

		for (i in artwork) {
			if ( (!artistID && !projectID) || 
					 (validArtistID && isByArtist( artwork[i], artistID)) || 
					 (validProjectID && (artwork[i].project == projectID))
				 ) {

				if (artwork[i].type == 1)
					addMarker( muralMarkers, artwork[i], i );
				else if (artwork[i].type == 2)
					addMarker( mosaicMarkers, artwork[i], i );
			}
		}

		muralLayer = L.layerGroup(muralMarkers);
		mosaicLayer = L.layerGroup(mosaicMarkers);
	}


/* ADD LAYERS TO CLUSTER THEN TO MAP */
/* Dan Leaver - https://github.com/Leaflet/Leaflet.markercluster */

	var cluster = L.markerClusterGroup({ 
		chunkedLoading: true,
		spiderfyOnMaxZoom: false,
  	showCoverageOnHover: false,
    maxClusterRadius: 20,
  	disableClusteringAtZoom: 19,
	});

	function showLayers() {
		var filters = document.getElementById('types').filters;
		removeHighlight();
		cluster.clearLayers();

		if (filters[0].checked) cluster.addLayer(muralLayer);
		if (filters[1].checked) cluster.addLayer(mosaicLayer);
        			
		map.addLayer(cluster);
	}


	var map;
	function createMap( markers ) {

	/* INITIALIZE MAP */
		var mapStyle = "https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FuemFpIiwiYSI6ImNpcXE2b3JpeTAyanhnbmpmMzZkOThjN3gifQ.29ejYqsMFooq2wYQsNEcvw";

		var mapTiles = L.tileLayer(mapStyle, {
			maxZoom: 20,
			minZoom: 2,
			attribution: '<a href="javascript:goPage(\'credits.html\')">Credits</a>'
		});

		map = L.map('map', {		// SQ: map is a global variable
			//center: mapCenter,
			zoom: 14, 
			layers: [mapTiles],
			zoomControl: false,
			attributionControl: false,
		});

	/* ADD ATTRIBUTION BAR */
		var sControl = L.control.attribution({ 
			position: "bottomright",
			prefix: ''
		});
		map.addControl( sControl );


	/* ADD SCALE BAR */
		var sControl = L.control.scale({ 
			position: "bottomleft",
			metric: false, 
			imperial: true 
		});
		map.addControl( sControl );

	/* ADD ZOOM CONTROL */
		if (!isMobile) {
			var zControl = L.control.zoom({ 
					position: "bottomleft",
				});
				map.addControl( zControl );
		}

	/* ADD MARKERS */
		addMarkersToLayer();
		showLayers();


	/* CENTER MAP ON MARKERS */
 		map.fitBounds(allMarkers);
 		map.setZoom(14);

	/* ADD MAP TRIGGERS */
		map.on('popupopen', centerPopup);		// center popup when opened

		map.on('locationfound', onLocationFound);
		map.on('locationerror', onLocationError);

		map.on('click', removeHighlight);		// clear highlighted markers on click map
	}


/* CENTER MAP ON POPUP OPEN */
/* Dan Mandle - http://stackoverflow.com/questions/22538473/leaflet-center-popup-and-marker-to-the-map/23157886#23157886  */

	function centerPopup(e) {
    var px = map.project(e.popup._latlng); // find the pixel location on the map where the popup anchor is
    px.y -= e.popup._container.clientHeight/2 // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
    map.panTo(map.unproject(px),{animate: true}); // pan to new center			
	}


/* PROMPT TO SET CURRENT LOCATION */

	var myLoc = null;
	function onLocationFound(e) {
		myLoc = e.latlng;
    myMarker = L.marker(e.latlng);
    map.addControl(myMarker);
	}

	function onLocationError(e) {
  	alert("Sorry, we were unable to get your current location.");
	}

	function gotoMyLoc() {
		if (myLoc == null) 
			map.locate({ setView:true, zoom:14 });	// zoom works if map zoom is not set
		else 
			map.setView(myLoc);
	}


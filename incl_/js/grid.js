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


/* ADD ITEMS TO LIST */
	function addItem( obj, idx ) {
		
		if (obj.type == 1) color = "#3FC0CB"; /* cyan */
		else if (obj.type == 2) color = "#ED3B78"; /* rose */

//			item =  '<div class="item-wrapper" style="border: 2px solid ' + color + '">';
		item =  '<div class="item-wrapper">';
		item += '	<div class="item">';
		item += '		<a href="javascript:showDetail(\'' + idx + '\', \'' + mapLoc + '\')"><div class="pic" style="background-image:url(' + obj.img_sm + ')"></div></a>';
		item += '		<div class="title">' + obj.title + '</div>';
		item += '		<div class="artist">' + getArtist(obj) + '</div>';
		item += '	</div>';
		item += '</div>';

		//var item = '<div class="threecol"><article><a href="javascript:showDetail(\'' + idx + '\', \'' + mapLoc + '\')"><div class="pic" style="background-image:url(' + obj.img_sm + ')"></div></a><div class="title">' + obj.title + '</div><div class="artist">' + getArtist(obj) + '</div></article></div>';

		return item;
	}

//		var muralArt = "";
//		var mosaicArt = "";
	var artList = "";

	function createList() {
		for (i in artwork) {
			if ( (!artistID && !projectID) || 
					 (validArtistID && isByArtist( artwork[i], artistID)) || 
					 (validProjectID && (artwork[i].project == projectID))
				 )
				artList += addItem( artwork[i], i );
		}

		var mainDIV = document.getElementById("main");
		if (artistID && !validArtistID)
			mainDIV.innerHTML = "Sorry, we couldn't find this artist.";
		else if (projectID && !validProjectID)
			mainDIV.innerHTML = "Sorry, we couldn't find this project.";
		else
			mainDIV.innerHTML = artList;

/*	SPLIT BY ART TYPE 
		for (i in artwork) {
			if (artwork[i].type == 1)
				muralArt += addItem( artwork[i], i );
			else if (artwork[i].type == 2)
				mosaicArt += addItem( artwork[i], i );
		}

		var muralDIV = document.getElementById("muralDIV");
		muralDIV.innerHTML = muralArt;

		var mosaicDIV = document.getElementById("mosaicDIV");
		mosaicDIV.innerHTML = mosaicArt;
*/
	}

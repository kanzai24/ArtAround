var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

var isMobileSafari = false;
if(navigator.platform == 'iPhone' || navigator.platform == 'iPod'){
  isMobileSafari = (navigator.userAgent.indexOf('Safari') != -1);
}

function getScreenSize() {
  screenWidth = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

  screenHeight = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
}

function hideObj(id) {
  var obj = document.getElementById(id);
  obj.style.opacity = 0;
  obj.style.display = "none";
}

function showObj(id) {
  var obj = document.getElementById(id);
  obj.style.opacity = 100;
  obj.style.display = "block";
}

function slideUp( id, pos, speed ) {
  showObj(id);

  if (!speed) speed = 300;
  getScreenSize();
  moveObjY(id, (screenHeight-pos), speed);
}

function slideDown( id, pos, speed ) {
  if (!speed) speed = 300;
  getScreenSize();
  moveObjY(id, screenHeight-pos, speed);

  setTimeout( fadeOut, speed, id,200 );
  setTimeout( hideObj, speed*2, id );
}


function loadFile(filename, filetype){
  if (filetype=="js"){ 
      var fileref=document.createElement('script');
      fileref.setAttribute("type","text/javascript");
      fileref.setAttribute("src", filename);
  }
  else if (filetype=="css"){ 
      var fileref=document.createElement("link");
      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("type", "text/css");
      fileref.setAttribute("href", filename);
  }
  if (typeof fileref!="undefined")
    document.getElementsByTagName("head")[0].appendChild(fileref);
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function goArtist(artist_id) {
  parent.location.href = ("grid.html?loc=" + mapLoc + "&artist=" + artist_id);
}

function goProject(project_id) {
  parent.location.href = ("grid.html?loc=" + mapLoc + "&project=" + project_id);
}

function getArtist(obj) {
  var name = "";
  var cnt = obj.artist.length;
  name += (obj.artist[0]=="Unknown") ? "Unknown Artist" : ("<a href='javascript:goArtist(\"" + obj.artist[0] + "\")'>" + artists[obj.artist[0]].name + "</a>");

  if (cnt > 1) {
    for (var i=1; i<(cnt-1); i++) {
      name += ", " + "<a href='javascript:goArtist(\"" + obj.artist[i] + "\")'>" + artists[obj.artist[i]].name + "</a>";
    }
    if (obj.artist[cnt-1] == "et al.")
      name += " " + obj.artist[cnt-1];
    else
      name +=  " & <a href='javascript:goArtist(\"" + obj.artist[cnt-1] + "\")'>" + artists[obj.artist[cnt-1]].name + "</a>";
  }
  return name;
}

function showDetail( idx, loc ) {
  var zDIV = document.getElementById("detailDIV");
  zDIV.src = "art_detail.html?idx=" + idx + "&loc=" + loc;
  showObj("detailDIV");
}

function hideDetail() {
  hideObj("detailDIV");
  if (location.href.indexOf("map") > 0) {
    highlight.closePopup();
    setTimeout(removeHighlight,600);
  }
}

function goBack() {
  window.history.back();
  /*
  console.log("pop:" + popCnt);
  if (popCnt == 0) window.history.back();
  else window.history.go(-1*popCnt);
  */
}

function goPage(url) {
  location.href = url;
}

function isByArtist( obj, name ) {
  var artistCnt = obj.artist.length;
  for (var i=0; i<artistCnt; i++) {
    if (obj.artist[i] == name) return true;
  }
  return false;
}

function scroll() {
  document.getElementById("pageTitle").style.fontSize = (document.body.scrollTop <= 40) ? "2.8em" : "1.5em";
}
    
var artStyles = {

    "mural": {
      "name": "Mural",
      "description": "A mural is any piece of artwork painted or applied directly on a wall, ceiling or other large permanent surface.",
      "url": "",
      "artwork": []
    },
    "mosaic": {
      "name": "Mosaic",
      "description": "Mosaic is the art of creating images with an assemblage of small pieces of colored glass, stone, or other materials.",
      "url": "",
      "artwork": []
    },
    //"graffiti", "stencil", "sticker", "poster", "wheatpaste", "woodblock", "yarn_bombing", "digital", "installation", "3D", "sculpture", 
};

var locations = {

    "OAK": { 
      "name":"Oakland", 
      "latitude": 37.804907, 
      "longitude": -122.271106
    },
    "SFO": {
      "name": "San Francisco",
      "latitude": 37.7640975,
      "longitude": -122.4428033
    },
    "LAX": {
      "name": "Los Angeles", 
      "latitude": 34.0044357,
      "longitude": -118.3089173
    },
    "HNL": {
      "name": "Honolulu",
      "latitude": 21.3067572,
      "longitude": -157.8609637
    }
};

var projects = {

    "oakland_mural_proj": {
      "name": "Oakland Super Heroes Mural Project",
      "url": "http://oaklandmuralproject.com/",
      "description": "",
      "artwork": []
    },

    "old_oakland_mosaic": {
      "name": "Old Oakland Mosaic Project",
      "url": "https://www.gofundme.com/oldoaklandmosaics",
      "description": "",
      "artwork": []
    },

    "pow_wow_2016": {
      "name": "Pow Wow Hawaii 2016",
      "url": "http://powwowhawaii.com/",
      "description": "",
      "artwork": []
    },
};

var artists = {

    "juan_lopez": {
      "name": "Juan Lopez",
      "url": "http://newworldmosaics.com/",
      "bio": "",
      "artwork": [
        "US-CA-OAK-MO-0001",
        "US-CA-OAK-MO-0002",
        "US-CA-OAK-MO-0003",
        "US-CA-OAK-MO-0004",
        "US-CA-OAK-MO-0006",
        "US-CA-OAK-MO-0018",
        "US-CA-OAK-MO-0019",
      ]
    },

    "daniel_galvez": {
      "name": "Daniel Galvez",
      "url": "",
      "bio": "",
      "artwork": [
        "US-CA-OAK-MU-0001",
      ]
    },

    "keith_sklar": {
      "name": "Keith Sklar",
      "url": "",
      "bio": "",
      "artwork": [
        "US-CA-OAK-MU-0001",
      ]
    },

    "susan_greene": {
      "name": "Susan Greene",
      "url": "",
      "bio": "",
      "artwork": [
        "US-CA-OAK-MU-0002",
      ]
    },

    "meera_desai": {
      "name": "Meera Desai",
      "url": "",
      "bio": "",
      "artwork": [
        "US-CA-OAK-MU-0002",
      ]
    },

    "seyna_dennis": {
      "name": "Seyna &#x2019;Refa&#x2019; Dennis",
      "url": "",
      "bio": "",
      "artwork": [
        "US-CA-OAK-MU-0003",
      ]
    },
    
    "david_burke": {
      "name": "David Burke",
      "url": "",
      "bio": "",
      "artwork": [
        "US-CA-OAK-MU-0004",
      ]
    },


    "sean_yoro": {
      "name": "Sean &#x2019;Hula&#x2019; Yoro",
      "url": "",
      "bio": "",
      "artwork": [
        "US-HI-HNL-MU-0001",
      ]
    },

    "bicicleta_sem_freio": {
      "name": "Bicicleta Sem Freio",
      "url": "",
      "bio": "",
      "artwork": [
        "US-HI-HNL-MU-0002",
      ]
    },

    "beak": {
      "name": "Beak",
      "url": "",
      "bio": "",
      "artwork": [
        "US-HI-HNL-MU-0003",
      ]
    },

    "tristan_eaton": {
      "name": "Tristan Eaton",
      "url": "",
      "bio": "",
      "artwork": [
        "US-HI-HNL-MU-0004",
      ]
    },

    "luke_mccabe": {
      "name": "Luke McCabe",
      "url": "",
      "bio": "",
      "artwork": [
        "US-HI-HNL-MU-0005",
      ]
    },

    "christina_angelina": {
      "name": "Christina Angelina",
      "url": "",
      "bio": "",
      "artwork": [
        "US-HI-HNL-MU-0006",
      ]
    },

    "katch": {
      "name": "Katch",
      "url": "",
      "bio": "",
      "artwork": [
        "US-HI-HNL-MU-0007",
      ]
    },

    "kevin_lyons": {
      "name": "Kevin Lyons",
      "url": "",
      "bio": "",
      "artwork": [
        "US-HI-HNL-MU-0008",
      ]
    },

    "james_jirat_patradoon": {
      "name": "James Jirat Patradoon",
      "url": "",
      "bio": "",
      "artwork": [
        "US-HI-HNL-MU-0009",
      ]
    },

   "edwin_ushiro": {
      "name": "Edwin Ushiro",
      "url": "",
      "bio": "",
      "artwork": [
        "US-HI-HNL-MU-0010",
      ]
    },

    "ricky_lee_gordon": {
      "name": "Ricky Lee Gordon",
      "url": "",
      "bio": "",
      "artwork": [
        "US-HI-HNL-MU-0011",
      ]
    },

    "freddy_sam": {
      "name": "Freddy Sam",
      "url": "",
      "bio": "",
      "artwork": [
        "US-HI-HNL-MU-0011",
      ]
    },

    "usugrow": {
      "name": "Usugrow",
      "url": "",
      "bio": "",
      "artwork": [
        "US-HI-HNL-MU-0012",
      ]
    },

    "hauser": {
      "name": "Hauser",
      "url": "",
      "bio": "",
      "artwork": [
        "US-HI-HNL-MU-0013",
      ]
    },

    "seher": {
      "name": "Seher",
      "url": "",
      "bio": "",
      "artwork": [
        "US-HI-HNL-MU-0014",
      ]
    },

    "prime": {
      "name": "Prime",
      "url": "",
      "bio": "",
      "artwork": [
        "US-HI-HNL-MU-15",
      ]
    },
}



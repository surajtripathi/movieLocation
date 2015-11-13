$(document).ready(function() {
  var locationArray = [];
  var locationMoveDetailMap = {}, rawMovieData;
  var mapProp, map, counter, geocoder, infoWindow, timer, markersArray = [], markers = [], titleArray = [];
  var firstTime = true;
  var imageUrl = "";
  var retryFlag = true;
  var currentImageElement = "", cuurentInfoWindow = "", c = "";
  //plots a specific location on map
  //called from plotLocations function
  function plot(placeToPlot) {                         
          geocoder.geocode({ 'address': placeToPlot }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              retryFlag = true;
              contentString = '<div style="font-family: Arial, Helvetica, sans-serif;"> <h3>' + (locationMoveDetailMap[placeToPlot][0].locations ? locationMoveDetailMap[placeToPlot][0].locations : "San Francisco") + '</h3> <hr> <div> <div style="float:left"> <img src="" height="100" width="80"> </div> <div style="float:left;padding:10px"> <div> The Movie : <a style="text-decoration: none;" href="" target="_blank"><b>'+locationMoveDetailMap[placeToPlot][0].title+'</b></a> </div> <div>Release Date : '+ locationMoveDetailMap[placeToPlot][0].release_year + '</div> <div>Cast : '+locationMoveDetailMap[placeToPlot][0].actor_1+'</div> <div>Directed By : '+locationMoveDetailMap[placeToPlot][0].director+'</div> <div>Written By : '+locationMoveDetailMap[placeToPlot][0].writer+'</div> </div> </div> </div>';
              tempMarker = new google.maps.Marker({
                                         map: map,
                                         position: new google.maps.LatLng(results[0].geometry.location.lat(),results[0].geometry.location.lng()),
                                         html: contentString
                                        });
              markers.push(tempMarker);
              // adding click listener 
              google.maps.event.addListener(tempMarker, "click", function() {
                infoWindow.setContent(this.html);
                infoWindow.open(map, this);
              });

            //Adding listener for mouseover event
              google.maps.event.addListener(tempMarker, "mouseover", function() {
                window.setTimeout(function() {
                  map.panTo(tempMarker);
                }, 40);
                currentImageElement = this;
                cuurentInfoWindow = infoWindow;
                //get movie poster and link from IMDB api on mouseover of a specific location
                getJSONDataFromUrl(('http://www.omdbapi.com/?t=' + encodeURIComponent(locationMoveDetailMap[placeToPlot][0].title) + '&y=' + locationMoveDetailMap[placeToPlot][0].release_year + '&plot=short&r=json').trim(), getPosterSuccessHandler);
                infoWindow.setContent(this.html);
                infoWindow.open(map, this); 
              });
            }
            else {
              if (retryFlag) {
                plot(placeToPlot);
                retryFlag = false;
              }
            }
          });                 
  }

  //function to get JSON data from a url
  function getJSONDataFromUrl(pUrl,successHandler,errorHandler) {
    $.ajax({
      url : pUrl,
      dataType : 'json',
      success  : function(data){
        if(typeof successHandler === 'function') {
          successHandler(data);
        }
      },
      error : function(data) {
        if(typeof errorHandler === 'function') {
          errorHandler(data);
        }
      }
    });
  }

  //used to fetch shooting location data on clicking search icon
  $('#search').click(function() {
    google.maps.Map.prototype.clearMarkers(c.getText());
  });

  //success handler to get data for shooting locations
  function successFunction(pData){
    locationArray = [];
    locationMoveDetailMap = {};
    titleArray = [];
    for (var index = 0; index < pData.length; index++) {
      if (titleArray.indexOf((pData[index].title).toLowerCase()) == -1){
          titleArray.push((pData[index].title).toLowerCase());
      }
      if (!(pData[index].locations in locationMoveDetailMap)) {
        locationMoveDetailMap[pData[index].locations+', San Francisco'] = [pData[index]];
        locationArray.push(pData[index].locations+', San Francisco');
      } else {
        locationMoveDetailMap[pData[index].locations].push(pData[index]);
      }
    }
    if (firstTime) {
      initAutoComplete();
    }
    plotLocations();
  }
  //success handler for getting getting poster and movie url from imdb api
  function getPosterSuccessHandler(pData) {
    currentImageElement.html = ((currentImageElement.html).replace('src=""', 'src="'+pData.Poster+'"')).replace('href=""','href="http://www.imdb.com/title/'+pData.imdbID+'/"');
    cuurentInfoWindow.setContent(currentImageElement.html)
  }
  //initializes the autocomplete component on page load
  function initAutoComplete() {
    firstTime = false;
    c = completely(document.getElementById("floating-panel"));
    c.options = titleArray;
    //called when text in the search box changes
    c.onChange = function(txt) {
      c.setText(txt.toLowerCase());
      if (c.options.indexOf(txt.toLowerCase()) != -1) {
        google.maps.Map.prototype.clearMarkers(txt);
      } 
      c.repaint();
    }
  }

  //plots all locations on the map
  function plotLocations() {
    mapProp = {
      center:new google.maps.LatLng(37.7600, -122.4167),
      zoom:12,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    geocoder = new google.maps.Geocoder();
    infoWindow = new google.maps.InfoWindow({
      content: "loading..."
    });
    //map loded
    setTimeout(function() {
      //Calling the plot function for each marker
      counter=0; 
      timer=setInterval(function() {
        plot(locationArray[counter]);
          counter++;
          if (counter>=locationArray.length-1)
            clearInterval(timer);
      }, 100);
    }, 1000);
  }

  //overide cleanMarker to remove markers from map
  //call applyFilter to redraw the map for new search
  google.maps.Map.prototype.clearMarkers = function(txt) {
    counter = 10000;
    for (var i=0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = new Array();
    applyFilters(txt)
  };

  //calls getJSONDataFromUrl with search text
  function applyFilters(txt) {
      getJSONDataFromUrl('https://data.sfgov.org/resource/yitu-d5am.json?$limit=5000&$q=' + txt, successFunction);

  }
  //loads all movies when page loads first time
  getJSONDataFromUrl('https://data.sfgov.org/resource/yitu-d5am.json?$limit=5000', successFunction);
});

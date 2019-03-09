$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

  var options = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 0
  };
  // console.log(options);
  
  function success(pos) {
    var crd = pos.coords;
  
    // console.log('Your current position is:');
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);
    input.push(crd.latitude, crd.longitude);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
  
  var input = []
    // console.log(input);
  
  
  
  
  
  /**
   * @param   {H.service.Platform} platform    A stub class to access HERE services
   */
  function searchPlaces(platform) {
    // creates a Search entypoint
    var search = new H.places.Search(platform.getPlacesService());
    // creates parameters for search request
    var params = {
      'q': 'recycle',
      'at': input
    };
    // creates a request with callbacks
    search.request(params, {}, onResult, onError);
  }
  
  
  /**
   * This function will be called once the Places REST API provides a response
   * @param  {Object} result          A JSONP object representing the  location(s) found.
   *
   * see: http://developer.here.com/rest-apis/documentation/places/topics_api/media-type-search.html
   *
   */
  function onResult(result) {
    var places = result.results.items;
    console.log(result);
    /*
     * The styling of the places response on the map is entirely under the developer's control.
     * A representative styling can be found the full JS + HTML code of this example
     * in the functions below:
     */
    addPlacesToMap(places);
    addPlacesToPanel(places);
  }
  
  
  /**
   * This function will be called if a communication error occurs during the JSON-P request
   * @param  {Object} error  The error message received.
   *
   * see: see: http://developer.here.com/rest-apis/documentation/places/topics_api/object-error.html
   */
  function onError(error) {
    error = data;
  }
  
  
  /**
   * Boilerplate map initialization code starts below:
   */
  
  
  // Hold a reference to any infobubble opened
  var bubble;
  
  /**
   * Opens/Closes a infobubble
   * @param  {H.geo.Point} position     The location on the map.
   * @param  {String} text              The contents of the infobubble.
   */
  function openBubble(position, text){
    if(!bubble){
      bubble =  new H.ui.InfoBubble(
        position,
        // The FO property holds the province name.
        {content: text});
      ui.addBubble(bubble);
    } else {
      bubble.setPosition(position);
      bubble.setContent(text);
      bubble.open();
    }
  }
  
  
  
  /**
   * Creates a series of clickable markers for each place found  and adds it to the map.
   * @param {Object[]} places An array of places as received from the H.service.getPlacesService
   */
  function addPlacesToMap(places) {
    var group = new  H.map.Group();
    // add 'tap' event listener, that opens info bubble, to the group
    group.addEventListener('tap', function (evt) {
      map.setCenter(evt.target.getPosition());
      openBubble(
        evt.target.getPosition(), evt.target.content);
    }, false);
  
    group.addObjects(places.map(function (place) {
      var marker = new H.map.Marker({lat: place.position[0], lng: place.position[1]})
      marker.content = '<div style="font-size: 10px" ><h3>' + place.title +
        '</h3><h4>' + place.category.title + '</h4>' + place.vicinity + '</div>';
      return marker;
    }));
  
    map.addObject(group);
  
    // get geo bounding box for the group and set it to the map
    map.setViewBounds(group.getBounds());
  }
  
  /**
   * Creates a series of list items for each location found, and adds it to the panel.
   * @param {Object[]} locations An array of locations as received from the
   *                             H.service.GeocodingService
   */
  function addPlacesToPanel(places){
  
    var nodeOL = document.createElement('ul'),
      i;
  
    nodeOL.style.fontSize = 'small';
    nodeOL.style.marginLeft ='5%';
    nodeOL.style.marginRight ='5%';
  
  
     for (i = 0;  i < places.length; i += 1) {
       var li = document.createElement('li'),
          divLabel = document.createElement('div'),
          content =  '<strong style="font-size: large;">' + places[i].title  + '</strong>';
          content += '&nbsp;<span style="font-size:smaller">(' +  places[i].category.title + ')</span></br>';
          content +=  places[i].vicinity + '</br>';
          content += '<strong>distance:</strong>' +  places[i].distance + 'm</br>';
  
        divLabel.innerHTML = content;
        li.appendChild(divLabel);
        nodeOL.appendChild(li);
    }
  
    placesContainer.appendChild(nodeOL);
  }
  
  var myid = config.app_id;
  var secretcode = config.app_code;
  // 1. initialize platform
  var platform = new H.service.Platform({
    app_id: myid,
    app_code: secretcode,
    useHTTPS: true,
    useCIT: true
  });
  
  var defaultLayers = platform.createDefaultLayers();
  
  var map = new H.Map(document.getElementById('map'),
    defaultLayers.normal.map, {
      center: {lat: -37.7942, lng: -122.4070},
      zoom: 15
    });
  
  var placesContainer = document.getElementById('panel');
  
  // add map behavior
  
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  
  // Create the default UI components
  
  var ui = H.ui.UI.createDefault(map, defaultLayers);
  
  // searchPlaces(platform);
  document.getElementById("btn-location").onclick = function search() {
    searchPlaces(platform);
  }





});

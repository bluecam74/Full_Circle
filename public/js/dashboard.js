$(document).ready(function () {

  function moveMapToOrangeCounty(map) {
    map.setCenter({ lat: 33.6846, lng: -117.8265 });
    map.setZoom(10);
  }

  var platform = new H.service.Platform({
    apikey: ****
  });
  var defaultLayers = platform.createDefaultLayers();

  var map = new H.Map(document.getElementById('map'),
    defaultLayers.vector.normal.map, {
    center: { lat: 33, lng: 117 },
    zoom: 4,
    pixelRatio: window.devicePixelRatio || 1
  });
  // add a resize listener to make sure that the map occupies the whole container
  window.addEventListener('resize', () => map.getViewPort().resize());

  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  // Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);

  window.onload = function () {
    moveMapToOrangeCounty(map);
  }


  /**
   *
   * @param   {H.service.Platform}
   */
  function placesSearch(platform, geoloc) {
    var placesService = platform.getPlacesService(),
      parameters = {
        at: geoloc,
        q: 'recycl'
      };

    placesService.search(parameters,
      function (result) {
        console.log(result);
        var places = result.results.items;
        console.log("places: ", places);
        addPlacesToMap(places);
        addPlacesToPanel(places);
      }, function (error) {
        alert(error);
      });
  }

  var input;

  function geocodeSearch(platform, input) {

    geocoder = platform.getGeocodingService();

    var geocodingParams = {
      searchText: input
    },
      onResult = function (result) {
        console.log(result.Response.View[0].Result[0].Location.DisplayPosition);
        let geoObj = Object.values(result.Response.View[0].Result[0].Location.DisplayPosition);
        let geoloc = geoObj.join(',');
        placesSearch(platform, geoloc);
      },
      onError = function (error) {
        console.log(error);
      };
    geocoder.geocode(geocodingParams, onResult, onError);

  }




  document.getElementById("button-addon2").onclick = function searchLocation() {

    input = document.getElementById("input-locate").value;
    console.log(input);
    geocodeSearch(platform, input);
    
  
    // searchPlaces(platform);
  }

  //   var options = {
  //     enableHighAccuracy: true,
  //     timeout: 20000,
  //     maximumAge: 0
  //   };


  //   function success(pos) {
  //     var crd = pos.coords;
  //     input.push(crd.latitude, crd.longitude);
  //   }

  //   function error(err) {
  //     console.warn(`ERROR(${err.code}): ${err.message}`);
  //   }
  //   navigator.geolocation.getCurrentPosition(success, error, options);

  //   var input = []
  //   var inputtwo = []





  //   /**
  //    * @param   {H.service.Platform} platform    A stub class to access HERE services
  //    */
  //   function searchPlaces(platform) {
  //     // creates a Search entypoint
  //     var search = new H.places.Search(platform.getPlacesService());
  //     // creates parameters for search request
  //     var params = {
  //       'q': 'recycle',
  //       'at': input, inputtwo
  //     };
  //     // creates a request with callbacks
  //     search.request(params, {}, onResult, onError);
  //   }

  //   function searchPlacesTwo(platform) {
  //     // creates a Search entypoint
  //     var search = new H.places.Search(platform.getPlacesService());
  //     // creates parameters for search request
  //     var params = {
  //       'q': 'recycle',
  //       'at': inputtwo
  //     };
  //     // creates a request with callbacks
  //     search.request(params, {}, onResult, onError);
  //   }


  //   /**
  //    * This function will be called once the Places REST API provides a response
  //    * @param  {Object} result          A JSONP object representing the  location(s) found.
  //    *
  //    * see: http://developer.here.com/rest-apis/documentation/places/topics_api/media-type-search.html
  //    *
  //    */
  //   function onResult(result) {
  //     var places = result.results.items;
  //     // console.log(result);
  //     /*
  //      * The styling of the places response on the map is entirely under the developer's control.
  //      * A representative styling can be found the full JS + HTML code of this example
  //      * in the functions below:
  //      */
  //     addPlacesToMap(places);
  //     addPlacesToPanel(places);
  //   }


  //   /**
  //    * This function will be called if a communication error occurs during the JSON-P request
  //    * @param  {Object} error  The error message received.
  //    *
  //    * see: see: http://developer.here.com/rest-apis/documentation/places/topics_api/object-error.html
  //    */
  //   function onError(error) {
  //     error = data;
  //   }


  //   /**
  //    * Boilerplate map initialization code starts below:
  //    */


  //   // Hold a reference to any infobubble opened
  //   var bubble;

  //   /**
  //    * Opens/Closes a infobubble
  //    * @param  {H.geo.Point} position     The location on the map.
  //    * @param  {String} text              The contents of the infobubble.
  //    */
  //   function openBubble(position, text) {
  //     if (!bubble) {
  //       bubble = new H.ui.InfoBubble(
  //         position,
  //         // The FO property holds the province name.
  //         { content: text });
  //       ui.addBubble(bubble);
  //     } else {
  //       bubble.setPosition(position);
  //       bubble.setContent(text);
  //       bubble.open();
  //     }
  //   }



  /**
//    * Creates a series of clickable markers for each place found  and adds it to the map.
   * @param {Object[]} places An array of places as received from the H.service.getPlacesService
   */

  function addPlacesToMap(places) {
    var group = new H.map.Group();
    console.log(group);
    // add 'tap' event listener, that opens info bubble, to the group
    // group.addEventListener('tap', function (evt) {
    //   map.setCenter(evt.target.getPosition());
    //   openBubble(
    //     evt.target.getPosition(), evt.target.content);
    // }, false);

    group.addObjects(places.map(function (place) {
      var marker = new H.map.Marker({ lat: place.position[0], lng: place.position[1] })
      marker.content = '<div style="font-size: 10px" ><h3>' + place.title +
        '</h3><h4>' + place.category.title + '</h4>' + place.vicinity + '</div>';
 
      return marker;
    }));

    map.addObject(group);

    // get geo bounding box for the group and set it to the map
    // map.setViewBounds(group.getBounds());
  }

  /**
   * Creates a series of list items for each location found, and adds it to the panel.
   * @param {Object[]} locations An array of locations as received from the
   *                             H.service.GeocodingService
   */
  function addPlacesToPanel(places) {

    var nodeOL = document.createElement('ul'),
      i;

    nodeOL.style.fontSize = 'small';
    nodeOL.style.marginLeft = '5%';
    nodeOL.style.marginRight = '5%';

    nodeOL.setAttribute("id", "containedList");

    //   for (i = 0; i < places.length; i += 1) {
    //     var li = document.createElement('li'),
    //       divLabel = document.createElement('div'),
    //       content = '<strong style="font-size: large;">' + places[i].title + '</strong>';
    //     content += '&nbsp;<span style="font-size:smaller">(' + places[i].category.title + ')</span></br>';
    //     content += places[i].vicinity + '</br>';
    //     content += '<strong>distance:</strong>' + places[i].distance + 'm</br>';

    //     divLabel.innerHTML = content;
    //     li.appendChild(divLabel);
    //     nodeOL.appendChild(li);
    //   }

    //   placesContainer.appendChild(nodeOL);
    // }
    document.getElementById("panel").innerHTML = "";
    var placesContainer = document.getElementById('panel');
    

    for (i = 0; i < 6; i++) {
      var li = document.createElement('li'),
        divLabel = document.createElement('div'),
        content = '<div class="col-lg-12"><strong style="font-size: large;">' + places[i].title + '</strong></div>';
      content += '&nbsp;<div class="col-lg-12"><span style="font-size:smaller">(' + places[i].category.title + ')</span></div></br>';
      content += '<div class="col-lg-12">' + places[i].vicinity + '</br></div>';
      content += '<div class="col-lg-12"><strong>distance: </strong>' + places[i].distance + 'm</br></div>';


      li.setAttribute("id", "listy");
      divLabel.setAttribute("id", "eachPlace");
      divLabel.innerHTML = content;
      li.appendChild(divLabel);
      nodeOL.appendChild(li);
    }


    placesContainer.appendChild(nodeOL);
    console.log("placescont", placesContainer)
  }

  //   // var myid = config.app_id;
  //   // var secretcode = config.app_code;
  //   // 1. initialize platform
  //   var platform = new H.service.Platform({
  //     app_id: 'ZHnvyXxejU8ydcgPz4mt',
  //     app_code: '9-fkxqSTPfkivp_B8KuJcA',
  //     useHTTPS: true,
  //     useCIT: true
  //   });

  //   var defaultLayers = platform.createDefaultLayers();

  //   var map = new H.Map(document.getElementById('map'),
  //     defaultLayers.normal.map, {
  //       center: { lat: 34.052235, lng: -118.243683 },
  //       zoom: 5
  //     });

  // var placesContainer = document.getElementById('panel');

  //   // add map behavior

  //   var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  //   // Create the default UI components

  //   var ui = H.ui.UI.createDefault(map, defaultLayers);

  //   // searchPlaces(platform);
  //   document.getElementById("btn-location").onclick = function search() {
  //     searchPlaces(platform);
  //   }

  //   var inputthree = []

  //   document.getElementById("button-addon2").onclick = function searchtwo() {

  //     inputthree.push(document.getElementById("input-locate").value);
  //     console.log(inputthree);
  //     geocode(platform);
  //     searchPlaces(platform);
  //   }






  //       /**
  //        * Calculates and displays the address details of 200 S Mathilda Ave, Sunnyvale, CA
  //        * based on a free-form text
  //        *
  //        *
  //        * A full list of available request parameters can be found in the Geocoder API documentation.
  //        * see: http://developer.here.com/rest-apis/documentation/geocoder/topics/resource-geocode.html
  //        *
  //        * @param   {H.service.Platform} platform    A stub class to access HERE services
  //        */
  //       function geocode(platform) {
  //         var geocoder = platform.getGeocodingService(),
  //           geocodingParameters = {
  //             searchText: inputthree,
  //             jsonattributes: 1
  //           };

  //         geocoder.geocode(
  //           geocodingParameters,
  //           onSuccess,
  //           onError
  //         );
  //       }
  /**
   * This function will be called once the Geocoder REST API provides a response
   * @param  {Object} result          A JSONP object representing the  location(s) found.
   *
   * see: http://developer.here.com/rest-apis/documentation/geocoder/topics/resource-type-response-geocode.html
   */
  function onSuccess(result) {
    var locations = result.response.view[0].result;
    /*
     * The styling of the geocoding response on the map is entirely under the developer's control.
     * A representitive styling can be found the full JS + HTML code of this example
     * in the functions below:
     */
    // addLocationsToMap(locations);
    addLocationsToPanel(locations);
    // ... etc.
  }

  //       /**
  //        * This function will be called if a communication error occurs during the JSON-P request
  //        * @param  {Object} error  The error message received.
  //        */
  //       function onError(error) {
  //         alert('Ooops!');
  //       }




  /**
   * Boilerplate map initialization code starts below:
   */

  //Step 1: initialize communication with the platform



  // var locationsContainer = document.getElementById('panel');

  // /**
  //  * Creates a series of list items for each location found, and adds it to the panel.
  //  * @param {Object[]} locations An array of locations as received from the
  //  *                             H.service.GeocodingService
  //  */
  // function addLocationsToPanel(locations) {

  //   var nodeOL = document.createElement('ul'),
  //     i;

  //   nodeOL.style.fontSize = 'small';
  //   nodeOL.style.marginLeft = '5%';
  //   nodeOL.style.marginRight = '5%';


  //   for (i = 0; i < locations.length; i += 1) {
  //     var li = document.createElement('li'),
  //       divLabel = document.createElement('div'),
  //       address = locations[i].location.address,
  //       content = '<strong style="font-size: large;">' + address.label + '</strong></br>';
  //     position = {
  //       lat: locations[i].location.displayPosition.latitude,
  //       lng: locations[i].location.displayPosition.longitude
  //     };

  //     // content += '<strong>houseNumber:</strong> ' + address.houseNumber + '<br/>';
  //     // content += '<strong>street:</strong> '  + address.street + '<br/>';
  //     // content += '<strong>district:</strong> '  + address.district + '<br/>';
  //     // content += '<strong>city:</strong> ' + address.city + '<br/>';
  //     // content += '<strong>postalCode:</strong> ' + address.postalCode + '<br/>';
  //     // content += '<strong>county:</strong> ' + address.county + '<br/>';
  //     // content += '<strong>country:</strong> ' + address.country + '<br/>';
  //     // content += '<br/><strong>position:</strong> ' +
  //     //   Math.abs(position.lat.toFixed(4)) + ((position.lat > 0) ? 'N' : 'S') +
  //     //   ' ' + Math.abs(position.lng.toFixed(4)) + ((position.lng > 0) ? 'E' : 'W');

  //     // divLabel.innerHTML = content;
  //     // li.appendChild(divLabel);

  //     nodeOL.appendChild(li);
  //     inputtwo.push(position.lat, position.lng);
  //     // console.log(inputtwo);
  //     (position.lng);
  //   }

  //   locationsContainer.appendChild(nodeOL);
  // }


  /**
  //  * Creates a series of H.map.Markers for each location found, and adds it to the map.
   * @param {Object[]} locations An array of locations as received from the
   *                             H.service.GeocodingService
   */
  function addLocationsToMap(locations) {
    var group = new H.map.Group(),
      position,
      i;

    // Add a marker for each location found
    for (i = 0; i < locations.length; i += 1) {
      position = {
        lat: locations[i].location.displayPosition.latitude,
        lng: locations[i].location.displayPosition.longitude
      };
      marker = new H.map.Marker(position);
      marker.label = locations[i].location.address.label;
      group.addObject(marker);
    }

    group.addEventListener('tap', function (evt) {
      map.setCenter(evt.target.getPosition());
      openBubble(
        evt.target.getPosition(), evt.target.label);
    }, false);

    // Add the locations group to the map
    map.addObject(group);
    map.setCenter(group.getBounds().getCenter());
  }





});

$(document).ready(function () {

  var map;
  var service;
  var infowindow;

  $(".search").on("click", function (e) {
    e.preventDefault();
    var location = document.getElementById('search').value;
    var term = 'recycle';

    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: location,
        key: '***'
      }
    })
      .then(function (response) {

        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        initMap(lat, lng, term);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  function initMap(lat, lng, term) {
    var oc = new google.maps.LatLng(lat, lng);

    infowindow = new google.maps.InfoWindow();

    map = new google.maps.Map(
      document.getElementById('map'), { center: oc, zoom: 13 });

    var request = {
      location: oc,
      radius: '700',
      query: term
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
  }

  function callback(results, status) {
    document.getElementById("panel").innerHTML = "";
    var placesContainer = document.getElementById('panel');






    if (status == google.maps.places.PlacesServiceStatus.OK) {
          var nodeOL = document.createElement('ul'),
    i;

  nodeOL.style.fontSize = 'small';
  nodeOL.style.marginLeft = '5%';
  nodeOL.style.marginRight = '5%';

  nodeOL.setAttribute("id", "containedList");
      if (results.length > 9) {
        results.length = 9;
      }
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
        var li = document.createElement('li'),
          divLabel = document.createElement('div'),
          content = '<div class="col-lg-12"><strong style="font-size: large;">' + results[i].name + '</strong></div>';
        content += '<div class="col-lg-12">' + results[i].formatted_address + '</br></div>';
        content += '<div class="col-lg-12"><strong>Rating: </strong>' + results[i].rating + '</br></div>';


        li.setAttribute("id", "listy");
        divLabel.setAttribute("id", "eachPlace");
        divLabel.innerHTML = content;
        li.appendChild(divLabel);
        nodeOL.appendChild(li);
      }
          placesContainer.appendChild(nodeOL);
    }
  }

  function createMarker(place) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

  initMap(33.684, -117.826);

});

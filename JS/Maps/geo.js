// $(document).ready(function() {
//   $.ajax({
//     type: "GET",
//     url: "./customer.json",
//     dataType: "json",
//     success: parser
//   });
//
//   function parser(jsonObj) {
//
//     $('#users_location').append("<ul id='customerList'>");
//     for (let i = 0; i < jsonObj.customer.length; i++) {
//       let tempObj = jsonObj.customer[i];
//       $('#users_location').append("<li name='" + tempObj.custName + "' address='" + tempObj.custAddr + "'>name: " + tempObj.custName + "<br>address: " + tempObj.custAddr + "</li>");
//     }
//     $('#users_location').append("</ul>");
//
//
//     let list = document.getElementsByTagName('li');
//     for (let i = 0; i < list.length; i++) {
//       list[i].onclick = function() {
//         let address = this.getAttribute('address');
//         showLocation(address);
//       }
//     }
//
//   }
//
//   let searchBtn = document.getElementById('searchBtn');
//   searchBtn.onclick = function(){
//     showLocation(document.getElementById('searchAddress').value);
//   };
//
//   document.getElementById('searchAddress').addEventListener('keydown', function(event){
//     if (event.keyCode == 13) {
//         showLocation(document.getElementById('searchAddress').value);
//     }
//   });
//
// });
//

var map;
var marker;

function initMap() {
  console.log("hERE");
  window.onload = function() {
    //Retrive the location of the map
    let mapTag = document.getElementById('map');
    //create a map object literal
    var mapPosition = {
      center: {
        lat: 37.791350,
        lng: -122.435883
      },
      zoom: 20
    }
    //New create the map and display it
    map = new google.maps.Map(mapTag, mapPosition);

    //Create a marker position object
    var markerPosition = {
      position: mapPosition.center,
      map: map
    }
    //Now create a marker
    marker = new google.maps.Marker(markerPosition);

  }
}


function showLocation(userAddress) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    address: userAddress
  }, (results, status) => {
    if (status == "OK") {
      map.setCenter(results[0].geometry.location);
      marker = new google.maps.Marker({
        position: results[0].geometry.location,
        map: map,
        animation: google.maps.Animation.DROP,
      });
      var info = new google.maps.InfoWindow ({
        content: userAddress,
        maxWidth: 150
      });

      marker.addListener('click',()=>{
        info.open(map,marker);
      });

    } else {
      alert('Error. Address is not found')
    }
  });


}

function initMap() {
  const myLatLng = { lat: 41.390205, lng: 2.154007 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10, // 10 como Messi
    center: myLatLng,
  });

  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hola Barcelona!",
  });
}

initMap();

function trobaAdreca() {
  let geocoder = new google.maps.Geocoder();
  let address = "Carrer de la Selva de Mar 211 08020 Barcelona";
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      latitude = results[0].geometry.location.lat();
      longitude = results[0].geometry.location.lng();
    }
  });
  let center = new google.maps.LatLng(latitude, longitude);
  map.setCenter(center);
  map.setZoom(16);
    console.log
}
trobaAdreca();

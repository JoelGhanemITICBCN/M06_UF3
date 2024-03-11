//Avd paralelo 127 08004 Barcelona
//Calle entenca 99 08015 Barcelona

let map;
let marker;
let imagen;
let estilo;
function initMap() {
  const myLatLng = { lat: 41.390205, lng: 2.154007 };
 
  imagen = {
    url: "navegador.png",
    scaledSize: new google.maps.Size(50, 50),
  };

   fetch('config.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al cargar el archivo de configuración');
    }
    console.log(response);
    estilo = response;
    return response.json();
  })
  .then(config => {
    estilo = config;

  })
  .catch(error => {
    console.error('Error:', error);
  });

 map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10, // 10 como Messi
    center: myLatLng,
    styles: estilo,
  });
  marker = new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hola Barcelona!",
  });
  trobaAdreca();
}

function trobaAdreca() {
  console.log("LLEGA A TROBADRECA");
  let geocoder = new google.maps.Geocoder();
  let address = document.getElementById("adreca").value;
  console.log("adress = " + address);
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      latitude = results[0].geometry.location.lat();
      longitude = results[0].geometry.location.lng();
      let center = new google.maps.LatLng(latitude, longitude);
      marker.setPosition(center);
      map.setZoom(16);
      map.setCenter(center);
      console.log(
        `DIreccion encontrada. Latitud: ${latitude} , longitud: ${longitude} `
      );
    } else {
      alert("no se ha encontrado la direccion " + status);
    }
  });
}

function encuentrate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      map.setCenter(pos);
      map.setZoom(20);
      let marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: imagen,
      });
    });
  }
}

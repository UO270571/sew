"use strict";

class Mapa {

    crearMapa()  {
        var opcionesMapa = {
            zoom: 10,
            center: new google.maps.LatLng( 43.3661, -5.8425 )
        };
        var mapa = new google.maps.Map(document.getElementById('mapa'), opcionesMapa);
        var marcador = new google.maps.Marker({
            position: opcionesMapa.center,
            animation: google.maps.Animation.DROP,
            map: mapa});
    }
}

var mapa = new Mapa();

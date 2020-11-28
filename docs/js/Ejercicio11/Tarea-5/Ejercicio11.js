"use strict";

class Mapa {

    iniciarMapa()  {
        navigator.geolocation.getCurrentPosition(this.crearMapa, this.mostrarError);
    }

    crearMapa(posicion) {
        var opcionesMapa = {
            zoom: 10,
            center: new google.maps.LatLng(posicion.coords.latitude, posicion.coords.longitude)
        };
        var mapa = new google.maps.Map(document.getElementById('mapa'), opcionesMapa);
        var ventanaInfo = new google.maps.InfoWindow({
            content: "Posición del usuario",
          });
        var marcador = new google.maps.Marker({
            position: opcionesMapa.center,
            animation: google.maps.Animation.DROP,
            title: "Posición",
            map: mapa});
        marcador.addListener("click", () => {
            ventanaInfo.open(mapa, marcador);});
    }

    mostrarError(error) {
        alert("Error al usar geolocaclización: " + error.message);
    }
}

var mapa = new Mapa();

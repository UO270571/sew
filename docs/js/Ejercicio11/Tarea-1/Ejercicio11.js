"use strict";

class GeoLocalizacion {

    constructor() {
        navigator.geolocation.getCurrentPosition(this.mostrarCoordenadas);
    }

    mostrarCoordenadas(posicion)  {
        $("body").append("<p>Latitud: " + posicion.coords.latitude + " grados</p>");
        $("body").append("<p>Longitud: " + posicion.coords.longitude + " grados</p>");
        $("body").append("<p>Altitud: " + posicion.coords.altitude + " metros</p>");
        $("body").append("<p>Precisión coordenadas: " + posicion.coords.accuracy + " metros</p>");
        $("body").append("<p>Precisión altitud: " + posicion.coords.altitudeAccuracy + " metros</p>");
        $("body").append("<p>Velocidad: " + posicion.coords.speed + " m/s</p>");
        $("body").append("<p>Rumbo: " + posicion.coords.heading + " grados</p>");
    }
}

var geo = new GeoLocalizacion();

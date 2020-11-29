"use strict";

class GeoLocalizacion {

    constructor() {
        navigator.geolocation.getCurrentPosition(this.mostrarCoordenadas);
    }

    mostrarCoordenadas(posicion)  {
        $("#resultados").append("<li>Latitud: " + posicion.coords.latitude + " grados</li>");
        $("#resultados").append("<li>Longitud: " + posicion.coords.longitude + " grados</li>");
        $("#resultados").append("<li>Altitud: " + posicion.coords.altitude + " metros</li>");
        $("#resultados").append("<li>Precisión coordenadas: " + posicion.coords.accuracy + " metros</li>");
        $("#resultados").append("<li>Precisión altitud: " + posicion.coords.altitudeAccuracy + " metros</li>");
        $("#resultados").append("<li>Velocidad: " + posicion.coords.speed + " m/s</li>");
        $("#resultados").append("<li>Rumbo: " + posicion.coords.heading + " grados</li>");
    }
}

var geo = new GeoLocalizacion();

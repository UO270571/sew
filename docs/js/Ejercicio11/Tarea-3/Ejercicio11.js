"use strict";

class GeoLocalizacion {

    constructor() {
        navigator.geolocation.getCurrentPosition(this.mostrarCoordenadas, this.mostrarError);
    }

    mostrarCoordenadas(posicion)  {
        $("#resultados").text("");
        $("#resultados").append("<li>Latitud: " + posicion.coords.latitude + " grados</li>");
        $("#resultados").append("<li>Longitud: " + posicion.coords.longitude + " grados</li>");
        $("#resultados").append("<li>Altitud: " + posicion.coords.altitude + " metros</li>");
        $("#resultados").append("<li>Precisión coordenadas: " + posicion.coords.accuracy + " metros</li>");
        $("#resultados").append("<li>Precisión altitud: " + posicion.coords.altitudeAccuracy + " metros</li>");
        $("#resultados").append("<li>Velocidad: " + posicion.coords.speed + " m/s</li>");
        $("#resultados").append("<li>Rumbo: " + posicion.coords.heading + " grados</li>");

        var urlMapa ='https://maps.google.com/maps/api/staticmap?key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&?center=' + 
            posicion.coords.latitude + ',' + 
            posicion.coords.longitude + '&zoom=13&size=300x300&markers=' +
            posicion.coords.latitude + ',' + 
            posicion.coords.longitude;

            $("body").append("<img src = " + urlMapa + " alt = 'Mapa no disponible'/>");
    }

    mostrarError(error) {
        alert("Error al usar geolocaclización: " + error.message);
    }

}

var geo = new GeoLocalizacion();

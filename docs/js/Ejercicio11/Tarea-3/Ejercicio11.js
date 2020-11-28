"use strict";

class GeoLocalizacion {

    constructor() {
        navigator.geolocation.getCurrentPosition(this.mostrarCoordenadas, this.mostrarError);
    }

    mostrarCoordenadas(posicion)  {
        $("body").append("<p>Latitud: " + posicion.coords.latitude + " grados</p>");
        $("body").append("<p>Longitud: " + posicion.coords.longitude + " grados</p>");
        $("body").append("<p>Altitud: " + posicion.coords.altitude + " metros</p>");
        $("body").append("<p>Precisión coordenadas: " + posicion.coords.accuracy + " metros</p>");
        $("body").append("<p>Precisión altitud: " + posicion.coords.altitudeAccuracy + " metros</p>");
        $("body").append("<p>Velocidad: " + posicion.coords.speed + " m/s</p>");
        $("body").append("<p>Rumbo: " + posicion.coords.heading + " grados</p>");

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

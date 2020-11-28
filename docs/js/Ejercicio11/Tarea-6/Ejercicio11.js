"use strict";

class Mapa {

    iniciarMapa()  {
        navigator.geolocation.getCurrentPosition(this.crearMapa.bind(this), this.mostrarError);
    }

    crearMapa(posicion) {
        var opcionesMapa = {
            zoom: 10,
            center: new google.maps.LatLng(posicion.coords.latitude, posicion.coords.longitude)
        };
        this.mapa = new google.maps.Map(document.getElementById('mapa'), opcionesMapa);

        google.maps.event.addListener(this.mapa, "click", (event) => {
            this.getMeteo(event.latLng);
        });
    }

    getMeteo(coords) {
        this.coordenadas = coords;
        var apiKey = "846c5bfe97a75cac299d60b6417a01dc";
        var lat = coords.lat();
        var lon = coords.lng();
        var idioma = "es";
        var unidades = "metric";
        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=" + unidades + "&lang=" + idioma + "&appid=" + apiKey;

        $.ajax({
            dataType: "json",
            url: url,
            method: 'GET',
            context: this,
            success: this.mostrarMeteo,
            error: function(){
                alert("Error al consultar los datos meteorológicos"); 
            }
        });
    }

    mostrarMeteo(datos) {
        var ventanaInfo = new google.maps.InfoWindow({
            content: this.getStrInfoMeteo(datos)
          });
        var marcador = new google.maps.Marker({
            position: this.coordenadas,
            animation: google.maps.Animation.DROP,
            title: datos.weather[0].main,
            map: this.mapa});
        marcador.addListener("click", () => {
            ventanaInfo.open(this.mapa, marcador);});
    }

    getStrInfoMeteo(datos) {
        var str = "<p><img src = 'https://openweathermap.org/img/w/" + datos.weather[0].icon + ".png' alt = '" + datos.weather[0].main + "'/img>" 
            + datos.weather[0].main + " (" + datos.weather[0].description + ")</p>";
        str += "<p>Temperatura: " + datos.main.temp + "º</p>";
        return str;
    }

    mostrarError(error) {
        alert("Error al usar geolocaclización: " + error.message);
    }
}

var mapa = new Mapa();

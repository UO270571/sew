"use strict";

class Mapa {

    leerGeoJSON(files) {
        var reader = new FileReader();
        reader.onload = function(event) {
            try {
                var geoJSON = JSON.parse(reader.result);
                this.mapa.data.addGeoJson(geoJSON);
            } catch(err) {
                alert("Formato de archivo incorrecto")
            } 
        }.bind(this);
        reader.readAsText(files[0]);
    }

    crearMapa()  {
        var opcionesMapa = {
            zoom: 10,
            center: new google.maps.LatLng( 43.3661, -5.8425 )
        };
        this.mapa = new google.maps.Map(document.getElementById('mapa'), opcionesMapa);
    }
}

var mapa = new Mapa();

"use strict";

class Mapa {

    constructor() {
        var firebaseConfig = {
            apiKey: "AIzaSyB7SYCaowbL7elIdG0EiXhoA4FfTOsEGSg",
            authDomain: "practicassew.firebaseapp.com",
            databaseURL: "https://practicassew.firebaseio.com",
            projectId: "practicassew",
            storageBucket: "practicassew.appspot.com",
            messagingSenderId: "815101345441",
            appId: "1:815101345441:web:47746afa0d1622c7e8bae0"
        };
        firebase.initializeApp(firebaseConfig);
    }

    leerKML(files) {
        var ref = firebase.storage().ref().child('rutas.kml');
        ref.put(files[0]).then(this.getUrlKML.bind(this));
    }

    getUrlKML(snapshot) {
        var ref = firebase.storage().ref().child('rutas.kml');
        ref.getDownloadURL().then(this.mostrarKML.bind(this));
    }

    mostrarKML(url) {
        var layer = new google.maps.KmlLayer({
            url: url,
            map : this.mapa
        })
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

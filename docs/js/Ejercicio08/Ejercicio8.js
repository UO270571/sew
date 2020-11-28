"use strict";

class DatosCiudad {

    constructor(ciudad) {
        this.apiKey = "846c5bfe97a75cac299d60b6417a01dc";
        this.ciudad = ciudad;
        this.idioma = "es";
        this.unidades = "metric";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "&units=" + this.unidades + "&lang=" + this.idioma + "&appid=" + this.apiKey;
    }

    obtenerDatos() {
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            context: this,
            success: this.guardarDatos,
            error: function(){
                $("body").append("<p>No se pudo obtener el XML de <a href='http://openweathermap.org'>OpenWeatherMap</a></p>"); 
            }
        });
    }

    guardarDatos(datos) {
        this.ciudad = datos.name;
        this.pais = datos.sys.country;
        this.latitud = datos.coord.lat;
        this.longitud = datos.coord.lon;
        this.temperatura = datos.main.temp;
        this.sensacion = datos.main.feels_like;
        this.temperaturaMax = datos.main.temp_max;
        this.temperaturaMin = datos.main.temp_min; 
        if(datos.rain == undefined)
            this.precipitacion = 0;
        else
            this.precipitacion = datos.rain["1h"];
        this.presion = datos.main.pressure;
        this.humedad = datos.main.humidity; 
        this.amanecer = new Date(datos.sys.sunrise * 1000); 
        this.anochecer = new Date(datos.sys.sunset * 1000); 
        this.dirViento = datos.wind.deg;
        this.velViento = datos.wind.speed;
        this.fecha = new Date(datos.dt * 1000);
        this.main = datos.weather[0].main;
        this.descripcion = datos.weather[0].description;
        this.icono = "https://openweathermap.org/img/w/" + datos.weather[0].icon + ".png";
        this.visibilidad = datos.visibility;
        this.nubes = datos.clouds.all;
        this.mostrarDatos();
    }

    mostrarDatos() {
        var str = "<article><h2>" + this.ciudad + " (" + this.pais + ")</h2>";
        str += "<p><img src = '" + this.icono + "' alt = '" + this.main + "'/img>" + this.main + " (" + this.descripcion + ")</p><ul>";
        str += "<li>Temperatura: " + this.temperatura + " grados Celsius</li>";
        str += "<li>Sensación térmica: " + this.sensacion + " grados Celsius</li>";
        str += "<li>Temperatura máxima: " + this.temperaturaMax + " grados Celsius</li>";
        str += "<li>Temperatura mínima: " + this.temperaturaMin + " grados Celsius</li>";
        str += "<li>Precipitaciones: " + this.precipitacion + " mm/h</li>";
        str += "<li>Presión: " + this.presion + " hPa</li>";
        str += "<li>Humedad: " + this.humedad + "%</li>";
        str += "<li>Nubosidad: " + this.nubes + " %</li>";
        str += "<li>Visibilidad: " + this.visibilidad + " metros</li>";
        str += "<li>Latitud: " + this.latitud + " grados</li>";
        str += "<li>Longitud: " + this.longitud + " grados</li>";   
        str += "<li>Amanece a las: " + this.amanecer.toLocaleTimeString() + "</li>"; 
        str += "<li>Oscurece a las: " + this.anochecer.toLocaleTimeString() + "</li>"; 
        str += "<li>Dirección del viento: " + this.dirViento + "  grados</li>";
        str += "<li>Velocidad del viento: " + this.velViento + " metros/segundo</li>";
        str += "<li>Hora de la medida: " + this.fecha.toLocaleTimeString() + "</li>";
        str += "<li>Fecha de la medida: " + this.fecha.toLocaleDateString() + "</li>";
        $("body").append(str + "</ul></article>");
    }
}

class Meteo {
    constructor() {
        this.datos = new Array();
    }

    obtener() {
        $("article").remove();
        this.datos = [];
        this.datos.push(new DatosCiudad("Oviedo"));
        this.datos.push(new DatosCiudad("Trubia"));
        this.datos.push(new DatosCiudad("Olloniego"));
        for(var i = 0; i < this.datos.length; i++)
            this.datos[i].obtenerDatos();
    }
}

var meteo = new Meteo();

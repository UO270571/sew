"use strict";

class DatosCiudad {

    constructor(ciudad) {
        this.apiKey = "846c5bfe97a75cac299d60b6417a01dc";
        this.ciudad = ciudad;
        this.idioma = "es";
        this.unidades = "metric";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "&mode=xml&units=" + this.unidades + "&lang=" + this.idioma + 
            "&appid=" + this.apiKey;
    }

    obtenerDatos() {
        $.ajax({
            dataType: "xml",
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
        this.ciudad = $('city',datos).attr("name");
        this.pais = $('country',datos).text();
        this.latitud = $('coord',datos).attr("lat");
        this.longitud = $('coord',datos).attr("lon");
        this.temperatura = $('temperature',datos).attr("value");
        this.sensacion = $('feels_like',datos).attr("value");
        this.temperaturaMax = $('temperature',datos).attr("max");
        this.temperaturaMin = $('temperature',datos).attr("min");
        this.precipitacion = $('precipitation',datos).attr("values");
        if(this.precipitacion == undefined)
            this.precipitacion = 0;
        this.modoPrecipitacion = $('precipitation',datos).attr("mode");
        this.presion = $('pressure',datos).attr("value");
        this.humedad = $('humidity',datos).attr("value");
        this.amanecer = new Date(Date.parse($('sun',datos).attr("rise")) - new Date().getTimezoneOffset() * 60 * 1000); 
        this.anochecer = new Date(Date.parse($('sun',datos).attr("set")) - new Date().getTimezoneOffset() * 60 * 1000);
        this.dirViento = $('direction',datos).attr("value");
        this.dirVientoNombre = $('direction',datos).attr("name");
        this.velViento = $('speed',datos).attr("value");
        this.nomViento = $('speed',datos).attr("name");
        this.fecha = new Date(Date.parse($('lastupdate',datos).attr("value")) - new Date().getTimezoneOffset() * 60 * 1000);
        this.descripcion = $('weather',datos).attr("value");
        this.icono = "https://openweathermap.org/img/w/" + $('weather',datos).attr("icon") + ".png";
        this.visibilidad = $('visibility',datos).attr("value");
        this.nubes = $('clouds',datos).attr("value");
        this.mostrarDatos();
    }

    mostrarDatos() {
        var str = "<article><h2>" + this.ciudad + " (" + this.pais + ")</h2>";
        str += "<p><img src = '" + this.icono + "' alt = '" + this.descripcion + "'/img>" + this.descripcion + "</p><ul>";
        str += "<li>Temperatura: " + this.temperatura + " grados Celsius</li>";
        str += "<li>Sensación térmica: " + this.sensacion + " grados Celsius</li>";
        str += "<li>Temperatura máxima: " + this.temperaturaMax + " grados Celsius</li>";
        str += "<li>Temperatura mínima: " + this.temperaturaMin + " grados Celsius</li>";
        str += "<li>Precipitaciones: " + this.precipitacion + " mm/h (" + this.modoPrecipitacion + ")</li>";
        str += "<li>Presión: " + this.presion + " hPa</li>";
        str += "<li>Humedad: " + this.humedad + "%</li>";
        str += "<li>Nubosidad: " + this.nubes + " %</li>";
        str += "<li>Visibilidad: " + this.visibilidad + " metros</li>";
        str += "<li>Latitud: " + this.latitud + " grados</li>";
        str += "<li>Longitud: " + this.longitud + " grados</li>";   
        str += "<li>Amanece a las: " + this.amanecer.toLocaleTimeString() + "</li>"; 
        str += "<li>Oscurece a las: " + this.anochecer.toLocaleTimeString() + "</li>"; 
        if(this.dirViento != undefined) {
            str += "<li>Dirección del viento: " + this.dirViento + "  grados " + this.dirVientoNombre + "</li>";
        } 
        str += "<li>Velocidad del viento: " + this.velViento + " metros/segundo (" + this.nomViento + ")</li>";
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
        this.datos.push(new DatosCiudad("Las+caldas"));
        this.datos.push(new DatosCiudad("Fuso+de+la+reina"));
        for(var i = 0; i < this.datos.length; i++)
            this.datos[i].obtenerDatos();
    }
}

var meteo = new Meteo();

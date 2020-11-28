"use strict";

class Traductor {

    constructor() {
        this.getIdiomas();
    }

    getIdiomas() {
        var ajustes = {
            url: "https://microsoft-translator-text.p.rapidapi.com/languages?api-version=3.0&scope=translation",
            method: "GET",
            headers: {
                "accept-language": "es",
                "x-rapidapi-key": "54b76607edmshea94017d8c119d0p143aabjsn85dc4cb505f1",
                "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
                "x-rapidapi-ua": "RapidAPI-Playground"
            },
            context: this,
            success: this.guardarIdiomas
        };
        
        $.ajax(ajustes);
    }

    guardarIdiomas(datos) {
        this.idiomas = datos.translation;
        var codigosIdiomas = Object.keys(this.idiomas).
            map(e => {
                var o = new Object();
                o.code = e; 
                o.name = this.idiomas[e].name; 
                return o
            }).
            sort((a, b) => a.name.localeCompare(b.name));
        for(var i = 0; i < codigosIdiomas.length; i++) {
            $("#idiomas").append('<option value = "' + codigosIdiomas[i].code + '" >' + codigosIdiomas[i].name + '</option>'); 
            $("#idiomasOrigen").append('<option value = "' + codigosIdiomas[i].code + '" >' + codigosIdiomas[i].name + '</option>'); 
        }
    }

    traducir() {
        this.texto = $("#texto").val();
        this.idioma = $("#idiomas").children("option:selected").val();
        this.idiomaOrigen = $("#idiomasOrigen").children("option:selected").val();
        var from = "&from=" + this.idiomaOrigen;
        if(this.idiomaOrigen == "detectar")
            from = "";

        var ajustes = {
            url: "https://microsoft-translator-text.p.rapidapi.com/translate?to="+ this.idioma + from + "&api-version=3.0",
            method: "POST",
            headers: {
                "content-type": "application/json",
                "x-rapidapi-key": "54b76607edmshea94017d8c119d0p143aabjsn85dc4cb505f1",
                "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com"
            },
            data: '[{"Text": "' + this.texto + '"}]',
            context: this,
            success: this.mostrarResultado
        };
        
        $.ajax(ajustes);
    }

    mostrarResultado(datos) {
        this.resultado = datos[0].translations[0].text;
        this.texto = $("#resultado").text(this.resultado);
    }
}

var traductor = new Traductor();

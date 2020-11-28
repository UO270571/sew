"use strict";

class Archivo {
    leer(files)  {
        this.files = files;
        $("main").text("");
        for (var i = 0; i < this.files.length; i++) {
            $("main").append("<h2>" + this.files[i].name + "</h2>");
            $("main").append("<p>Tamaño: " + this.files[i].size + " bytes</p>");
            $("main").append("<p>Tipo: " + this.files[i].type + "</p>");
            $("main").append("<p>Ultima modificacion: " + new Date(this.files[i].lastModified).toUTCString() + "</p>");
            if(/text.*/.test(this.files[i].type) || /application.json/.test(this.files[i].type)) {
                var id = "contenido" + i;
                $("main").append("<p>Contenido del archivo: </p><pre id = '" + id + "'></pre>");
            }
            this.mostrarArchivos(0);
        }
    }

    mostrarArchivos(i) {
        if(i < this.files.length && /text.*/.test(this.files[i].type) || /application.json/.test(this.files[i].type)) {
            var id = "contenido" + i;
            var reader = new FileReader();
            reader.onload = (e => {
                document.getElementById(id).innerText = reader.result;
                this.mostrarArchivos(i + 1);
            });
            reader.readAsText(this.files[i]);
        }
    }
}

var archivo = new Archivo();

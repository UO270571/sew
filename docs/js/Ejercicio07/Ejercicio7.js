"use strict";

class Documento {

    constructor() {
    }

    ocultarParrafos() {
        $("p").hide();
    }

    mostrarParrafos() {
        $("p").show();
    }

    ocultarTabla() {
        $("table").hide();
    }

    mostrarTabla() {
        $("table").show();
    }

    ocultarLista() {
        $("ul").hide();
    }

    mostrarLista() {
        $("ul").show();
    }

    modificarLista(n) {
        var id = "#campoLista" + n;
        var text = $(id).val();
        id = "#textoLista" + n;
        $(id).text(text);
    }

    modificarTabla(n) {
        var id = "#campoFila" + n;
        var text = $(id).val();
        id = "#textoFila" + n;
        $(id).text(text);
    }

    addElemento() {
        var n = $("li").length + 1;
        $("ul").append('<li id = lista' + n + '> <p id = "textoLista' + n + '"><label for = "campoLista' + n + '">Elemento' + n + 
        ' </label></p> <input id = "campoLista' + n + 
            '" type="text"/> <input type="button" value="Modificar" onclick="doc.modificarLista(' + n + ')"/> </li>');
    }

    eliminarElemento() {
        if ($("li").length > 0) {
            $("li").last().remove();
        }
    }

    addFila() {
        var n = $("#tablaModificable tr").length + 1;
        $("#tablaModificable").append('<tr id = "fila' + n + '">' +
                            '<td id = "textoFila' + n + '"><label for = "campoFila' + n + '">Fila ' + n + '</label></td>' +
                            '<td><input id = "campoFila' + n + '" type="text"/> <input type="button" value="Modificar" onclick="doc.modificarTabla(' + n + ')"/></td>' +
                        '</tr>' );
    }

    eliminarFila() {
        if ($("#tablaModificable tr").length > 0) {
            $("#tablaModificable tr").last().remove();
        }
    }

    sumarTabla() {
        var suma = 0;
        $("#tablaNumeros td").each(function() {
            suma += parseInt($(this).text())
        });
        $("#sumaTabla").append('Suma de filas y columnas de la tabla: ' + suma);
    }

    recorrer() {
        $("*", document.body).each(function() {
            var etiquetaPadre = $(this).parent().get(0).tagName;
            $(this).prepend(document.createTextNode('[Padre: '  + $(this).parent().get(0).tagName + 
                                                    ' Tipo: ' + $(this).get(0).tagName + '] '));
        });
    }
    
}

var doc = new Documento();

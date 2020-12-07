"use strict";

class Buscador {

    buscar(str) {
        var query = {
            query : {
                multi_match : {
                    query : str, 
                    operator : "OR", 
                    fields : ["keywords", "content"]
                }
            }
        };

        $.ajax({
            url: "http://localhost:9200/matrix-buscador/_search",
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            data: JSON.stringify(query),
            context: this,
            success: this.mostrarResultados
        });
    }

    mostrarResultados(data) {
        var documents = data.hits.hits;
        if(documents.length > 0) {
            $("body").append('<ul>');
            for(var i = 0; i < documents.length; i++) {
                var source = documents[i]._source;
                $("body ul").append("<li><a href = " + source.filename + ">" + source.title + "</a></li>");
            }
        } else {
            $("body").append("<p>No se encontraron resultados</p>");
        }
    }
}

var buscador = new Buscador();
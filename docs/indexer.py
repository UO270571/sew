import json
import codecs
from elasticsearch import Elasticsearch

def main():
    global es
    es = Elasticsearch()

    # Creamos el índice
    # ignore=400 hace que se ignore el error de índice ya existente
    es.indices.create(index="matrix-buscador",ignore=400)

    # Ahora se indexan los documentos
    f = codecs.open('documents.json', 'r', encoding='utf-8')
    linea = f.readline()
    while linea:
        procesarEntrada(linea)
        linea = f.readline()
    f.close()

# Aquí indexaremos los documentos
def procesarEntrada(linea):
    datos=json.loads(linea)

    ident=datos["id"]
    es.index(
        index="matrix-buscador",
        id=ident,
        body=linea
    )

if __name__ == '__main__':
    main()

from bs4 import BeautifulSoup
import codecs
import os
import json
import lxml.html as et

def getContent(filename):
    f = codecs.open(filename, 'r', encoding='utf-8')
    html = f.read()
    f.close()
    soup = BeautifulSoup(html, features="html.parser")
    # remove the nav and footer element because they are repeated in each html
    for nav in soup(["nav"]):
        nav.extract()
    for nav in soup(["footer"]):
        nav.extract()
    text = soup.get_text()
    # separamos en lineas y eliminamos el espacio final e inicial
    lines = (line.strip() for line in text.splitlines())
    # separamos titulares multiples en una línea cada uno
    chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
    # eliminamos las líneas vacías
    text = '\n'.join(chunk for chunk in chunks if chunk)
    return text

def getTitle(filename):
    arbol = et.parse(filename)
    raiz = arbol.getroot()
    return raiz.find("head/title").text

def getKeyWords(filename):
    arbol = et.parse(filename)
    raiz = arbol.getroot()
    for meta in raiz.findall("head/meta"):
        if(meta.get('name') == 'keywords'):
            return meta.get('content')

directory = os.fsencode('.')
ident = 1
with open('documents.json', 'w', encoding='utf8') as json_file:
    for file in os.listdir(directory):
         filename = os.fsdecode(file)
         if filename.endswith(".html"):
             title = getTitle(filename)
             keywords = getKeyWords(filename)
             content = getContent(filename).replace("\n", " ").replace("\"", "")
             doc = {
                 "id" : ident,
                 "filename" : filename,
                 "title" : title,
                 "keywords" : keywords,
                 "content" : content
             }
             json.dump(doc, json_file, ensure_ascii=False)
             json_file.write("\n")
             ident += 1



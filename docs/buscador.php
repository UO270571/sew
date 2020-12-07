<!DOCTYPE HTML>

<html lang="es">
<head>
	<link rel="stylesheet" type="text/css" href="estilo.css" />
	<link rel="stylesheet" type="text/css" href="layout.css" />
	<link rel="stylesheet" type="text/css" href="layoutMovil.css" />
    <meta charset="UTF-8"/>
	<meta name = "author" content = "UO270571"/>
	<meta name = "desciption" content = "información sobre la película the matrix"/>
	<meta name = "keywords" content = "matrix,película,cine,keanu,reeves"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>The Matrix</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="Buscador.js"></script>
</head>

<?php
    if(isset($_POST["buscar"]))
        echo '<body onload = "buscador.buscar(\''.$_POST["buscador"].'\')">';
    else
        echo "<body>";
    ?>

	<header>
		<h1>The Matrix</h1>
		<nav>
			<ol>
				<li><a href="index.html" tabindex="1" accesskey="i">Inicio</a></li>
				<li><a href="protagonistas.html" tabindex="2" accesskey="p">Protagonistas</a></li>
				<li><a href="bandasonora.html" tabindex="3" accesskey="b">Banda sonora</a></li>
				<li><a href="trailers.html" tabindex="4" accesskey="t">Trailers</a></li>
				<li><a href="criticas.html" tabindex="5" accesskey="c">Críticas</a></li>
				<li>
					<form method="post" action="buscador.php">
						<label for = "buscador">Buscar en la página: </label>
                        <input type = "text" name = "buscador" id = "buscador"/>
                        <input type = "submit" name = "buscar" value = "Buscar"/>
					</form>
				</li>
			</ol>
		</nav>
    </header>

    <h2>Resultados de la búsqueda</h2>

</body>

</html>
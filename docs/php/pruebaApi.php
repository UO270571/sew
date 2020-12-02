<?php

$curl = curl_init();

curl_setopt_array($curl, [
	CURLOPT_URL => "https://microsoft-translator-text.p.rapidapi.com/languages?api-version=3.0",
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_FOLLOWLOCATION => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => [
		"x-rapidapi-host: microsoft-translator-text.p.rapidapi.com",
        "x-rapidapi-key: 54b76607edmshea94017d8c119d0p143aabjsn85dc4cb505f1",
        "x-rapidapi-ua: RapidAPI-Playground"
	],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
	echo "cURL Error #:" . $err;
} else {
	echo $response;
}

?>
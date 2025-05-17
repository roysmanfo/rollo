<?php
include("../db/connessioneDB.php");
if ($_SERVER["REQUEST_METHOD"] === "GET"){
    $result = $conn->query("SELECT B.id, B.modello, B.sede_appartenenza, B.stato,
                            I.latitudine, I.longitudine, I.data_installazione, I.data_revisione
                            FROM biciclette B
                            JOIN iot I ON B.iot = I.id;")
    $biciclette = array();
    while ($row = $result->fetch_assoc()) {
        array_push($biciclette, $row);
    }
    echo json_encode(["messaggio"=> "Ricerca completata", "biciclette" => $biciclette]);
} else {
    http_response_code(405);
    echo json_encode(["errore" => "Metodo non consentito."]);
}

?>
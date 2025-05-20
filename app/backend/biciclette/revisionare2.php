<?php

/**
 * !! NON FUNZIONA (riga 22 - if invece di while)
 * 
 * Restituisce biciclette che necessitano revisione entro una data (con informazioni limitate)
 * 
 * metodo: GET
 * parametri:
 *  - dataRevisione: la data massima
 */
include("../db/connessioneDB.php");
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $dataRevisione = htmlentities($_POST['dataRevisione']);
    $query = $conn->prepare("SELECT B.id, I.data_Revisione
                                   FROM biciclette B
                                   JOIN iot I ON B.iot = I.id
                                   WHERE I.data_Revisione <= ?;");
    $query->bind_param("s", $dataRevisione);
    $query->execute();
    $result = $query->get_result();
    if ($row = $result->fetch_assoc()) {
        $sede = array(
            "id" => htmlentities($row['id']),
            "data_Revisione" => htmlentities($row['data_Revisione'])
        );
        echo json_encode(array("message" => "Sede trovata.", "sede" => $sede));
        exit;
    } else {
        echo json_encode(array("message" => "Nessuna sede trovata."));
        exit;
    }
    $conn->close();
    $query->close();
    $result->close();
} else {
    echo json_encode(array("message" => "Richiesta non valida."));
}

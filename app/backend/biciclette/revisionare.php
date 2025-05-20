<?php

/**
 * Restituisce biciclette che necessitano revisione entro una data
 * 
 * metodo: GET
 * parametri:
 *  - dataRevisione: la data massima
 */
header("Content-Type: application/json");
include("../db/connessioneDB.php");
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = htmlentities($_POST['data']);
    $query = $conn->prepare("SELECT B.id, B.modello, B.stato, I.latitudine, I.longitudine, S.nome AS sede, I.data_revisione
                                    FROM biciclette B
                                    JOIN iot I ON (B.iot = I.id)
                                    JOIN sedi S ON (B.sede_appartenenza = S.id)
                                    WHERE I.data_revisione >= NOW() AND I.data_revisione <= ?;");
    $query->bind_param("s", $data);
    $query->execute();
    $result = $query->get_result();

    if ($result->num_rows > 0) {
        $biciclette = array();

        while ($row = $result->fetch_assoc()) {
            $bicicletta = array(
                "id" => htmlentities($row['id']),
                "modello" => htmlentities($row['modello']),
                "stato" => htmlentities($row['stato']),
                "latitudine" => htmlentities($row['latitudine']),
                "longitudine" => htmlentities($row['longitudine']),
                "sede" => htmlentities($row['sede'])
            );
            array_push($biciclette, $bicicletta);
        }
        echo json_encode(array("message" => "Bicicletta trovata.", "bicicletta" => $biciclette));
    } else {
        echo json_encode(array("message" => "Nessuna bicicletta trovata."));
    }
    $query->close();
    $result->close();
} else {
    echo json_encode(array("message" => "Richiesta non valida."));
}
$conn->close();

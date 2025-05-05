<?php
    include("connessioneDB.php");
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $query = "SELECT B.id, B.modello, B.stato, I.latitudine, I.longitudine, S.nome AS sede
                  FROM biciclette B
                  JOIN iot I ON B.iot = I.id
                  JOIN sedi S ON B.sede_appartenenza = S.id;";
        $result = $conn -> query($query);
        if($row = $result -> fetch_assoc()){
            $id = htmlentities($row['id']);
            $modello = htmlentities($row['modello']);
            $stato = htmlentities($row['stato']);
            $latitudine = htmlentities($row['latitudine']);
            $longitudine = htmlentities($row['longitudine']);
            $sede = htmlentities($row['sede']);
            $bicicletta = array(
                "id" => $id,
                "modello" => $modello,
                "stato" => $stato,
                "latitudine" => $latitudine,
                "longitudine" => $longitudine,
                "sede" => $sede
            );
            echo json_encode(array("message" => "Noleggio trovato.", "bicicletta" => $bicicletta));
            exit;
        } else {
            echo json_encode(array("message" => "Nessun noleggio trovato."));
            exit;
        }
        $conn->close();
        $query->close();
        $result->close();
    } else {
        echo json_encode(array("message" => "Richiesta non valida."));
    }
?>
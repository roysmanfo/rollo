<?php
    include("connessioneDB.php");
    if($_SERVER['REQUEST_METHOD'] == 'POST') {    
        $data = htmlentities($_POST['data']);
        $query = $conn -> prepare("SELECT B.id, B.modello, B.stato, I.latitudine, I.longitudine, S.nome AS sede
                                    FROM biciclette B
                                    JOIN iot I ON B.iot = I.id
                                    JOIN sedi S ON B.sede_appartenenza = S.id
                                    WHERE B.data_ultima_revisionata <= ?;");
        $query -> bind_param("s", $data);
        $query -> execute();
        $result = $query -> get_result();
        if($row = $result -> fetch_assoc()){
            $bicicletta = array(
                "id" => htmlentities($row['id']),
                "modello" => htmlentities($row['modello']),
                "stato" => htmlentities($row['stato']),
                "latitudine" => htmlentities($row['latitudine']),
                "longitudine" => htmlentities($row['longitudine']),
                "sede" => htmlentities($row['sede'])
            );
            echo json_encode(array("message" => "Bicicletta trovata.", "bicicletta" => $bicicletta));
            exit;
        } else {
            echo json_encode(array("message" => "Nessuna bicicletta trovata."));
            exit;
        }
        $conn->close();
        $query->close();
        $result->close(); 
    } else {
        echo json_encode(array("message" => "Richiesta non valida."));
    }
?>
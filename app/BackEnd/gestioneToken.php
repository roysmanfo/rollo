<?php
    include("connessioneDB.php");
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $numToken = "SELECT num_token FROM utenti";
        if($numToken > ){
            $idNoleggio = htmlentities($_POST['idNoleggio']);
            $query = $conn -> prepare("SELECT prezzo FROM noleggi WHERE id = ?");
            $query -> bind_param("i", $idNoleggio);
            $query -> execute();
            $result = $query -> get_result();
            if($result -> num_rows > 0){
                $row = $result -> fetch_assoc();
                $prezzo = $row['prezzo'];
                echo json_encode(array("message" => "Noleggio trovato.", "prezzo" => $prezzo));
                exit;
            } else {
                echo json_encode(array("message" => "Nessun noleggio trovato."));
                exit;
            }
            $numToken -= ;
        } else {
            echo json_encode(array("message" => "Numero di token insufficiente."));
            exit;
        }
        $conn->close();
        $query->close();
        $result->close();
    } else {
        echo json_encode(array("message" => "Richiesta non valida."));
    }
?>
<?php

    /**
     * Cerca il prezzo (in token) relativo ad un determinato noleggio
     * 
     * metodo: POST
     * parametri:
     *  - idNoleggio: id del neleggio in questione 
     */

    include("connessioneDB.php");
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $MIN_TOKEN = 0; // TODO: Aaggiornare questo numero 
        $numToken = "SELECT num_token FROM utenti";
        
        if($numToken > $MIN_TOKEN){
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
                echo json_encode(array("errore" => "Nessun noleggio trovato."));
                exit;
            }
            // TODO: aggiornare il numero di token nel backend
            // $numToken -= ;
        } else {
            echo json_encode(array("errore" => "Numero di token insufficiente."));
            exit;
        }
        $conn->close();
        $query->close();
        $result->close();
    } else {
        echo json_encode(array("errore" => "Richiesta non valida."));
    }
?>
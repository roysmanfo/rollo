<?php
    //100 token di defualt per ogni utente, al km 5 token, al noleggio 10 token 
    include("connessioneDB.php");
    $data = json_decode(file_get_contents("php://input"),true);
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $numToken = "SELECT num_token FROM utenti";
       
        if($numToken > 15){
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
            //Scalo il numero di token per ogni km percorso
            if(isset($data["distanza"])){
                $distanza = $data["distanza"];
                $numToken -= 15 * $distanza;
            } else {
                echo json_encode(array("message" => "Distanza non trovata."));
                exit;
            }

            //Scalo il numero di token per ogni noleggio
            $oraAttuale = date("H:i:s"); // Ottieni ora attuale nel formato HH:MM:SS
            $oraScadenzaNoleggio = "SELECT ora_fine FROM noleggi WHERE ora_fine < ?";
            $query = $conn -> prepare($numToken);
            $query -> execute();
            $result = $query -> get_result();
            if($oraScadenzaNoleggio < $oraAttuale){
                $aggiornamentoToken = $conn -> prepare("UPDATE utenti SET num_token = $numToken WHERE id = $idNoleggio");
                echo json_encode(array("message" => "Noleggio scaduto."));
                exit;
            }
            
            //Aggiornamento token nel database se il tempo del noleggio è scaduto
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
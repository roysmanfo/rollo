<?php
    /**
     * Permette di aggiornare una recensione sull'esperienza dell'utente
     * metodo: POST
     * parametri:
     *  - idRecensione: indentificatore della recensione in questione 
     *  - idUtente: indentificatore della recensione in questione 
     *  - idProdotto: identificatore della bici usata 
     *  - voto: valutazione della esperienza 
     *  - testo: informazioni aggiuntive 
     */

    if($_SERVER['REQUEST_METHOD'] == 'POST') {

        $idRecensione = htmlentities($_POST['idRecensione']);
        $idUtente = htmlentities($_POST['idUtente']);
        $idProdotto = htmlentities($_POST['idProdotto']);
        $voto = htmlentities($_POST['voto']);
        $testo = htmlentities($_POST['testo']);
        // Esempio di codice per aggiornare la recensione nel database
        include("./db/connessioneDB.php");
        $query = $conn->prepare("UPDATE recensioni SET idUtente = ?, idProdotto = ?, voto = ?, testo = ? WHERE idRecensione = ?");
        $query->bind_param("iiisi", $idUtente, $idProdotto, $voto, $testo, $idRecensione);
        $query->execute();
        $result = $query->get_result();
        while($recensione = $result->fetch_assoc()){
        // TODO: fix query
        if ($query -> update($idRecensione, $idUtente, $idProdotto, $voto, $testo)) {
            // Se l'aggiornamento è andato a buon fine, restituisci un messaggio di successo
            $stampaRecensione = array(
                "idRecensione" => $recensione["idRecensione"],
                "idUtente" => $recensione["idUtente"],
                "idProdotto" => $recensione["idProdotto"],
                "voto" => $recensione["voto"],
                "testo" => $recensione["testo"]
            );
            http_response_code(200);
            echo json_encode(["message" => "Recensione aggiornata con successo.", "recensione" => $stampaRecensione]);
        } else {
            echo json_encode(array("message" => "Errore durante l'aggiornamento della recensione."));
        }
        }
    } else {
        http_response_code(405);
        echo json_encode(array("message" => "Richiesta non valida."));
    }
?>
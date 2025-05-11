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

        // TODO: implementare la logica per aggiornare le recensioni

        if ($recensione->update($idRecensione, $idUtente, $idProdotto, $voto, $testo)) {
            echo json_encode(array("message" => "Recensione aggiornata con successo."));
        } else {
            echo json_encode(array("message" => "Errore durante l'aggiornamento della recensione."));
        }
    } else {
        http_response_code(405);
        echo json_encode(array("message" => "Richiesta non valida."));
    }
?>
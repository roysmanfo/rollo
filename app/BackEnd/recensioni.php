<?php
    if($_SERVER['REQUEST_METHOD'] == 'POST') {

        $idRecensione = htmlentities($_POST['idRecensione']);
        $idUtente = htmlentities($_POST['idUtente']);
        $idProdotto = htmlentities($_POST['idProdotto']);
        $voto = htmlentities($_POST['voto']);
        $testo = htmlentities($_POST['testo']);

        if ($recensione->update($idRecensione, $idUtente, $idProdotto, $voto, $testo)) {
            echo json_encode(array("message" => "Recensione aggiornata con successo."));
        } else {
            echo json_encode(array("message" => "Errore durante l'aggiornamento della recensione."));
        }
    } else {
        echo json_encode(array("message" => "Richiesta non valida."));
    }
?>
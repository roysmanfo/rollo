<?php

/**
 * Restituisce tutti i noleggi attivi per un determinato utente
 * 
 * metodo: GET
 */


header("Content-Type: application/json");
include("../db/connessioneDB.php");
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    session_start();
    if (!isset($_SESSION)) {
        echo json_encode(["error" => "Nessuna sessione trovata."]);
        exit;
    }

    $utente = htmlentities($_SESSION['id']);

    // ? controlla che il noleggio in questione sia attivo
    // ? e che sia effettivamente dell'utente che effettua la richiesta
    $stmt = $conn->prepare("SELECT id, data, ora_inizio, bicicletta FROM noleggi
                                    WHERE utente = ? AND distanza_percorsa IS NULL;");
    $stmt->bind_param("i", $utente);
    $stmt->execute();
    $noleggi = $stmt->get_result();
    if ($noleggi->num_rows == 0) {
        http_response_code(409);
        echo json_encode(array("error" => "Nessun noleggio attivo trovato per questo utente"));
        $conn->close();
        $stmt->close();
        exit;
    }

    $noleggio = $noleggi->fetch_assoc();
    $stmt->close();
    echo json_encode($noleggio);
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Richiesta non valida."));
}
$conn->close();

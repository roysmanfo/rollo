<?php

/**
 * Aggiorna lo stato delle biciclette (libero (1) / occupato (0))
 * metodo: POST
 */
header("Content-Type: application/json");
include("../db/connessioneDB.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    date_default_timezone_set('Europe/Rome'); // Imposta il fuso orario corretto
    // $oraAttuale = date("H:i:s"); // Ottieni ora attuale nel formato HH:MM:SS

    // Seleziona biciclette con stato ancora occupato (0) e noleggio scaduto
    $query = "
        SELECT B.id
        FROM biciclette B
        JOIN noleggi N ON B.id = N.bicicletta
        WHERE N.ora_fine IS NULL;
    ";

    $stmt = $conn->prepare($query);
    // $stmt->bind_param("s", $oraAttuale);
    $stmt->execute();
    $result = $stmt->get_result();

    $aggiornate = [];

    // Per ogni bicicletta scaduta, aggiornare lo stato a 1 (disponibile)
    if ($result->num_rows > 0) {
        $updateStmt = $conn->prepare("UPDATE biciclette SET stato = 0 WHERE id = ?");

        while ($row = $result->fetch_assoc()) {
            $id = $row['id'];
            $updateStmt->bind_param("i", $id);
            $updateStmt->execute();
            array_push($aggiornate, $id);
        }

        $updateStmt->close();
        echo json_encode([
            "message" => "Stato aggiornato per le biciclette scadute.",
            "biciclette_aggiornate" => $aggiornate
        ]);
    } else {
        echo json_encode([
            "message" => "Nessuna bicicletta da aggiornare al momento."
        ]);
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(405); // Metodo non consentito
    echo json_encode(["error" => "Richiesta non valida."]);
}

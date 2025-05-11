<?php
include("connessioneDB.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    date_default_timezone_set('Europe/Rome'); // Imposta il fuso orario corretto
    $oraAttuale = date("H:i:s"); // Ottieni ora attuale nel formato HH:MM:SS

    // Seleziona biciclette con stato ancora occupato (0) e noleggio scaduto
    $query = "
        SELECT Biciclette.id_Bicicletta
        FROM Biciclette
        JOIN Noleggi ON Biciclette.id_Bicicletta = Noleggi.bicicletta
        WHERE Biciclette.stato = 0
        AND Noleggi.ora_Fine IS NOT NULL
        AND Noleggi.ora_Fine < ?
    ";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $oraAttuale);
    $stmt->execute();
    $result = $stmt->get_result();

    $aggiornate = [];

    // Per ogni bicicletta scaduta, aggiornare lo stato a 1 (disponibile)
    if ($result->num_rows > 0) {
        $updateStmt = $conn->prepare("UPDATE Biciclette SET stato = 1 WHERE id_Bicicletta = ?");
        
        while ($row = $result->fetch_assoc()) {
            $id_Bicicletta = $row['id_Bicicletta'];
            $updateStmt->bind_param("i", $id_Bicicletta);
            $updateStmt->execute();
            $aggiornate[] = $id_Bicicletta;
        }

        $updateStmt->close();
        echo json_encode([
            "messaggio" => "Stato aggiornato per le biciclette scadute.",
            "biciclette_aggiornate" => $aggiornate
        ]);
    } else {
        echo json_encode([
            "messaggio" => "Nessuna bicicletta da aggiornare al momento."
        ]);
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(405); // Metodo non consentito
    echo json_encode(["errore" => "Richiesta non valida."]);
}
?>
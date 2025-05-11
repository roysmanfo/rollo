<?php
header("Content-Type: application/json");
include("connessioneDB.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Decodifica eventuali dati JSON inviati (es. per ricevere ID utente)
    $input = json_decode(file_get_contents("php://input"), true);

    // Seleziona la prima bicicletta disponibile (stato = 1)
    $query = "SELECT id_Bicicletta FROM Biciclette WHERE stato = 1 LIMIT 1";
    $result = $conn->query($query);

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $id_Bicicletta = $row['id_Bicicletta'];

        // Imposta la bicicletta come occupata (stato = 0)
        $update = $conn->prepare("UPDATE Biciclette SET stato = 0 WHERE id_Bicicletta = ?");
        $update->bind_param("i", $id_Bicicletta);
        $success = $update->execute();

        if ($success) {
            echo json_encode([
                "id_bicicletta" => $id_Bicicletta,
                "stato" => 0,
                "messaggio" => "Bicicletta prenotata con successo."
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["errore" => "Errore durante l'aggiornamento dello stato."]);
        }

        $update->close();
    } else {
        http_response_code(404);
        echo json_encode(["errore" => "Nessuna bicicletta disponibile al momento."]);
    }

    $conn->close();
} else {
    http_response_code(405); // Metodo non consentito
    echo json_encode(["errore" => "Metodo non consentito. Usa POST."]);
}
?>
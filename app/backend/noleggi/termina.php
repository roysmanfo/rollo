<?php

/**
 * Inizia un nuovo noleggio
 * 
 * metodo: POST
 * parametri:
 *  - noleggio: id della bicicletta noleggiata
 *  - distanza: distanza percorsa dalla bicicletta noleggiata
 */


function time_difference($date, $startTime, $endTime)
{
    $startDateTime = new DateTime($date . ' ' . $startTime);
    $endDateTime = new DateTime($date . ' ' . $endTime);
    if ($endDateTime < $startDateTime) {
        $endDateTime->modify('+1 day');
    }
    $interval = $startDateTime->diff($endDateTime);
    $minutesDifference = ($interval->h * 60) + $interval->i;

    return $minutesDifference;
}

$PREZZO_PER_MINUTO = 1;

header("Content-Type: application/json");
include("../db/connessioneDB.php");
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!isset($_POST["noleggio"])) {
        http_response_code(400);
        echo json_encode(array("error" => "Parametri mancanti."));
        $conn->close();
        exit;
    }
    session_start();
    if (empty($_SESSION)) {
        echo json_encode(["error" => "Nessuna sessione trovata."]);
        exit;
    }
    if (!isset($_SESSION["id"])) {
        echo json_encode(["error" => "Utente non autenticato."]);
        exit;
    }

    $utente = htmlentities($_SESSION['id']);
    $noleggio_id = htmlentities($_POST['noleggio']);
    $distanza = htmlentities($_POST['distanza']);

    // ? controlla che il noleggio in questione sia attivo
    // ? e che sia effettivamente dell'utente che effettua la richiesta
    $stmt = $conn->prepare("SELECT id, data, ora_inizio FROM noleggi n
                                    WHERE id = ? AND utente = ?
                                    AND distanza_percorsa IS NULL;");
    $stmt->bind_param("ii", $noleggio_id, $utente);
    $stmt->execute();
    $noleggi = $stmt->get_result();
    if ($noleggi->num_rows == 0) {
        http_response_code(409);
        echo json_encode(array("error" => "Nessun noleggio attivo trovato per questo utente con l'id specificato"));
        $conn->close();
        $stmt->close();
        exit;
    }

    $noleggio = $noleggi->fetch_assoc();
    $stmt->close();

    // * termina il noleggio attivo
    $stmt = $conn->prepare("UPDATE noleggi
                                SET ora_fine = ?, distanza_percorsa = ?, prezzo = ?
                                WHERE id = ?;");
    $ora_fine = date("H:i:s");
    $prezzo = 1 + $PREZZO_PER_MINUTO * time_difference($noleggio["data"], $noleggio["ora_inizio"], $ora_fine);
    $stmt->bind_param("ssii", $ora_fine, $distanza, $prezzo, $noleggio_id);
    if ($stmt->execute()) {
        $stmt = $conn->prepare("SELECT * FROM noleggi
                                    WHERE id=?");
        $stmt->bind_param("i", $noleggio_id);
        $stmt->execute();
        if (($data = $stmt->get_result())->num_rows > 0) {
            $noleggio = $data->fetch_assoc();

            // * aggiorna la bici per segnarla come libera
            $updateStmt = $conn->prepare("UPDATE biciclette SET stato = 1 WHERE id = ?");
            $updateStmt->bind_param("i", $noleggio["bicicletta"]);
            $updateStmt->execute();
            $updateStmt->close();

            // * aggiorna il numero di token dell'utente
            $updateStmt = $conn->prepare("SELECT num_token FROM utenti WHERE id = ?");
            $updateStmt->bind_param("i", $utente);
            $updateStmt->execute();
            $num_token = $updateStmt->get_result()->fetch_assoc()["num_token"];
            $updateStmt->close();

            $updateStmt = $conn->prepare("UPDATE utenti SET num_token = ? WHERE id = ?");
            $num_token -= $prezzo;
            $updateStmt->bind_param("ii", $num_token, $utente);
            $updateStmt->execute();
            $updateStmt->close();
            $_SESSION["num_token"] = $num_token;

            echo json_encode(array("message" => "Noleggio aggiornato con successo", "noleggio" => $noleggio));
        } else {
            http_response_code(500);
            echo json_encode(array("error" => "Impossibile trovare il noleggio."));
        }
    } else {
        http_response_code(500);
        echo json_encode(array("error" => "Impossibile aggiornare il noleggio."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Richiesta non valida."));
}
$conn->close();

<?php

/**
 * Inizia un nuovo noleggio
 * 
 * metodo: POST
 * parametri:
 *  - bici: id della bicicletta noleggiata
 */

header("Content-Type: application/json");
include("../db/connessioneDB.php");
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!isset($_POST["bicicletta"])) {
        http_response_code(400);
        echo json_encode(array("error" => "Parametri mancanti."));
        $conn->close();
        exit;
    }
    session_start();
    if (!isset($_SESSION)) {
        echo json_encode(["error" => "Nessuna sessione trovata."]);
        exit;
    }


    $utente = htmlentities($_SESSION['id']);
    $bici_id = htmlentities($_POST['bicicletta']);

    // ? controlla che la bici non sia gia occupata
    $stmt = $conn->prepare("SELECT stato FROM biciclette WHERE id = ?;");
    $stmt->bind_param("i", $bici_id);
    $stmt->execute();
    if (($row = $stmt->get_result()->fetch_assoc())["stato"] != 1) {
        http_response_code(409);
        echo json_encode(array("error" => "Bicicletta gia in uso"));
        $conn->close();
        $stmt->close();
        exit;
    }
    $stmt->close();

    // ? controlla che l'utente non abbia gia altri noleggi avviati
    $stmt = $conn->prepare("SELECT id FROM noleggi WHERE utente = ? AND distanza_percorsa IS NULL;");
    $stmt->bind_param("i", $utente);
    $stmt->execute();
    if (($row = $stmt->get_result()->fetch_assoc())) {
        http_response_code(409);
        echo json_encode(array("error" => "L'utente ha gia un'altro noleggio attivo"));
        $conn->close();
        $stmt->close();
        exit;
    }
    $stmt->close();

    // ? controlla che l'utente abbia dei token per il noleggio
    $stmt = $conn->prepare("SELECT num_token FROM utenti WHERE id=?;");
    $stmt->bind_param("i", $utente);
    $stmt->execute();
    $row = $stmt->get_result()->fetch_assoc();
    if (empty($row) || $row["num_token"] <= 0) {
        http_response_code(409);
        echo json_encode(array("error" => "L'utente non ha abbastaza token per iniziare un nuovo noleggio"));
        $conn->close();
        $stmt->close();
        exit;
    }
    $stmt->close();

    // * inizia un nuovo noleggio
    $stmt = $conn->prepare("INSERT INTO noleggi (ora_inizio, utente, bicicletta) VALUES (?, ?, ?);");
    $time = date("H:i:s");
    $stmt->bind_param("sii", $time, $utente, $bici_id);
    if ($stmt->execute()) {
        $stmt = $conn->prepare("SELECT id, data FROM noleggi
                                    WHERE ora_inizio=? AND utente=? AND bicicletta=?;");
        $stmt->bind_param("sii", $time, $utente, $bici_id);
        $stmt->execute();
        if ($data = $stmt->get_result()->fetch_assoc()) {
            $noleggio = array(
                "id" => $data["id"],
                "data" => $data["data"],
                "ora_inizio" => $time,
                "utente" => $utente,
                "bicicletta" => $bici_id
            );

            // * aggiorna la bici per segnarla come occupata
            $updateStmt = $conn->prepare("UPDATE biciclette SET stato = 0 WHERE id = ?");
            $updateStmt->bind_param("i", $data["id"]);
            if ($updateStmt->execute());
            $updateStmt->close();

            echo json_encode(array("message" => "Noleggio aggiunto con successo", "noleggio" => $noleggio));
        } else {
            echo json_encode(array("error" => "Impossibile registrare il nuovo noleggio."));
        }
    } else {
        http_response_code(500);
        echo json_encode(array("error" => "Impossibile registrare il nuovo noleggio."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Richiesta non valida."));
}
$conn->close();

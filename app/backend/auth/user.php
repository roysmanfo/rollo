<?php

/**
 * Restituisce le informazioni piu aggiornate riguardanti un determinato utente
 * metodo: GET
 * parametri:
 *  - id: indentificatore dell'utente 
 */
header("Content-Type: application/json");
include("../db/connessioneDB.php");
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET["id"])) {
        $id = htmlentities($_GET["id"]);

        // sicurezza - controlla che l'id e il ruolo dell'utente
        session_start();
        if (!isset($_SESSION)) {
            echo json_encode(["error" => "Nessuna sessione trovata."]);
            exit;
        } else if (isset($_SESSION["id"]) && $_SESSION["id"] != $id) {
            // solo gli admin possono visualizzare le informazioni di altri utenti
            if (empty($_SESSION["ruolo"]) || $_SESSION["ruolo"] != "admin") {
                echo json_encode(["error" => "Non hai i necessari permessi per controllare lo storico di questo utente."]);
                exit;
            }
        }


        //preparazione della query
        $stmt = $conn->prepare("SELECT id, nome, cognome, ruolo, email, num_token FROM utenti WHERE id = ?;");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $_SESSION["id"] = $row["id"];
            $_SESSION["nome"] = $row["nome"];
            $_SESSION["cognome"] = $row["cognome"];
            $_SESSION["email"] = $row["email"];
            $_SESSION["ruolo"] = $row["ruolo"];
            $_SESSION["num_token"] = $row["num_token"];
            echo json_encode(array("message" => "Informazioni utente trovate con successo.", "user" => $_SESSION));
        } else {
            http_response_code(404);
            echo json_encode(array("error" => "Email non trovata."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("error" => "ID utente mancante."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("error" => "Richiesta non valida."));
}
$stmt->close();
$conn->close();

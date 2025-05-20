<?php

/**
 * Cerca informazioni su un determinato noleggio fatto da un utente
 * 
 * metodo: POST
 * parametri:
 *  - idNoleggio: id del noleggio
 */

header("Content-Type: application/json");
include("../db/connessioneDB.php");
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $idNoleggio = htmlentities($_POST['idNoleggio']);
    $stmt = $conn->prepare("SELECT N.id as id_noleggio, N.data, N.ora_inizio, N.ora_fine, N.prezzo, 
                                    U.id AS user_id, U.nome, U.cognome, B.modello
                                    FROM noleggi N
                                    JOIN utenti U ON N.utente = U.id
                                    JOIN biciclette B ON N.bicicletta = B.id
                                    WHERE N.id = ?;");
    $stmt->bind_param("i", $idNoleggio);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        $id_noleggio = htmlentities($row['id_noleggio']);
        $data = htmlentities($row['data']);
        $ora_inizio = htmlentities($row['ora_inizio']);
        $ora_fine = htmlentities($row['ora_fine']);
        $prezzo = htmlentities($row['prezzo']);
        $nome = htmlentities($row['nome']);
        $user_id = htmlentities($row['user_id']);
        $cognome = htmlentities($row['cognome']);
        $modello = htmlentities($row['modello']);
        $noleggio = array(
            "id" => $id_noleggio,
            "data" => $data,
            "ora_inizio" => $ora_inizio,
            "ora_fine" => $ora_fine,
            "prezzo" => $prezzo,
            "modello" => $modello,
            "user" => array(
                "id" => $user_id,
                "nome" => $nome,
                "cognome" => $cognome
            ),
        );
        echo json_encode(array("message" => "Noleggio trovato.", "noleggio" => $noleggio));
        exit;
    } else {
        echo json_encode(array("message" => "Nessun noleggio trovato."));
        exit;
    }
    $conn->close();
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Richiesta non valida."));
}

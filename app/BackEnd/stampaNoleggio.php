<?php
    include("connessioneDB.php");
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $nome = htmlentities($_POST['nome']);
        $cognome = htmlentities($_POST['cognome']);
        $query = $conn -> prepare("SELECT N.id, N.data, N.ora_inizio, N.ora_fine, N.prezzo, 
                                        U.nome, U.cognome, B.modello
                                        FROM noleggi N
                                        JOIN utenti U ON N.utente = U.id
                                        JOIN biciclette B ON N.bicicletta = B.id
                                        WHERE nome = ? AND cognome = ?;");
        $query -> bind_param("ss", $nome, $cognome);
        $query -> execute();
        $result = $query -> get_result();
        if($row = result -> fetch_assoc()){
            $id = htmlentities($row['id']);
            $data = htmlentities($row['data']);
            $ora_inizio = htmlentities($row['ora_inizio']);
            $ora_fine = htmlentities($row['ora_fine']);
            $prezzo = htmlentities($row['prezzo']);
            $nome = htmlentities($row['nome']);
            $cognome = htmlentities($row['cognome']);
            $modello = htmlentities($row['modello']);
            $noleggio = array(
                "id" => $id,
                "data" => $data,
                "ora_inizio" => $ora_inizio,
                "ora_fine" => $ora_fine,
                "prezzo" => $prezzo,
                "nome" => $nome,
                "cognome" => $cognome,
                "modello" => $modello
            );
            echo json_encode(array("message" => "Noleggio trovato.", "noleggio" => $noleggio));
            exit;
        } else {
            echo json_encode(array("message" => "Nessun noleggio trovato."));
            exit;
        }
        $conn->close();
        $query->close();
        $result->close(); 
    } else {
        echo json_encode(array("message" => "Richiesta non valida."));
    }
?>
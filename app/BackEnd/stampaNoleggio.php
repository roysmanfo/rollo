<?php
    /**
     * Seleziona un noleggio specifico a partire dall'id
     * metodo: POST
     * parametri:
     *  - idNoleggio: id del noleggio di cui vogliamo le informazioni
     */

    include("connessioneDB.php");
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $idNoleggio = htmlentities($_POST['idNoleggio']);
        $query = "SELECT N.id, N.data, N.ora_inizio, N.ora_fine, N.prezzo, 
                                        U.nome, U.cognome, B.modello
                                        FROM noleggi N
                                        JOIN utenti U ON N.utente = U.id
                                        JOIN biciclette B ON N.bicicletta = B.id;";
        $result -> query($query);
        if($row -> $result -> fetch_assoc()){
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
    } else {
        http_response_code(405);
        echo json_encode(array("message" => "Richiesta non valida."));
    }
?>
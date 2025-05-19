<?php
    /**
     * Restituisce lo storico noleggi per utente.
     * metodo: GET
     * parametri:
     *  - id: id del noleggio di cui vogliamo le informazioni
     */
    header("Content-Type: application/json");
    include("../db/connessioneDB.php");
    if($_SERVER['REQUEST_METHOD'] == 'GET') {

        if (!isset($_GET['id'])){
            echo json_encode(["error"=>"ID utente mancante."]);
            exit;
        }
        $uid = htmlentities($_GET['id']);

        // sicurezza - controlla che l'id e il ruolo dell'utente
        session_start();
        if (!isset($_SESSION)){
            echo json_encode(["error"=>"Nessuna sessione trovata."]);
            exit;

        } else if (isset($_SESSION["id"]) && $_SESSION["id"] !== $uid){
            // solo gli admin possono visualizzare le informazioni di altri utenti
            if (empty($_SESSION["ruolo"]) || $_SESSION["ruolo"] !== "admin"){
                echo json_encode(["error"=>"Non hai i necessari permessi per controllare lo storico di questo utente."]);
                exit;
            }
        }

        $query = $conn -> prepare("SELECT N.id AS noleggio_id, N.data, N.ora_inizio, N.ora_fine, N.prezzo, N.distanza_percorsa,
                                        B.id AS bicicletta_id, B.modello
                                        FROM noleggi N
                                        JOIN utenti U ON N.utente = U.id
                                        JOIN biciclette B ON N.bicicletta = B.id
                                        WHERE U.id = ? AND N.ora_fine IS NOT NULL;");
        $query -> bind_param("s", $uid);
        $query -> execute();
        $result = $query -> get_result();
        if($result -> num_rows > 0){
            $noleggi = array();
            while($row = $result -> fetch_assoc()) {
                $id = htmlentities($row['noleggio_id']);
                $data = htmlentities($row['data']);
                $ora_inizio = htmlentities($row['ora_inizio']);
                $ora_fine = htmlentities($row['ora_fine']);
                $distanza_percorsa = htmlentities($row['distanza_percorsa']);
                $prezzo = htmlentities($row['prezzo']);
                $modello = htmlentities($row['modello']);
                $bicicletta = htmlentities($row['bicicletta_id']);
                $noleggio = array(
                    "id" => $id,
                    "data" => $data,
                    "ora_inizio" => $ora_inizio,
                    "distanza_percorsa" => $distanza_percorsa,
                    "ora_fine" => $ora_fine,
                    "prezzo" => $prezzo,
                    "bicicletta" => $bicicletta,
                    "modello" => $modello
                );
                array_push($noleggi, $noleggio);
            }
            echo json_encode(array("message" => "Noleggio trovato.", "noleggi" => $noleggi));
            exit;
        } else {
            echo json_encode(array("message" => "Nessun noleggio trovato."));
            exit;
        }
        $conn->close();
        $query->close();
        $result->close(); 
    } else {
        http_response_code(405);
        echo json_encode(array("error" => "Richiesta non valida."));
    }
?>
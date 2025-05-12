<?php
    include("connessioneDB.php");
    if($_SERVER["REQUEST_METHOD"]=="POST"){
        if(isset($_POST["email"], $_POST["password"])){
            $email = htmlentities($_POST["email"]);
            $password = htmlentities($_POST["password"]);
            
            //preparazione della query
            $stmt = $conn -> prepare("SELECT id, nome, cognome, email, password FROM utenti WHERE email = ?;");
            $stmt -> bind_param("s", $email);
            $stmt -> execute();
            $result = $stmt -> get_result();
            
            if($result -> num_rows > 0){
                $row = $result -> fetch_assoc();
                if(password_verify($password, $row["password"])){
                    session_start();
                    $_SESSION["id"] = $row["id"];
                    $_SESSION["nome"] = $row["nome"];
                    $_SESSION["cognome"] = $row["cognome"];
                    $_SESSION["email"] = $row["email"];
                    $login = array(
                        "id" => $row["id"],
                        "nome" => $row["nome"],
                        "cognome" => $row["cognome"],
                        "email" => $row["email"]
                    );
                    echo json_encode(array("messaggio" => "Login effettuato con successo.", "login" => $login));
                }else{
                    http_response_code(401);
                    echo json_encode(array("errore" => "Password errata."));
                }
            }else{
                http_response_code(404);
                echo json_encode(array("errore" => "Email non trovata."));
            }
        }else{
            http_response_code(400);
            echo json_encode(array("errore" => "Parametri mancanti."));
        }
        $stmt -> close();
        $conn -> close();
    }
?>
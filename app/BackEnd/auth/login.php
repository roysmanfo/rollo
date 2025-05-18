<?php
    header("Content-Type: application/json");
    include("../db/connessioneDB.php");
    if($_SERVER["REQUEST_METHOD"]=="POST"){
        if(isset($_POST["email"], $_POST["password"])){
            $email = htmlentities($_POST["email"]);
            $password = htmlentities($_POST["password"]);
            
            //preparazione della query
            $stmt = $conn -> prepare("SELECT id, nome, cognome, ruolo, email, password, num_token FROM utenti WHERE email = ?;");
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
                    $_SESSION["ruolo"] = $row["ruolo"];
                    $_SESSION["num_token"] = $row["num_token"];
                    echo json_encode(array("message" => "Login effettuato con successo.", "user" => $_SESSION));
                }else{
                    http_response_code(401);
                    echo json_encode(array("error" => "Password errata."));
                }
            }else{
                http_response_code(404);
                echo json_encode(array("error" => "Email non trovata."));
            }
        }else{
            http_response_code(400);
            echo json_encode(array("error" => "Parametri mancanti."));
        }
        $stmt -> close();
    }
    $conn -> close();
?>
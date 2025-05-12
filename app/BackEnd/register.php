<?php
include("connessioneDB.php");
if($_SERVER["REQUEST_METHOD"]=="POST"){
    if(isset($_POST["nome"], $_POST["cognome"], $_POST["email"], $_POST["password"])){
        $nome = htmlentities($_POST["nome"]);
        $cognome = htmlentities($_POST["cognome"]);
        $email = htmlentities($_POST["email"]);
        $salt = bin2hex(random_bytes(16)); // Genera un sale casuale
        $password = hash("sha256", $salt . htmlentities($_POST["password"])); // Hash della password con il sale
        $emailGiaPresente = $conn -> prepare("SELECT * FROM utenti WHERE email = ?;");
        $emailGiaPresente -> bind_param("s", $email);
        $emailGiaPresente -> execute();
        $result = $emailGiaPresente -> get_result();
        if($result -> num_rows > 0){
            http_response_code(409);
            echo json_encode(array("errore" => "Email già registrata."));
            exit;
        }
        $emailGiaPresente = mysqli_query($conn, "SELECT * FROM Utente WHERE email='$email'");
        $count = mysqli_num_rows($emailGiaPresente);
        if($count > 0){
            http_response_code(409);
            echo json_encode(array("errore" => "Email già registrata."));
            exit;
        }
        //Controllo se l'email è già registrata
        if($count > 0){
            $otp = rand(100000, 999999);
            require_once("mail_function.php");
            $mail_status = sendOTP($email, $otp);
            if($mail_status == 1){
                // safe query, no user-controlled parameters
                $result = mysqli_query($conn, "INSERT INTO otp_expiry(otp,is_expired,create_at) VALUES ('" . $otp . "', 0, '" . date("Y-m-d H:i:s"). "')");
                $current_id = mysqli_insert_id($conn);
                if(!empty($current_id)){
                    $success = 1;
                }
            }
        }

            if(!empty($_POST["submit_otp"])){
                $emailGiaPresente = mysqli_query($conn,"SELECT * FROM otp_expiry WHERE otp='" . $_POST["otp"] . "' AND is_expired!=1 AND NOW() <= DATE_ADD(create_at, INTERVAL 24 HOUR)");
                $count = mysqli_num_rows($emailGiaPresente);
                //Controllo se l'OTP è valido    
                if(!empty($count)){
                    $result = mysqli_query($conn,"UPDATE otp_expiry SET is_expired = 1 WHERE otp = '" . $_POST["otp"] . "'");
                    $success = 2;
                }else{
                    $success = 1;
                    $error_message = "OTP invalido!";
                }
        //preparazione della query
        $stmt = $conn -> prepare("INSERT INTO utenti (nome, cognome, email, password) VALUES (?, ?, ?, ?);");
        $stmt -> bind_param("ssss", $nome, $cognome, $email, $password);
        
        if($stmt -> execute()){
            echo json_encode(array("messaggio" => "Registrazione avvenuta con successo."));
        }else{
            http_response_code(500);
            echo json_encode(array("errore" => "Errore durante la registrazione."));
        }
    }else{
        http_response_code(400);
        echo json_encode(array("errore" => "Parametri mancanti."));
    }
    $returned = $stmt -> get_result();
    if($returned -> num_rows > 0){
        $row = $returned -> fetch_assoc();
        $id = htmlentities($row["id"]);
        $nome = htmlentities($row["nome"]);
        $cognome = htmlentities($row["cognome"]);
        $email = htmlentities($row["email"]);
        echo json_encode(array("messaggio" => "Registrazione avvenuta con successo.", "id" => $id, "nome" => $nome, "cognome" => $cognome, "email" => $email));
    }else{
        http_response_code(500);
        echo json_encode(array("errore" => "Errore durante la registrazione."));
    }
    $result -> close();
    $stmt -> close();
    $conn -> close();
}else{
    http_response_code(405);
    echo json_encode(array("errore" => "Metodo non consentito."));
}
}
?>
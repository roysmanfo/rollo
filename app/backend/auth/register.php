<?php
header("Content-Type: application/json");
include("../db/connessioneDB.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["nome"], $_POST["cognome"], $_POST["email"], $_POST["password"])) {
        $nome = htmlentities($_POST["nome"]);
        $cognome = htmlentities($_POST["cognome"]);
        $email = htmlentities($_POST["email"]);
        // $salt = bin2hex(random_bytes(16)); // Genera un sale casuale
        // ? non viene salvato il salt, quindi non lo possiamo usare senza modificare il database
        $password = password_hash($_POST["password"], PASSWORD_BCRYPT); // Hash della password
        $emailGiaPresente = $conn->prepare("SELECT * FROM utenti WHERE email = ?;");
        $emailGiaPresente->bind_param("s", $email);
        $emailGiaPresente->execute();
        $count = $emailGiaPresente->get_result()->num_rows;
        if ($count > 0) {
            http_response_code(409);
            echo json_encode(array("error" => "Email già registrata."));
            exit;
        }
        //Controllo se l'email è già registrata
        // !! mai eseguito (grazie all'controllo qua sopra)
        if ($count > 0) {
            $otp = rand(100000, 999999);
            require_once("mail_function.php");
            $mail_status = sendOTP($email, $otp);
            if ($mail_status == 1) {
                // safe query, no user-controlled parameters
                $result = mysqli_query($conn, "INSERT INTO otp_expiry(otp,is_expired,create_at) VALUES ('" . $otp . "', 0, '" . date("Y-m-d H:i:s") . "')");
                $current_id = mysqli_insert_id($conn);
                if (!empty($current_id)) {
                    $success = 1;
                }
            }
        }


        $devBypass = true; // ? <- nessun server SMTP al momento
        if ($devBypass || !empty($_POST["submit_otp"])) {
            // se non abbiamo skippato pure il 2fa allora effettua i controlli necessari 
            if (!empty($_POST["submit_otp"])) {
                $emailGiaPresente = mysqli_query($conn, "SELECT * FROM otp_expiry WHERE otp='" . $_POST["otp"] . "' AND is_expired!=1 AND NOW() <= DATE_ADD(create_at, INTERVAL 24 HOUR)");
                $count = mysqli_num_rows($emailGiaPresente);
                //Controllo se l'OTP è valido    
                if (!empty($count)) {
                    $result = mysqli_query($conn, "UPDATE otp_expiry SET is_expired = 1 WHERE otp = '" . $_POST["otp"] . "'");
                    $success = 2;
                } else {
                    $success = 1;
                    $error_message = "OTP invalido!";
                }
            }

            //preparazione della query
            $stmt = $conn->prepare("INSERT INTO utenti (nome, cognome, email, password) VALUES (?, ?, ?, ?);");
            $stmt->bind_param("ssss", $nome, $cognome, $email, $password);
            if ($stmt->execute()) {
                // prendi l'id dell'utente appena registrato per restituirlo
                $stmt = $conn->prepare("SELECT id, num_token, ruolo FROM utenti WHERE email=?;");
                $stmt->bind_param("s", $email);
                $stmt->execute();
                $res = $stmt->get_result();
                $usr = $res->fetch_assoc();

                $user = array(
                    "id" => $usr["id"],
                    "nome" => $nome,
                    "cognome" => $cognome,
                    "email" => $email,
                    "ruolo" => $row["ruolo"],
                    "num_token" => $usr["num_token"]
                );
                echo json_encode(array("message" => "Registrazione avvenuta con successo.", "user" => $user));
            } else {
                http_response_code(500);
                echo json_encode(array("error" => "Errore durante la registrazione."));
            }
            $stmt->close();
        } else {
            http_response_code(400);
            echo json_encode(array("error" => "OTP mancante."));
        }
        $result->close();
    } else {
        http_response_code(400);
        echo json_encode(array("error" => "Parametri mancanti."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("error" => "Metodo non consentito."));
}

$conn->close();

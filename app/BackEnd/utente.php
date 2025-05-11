<?php
    /**
     * Gestione dell'utente
     * 
     * metodo: POST
     * parametri:
     *  - idUtente: id dell'utente
     *  - nome: nome dell'utente
     *  - cognome: cognome dell'utente
     *  - email: email dell'utente
     *  - password: password dell'utente
     *  - submit_otp?: indica che il client sta inviando un OTP
     *    - otp: OTP inviato dall'utente
     */

//connessione database e verifica
include(connessioneDB.php);
if($mysqli -> connect_error){
    die("Connection failed: " . mysqli -> connect_error);
}
//controllo metodo server uguale a post
if($_SERVER[REQUEST_METHOD]=="POST"){
    // $stmt = $mysqli -> prepare("SELECT * FROM Utenti WHERE ");
    //Inserimento informazioni Utente
    $idUtente = htmlentities($_POST['idUtente']);
    $nome = htmlentities($_POST['nome']);
    $cognome = htmlentities($_POST['cognome']);
    $email = htmlentities($_POST['email']);
    //Generazione codice OTP per email
    if(!empty($email)){
        $resultEmail = mysqli_query($conn, "SELECT * FROM Utente WHERE email='$email'");
        $count = mysqli_num_rows($resultEmail);
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
        } else{ 
            $error_message = "L'email non esiste!";
        }
   }
   if(!empty($_POST["submit_otp"])){
    $resultEmail = mysqli_query($conn,"SELECT * FROM otp_expiry WHERE otp='" . $_POST["otp"] . "' AND is_expired!=1 AND NOW() <= DATE_ADD(create_at, INTERVAL 24 HOUR)");
    $count = mysqli_num_rows($resultEmail);
    if(!empty($count)){
        $result = mysqli_query($conn,"UPDATE otp_expiry SET is_expired = 1 WHERE otp = '" . $_POST["otp"] . "'");
        $success = 2;
    }else{
        $success = 1;
        $error_message = "OTP invalido!";
    }
}
    //Gestione password
    $password = htmlentities($_POST['password']);
    $salt = bin2hex(random_bytes(16));
    $saltedPassword = $salt . $password;
    $hashedPassword = hash('sha256', $saltedPassword);

    // TODO: effettivamente prendere questi valori
    $saltFromDb = $row['salt'];
    $hashFromDb = $row['hashed_password'];
    $checkHash = hash('sha256', $saltFromDb . $inputPassword);
    //Controllo correttezza password
    if ($checkHash === $hashFromDb) {
        echo "Password corretta!";
    } else {
        echo "Password errata!";
    }

} else {
    echo json_encode(array("message"=>"Richiesta non valida."));
}
?>
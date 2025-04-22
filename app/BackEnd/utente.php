<?php
include(connessioneDB.php);
if($_SERVER[REQUEST_METHOD]=="POST"){
    $db = new DB();

    $utente = new Utente($db->getConnection());

    $idUtente->htmlentities($_POST['idUtente']);
    $nome->htmlentities($_POST['nome']);
    $cognome->htmlentities($_POST['cognome']);
    $email->htmlentities($_POST['email']);

    $password->htmlentities($_POST['password']);
    $salt = bin2hex(random_bytes(16));
    $saltedPassword = $salt . $password;
    $hashedPassword = hash('sha256', $saltedPassword);
    $saltFromDb = $row['salt'];
    $hashFromDb = $row['hashed_password'];
    $checkHash = hash('sha256', $saltFromDb . $inputPassword);
    if ($checkHash === $hashFromDb) {
        echo "Password corretta!";
    } else {
        echo "Password errata!";
    }

    if($utente->update()){
        echo json_encode(array("message"=>"Utente aggiornato con successo."));
    }else{
        echo json_encode(array("message"=>"Errore durante l'aggiornamento dell'utente."));
    }
} else {
    echo json_encode(array("message"=>"Richiesta non valida."));
}
?>
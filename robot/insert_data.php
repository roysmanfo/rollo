<?php
$servername = "localhost"; // Cambia con l'indirizzo del tuo server se non è in locale
$username = "root"; // Il nome utente di MySQL
$password = ""; // La password di MySQL
$dbname = "rollo"; // Il nome del tuo database

// Crea la connessione
$conn = new mysqli($servername, $username, $password, $dbname);

// Controlla la connessione
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Ottieni i dati inviati tramite GET (modifica come necessario, es. POST)
$latitudine = $_GET['latitudine'];
$longitudine = $_GET['longitudine'];
$id_bicicletta = $_GET['id'];

// Query per inserire i dati nel database
$sql = "INSERT INTO iot (latitudine, longitudine, data_Installazione, data_Revisione)
VALUES ('$latitudine', '$longitudine', NOW(), DATE_ADD(NOW(), INTERVAL 1 YEAR))";

if ($conn->query($sql) === TRUE) {
    echo "Dati inseriti con successo";
} else {
    echo "Errore: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

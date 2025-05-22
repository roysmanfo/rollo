<?php
// Connessione al database
$servername = "localhost";
$username = "root";  // Modifica con il tuo username MySQL
$password = "";      // Modifica con la tua password MySQL
$dbname = "rollo";   // Nome del tuo database

// Crea la connessione
$conn = new mysqli($servername, $username, $password, $dbname);

// Controlla la connessione
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

// Query per ottenere i dati dell'utente
$query = "SELECT nome, cognome, email, num_token FROM utenti WHERE email = 'francesco.russo@email.com'"; // Modifica con la tua logica di associazione
$result = $conn->query($query);

// Verifica se ci sono risultati
if ($result->num_rows > 0) {
    // Prendi i dati dell'utente
    $row = $result->fetch_assoc();
    $data = array(
        'nome' => $row['nome'],
        'cognome' => $row['cognome'],
        'email' => $row['email'],
        'num_token' => $row['num_token']
    );
    echo json_encode($data); // Restituisce i dati come JSON
} else {
    echo json_encode(array('error' => 'Utente non trovato'));
}

// Chiudi la connessione
$conn->close();
?>

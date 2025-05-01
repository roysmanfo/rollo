<?php
$servername = "localhost";  // O l'IP del server
$username = "root";
$password = "";
$dbname = "rollo";  // Il nome del database che stai usando

// Crea la connessione
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la connessione
if ($conn->connect_error) {
  die("Connessione fallita: " . $conn->connect_error);
}

$sql = "SELECT id, modello FROM biciclette LIMIT 5";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  echo "<table><tr><th>ID Bicicletta</th><th>Modello</th></tr>";
  // Stampa i dati di ciascun record
  while($row = $result->fetch_assoc()) {
    echo "<tr><td>" . $row["id"] . "</td><td>" . $row["modello"] . "</td></tr>";
  }
  echo "</table>";
} else {
  echo "0 risultati";
}

$conn->close();
?>

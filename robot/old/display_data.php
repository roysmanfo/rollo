<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rollo";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM IoT";
$result = $conn->query($sql);

echo "<table style='width:100%; border:1px solid black;'>";
echo "<tr><th>ID</th><th>Latitudine</th><th>Longitudine</th><th>Data Installazione</th><th>Data Revisione</th></tr>";

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>" . $row["id"]. "</td><td>" . $row["latitudine"]. "</td><td>" . $row["longitudine"]. "</td><td>" . $row["data_Installazione"]. "</td><td>" . $row["data_Revisione"]. "</td></tr>";
    }
    echo "</table>";
} else {
    echo "0 results";
}

$conn->close();
?>

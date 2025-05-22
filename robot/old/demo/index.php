<!DOCTYPE html>
<html lang="it">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Test Comunicazione ESP32</title>
		<style>
			body {
				font-family: Arial, sans-serif;
				padding: 20px;
				background-color: #f0f0f0;
			}
			table {
				width: 100%;
				border-collapse: collapse;
				margin-top: 20px;
			}
			table,
			th,
			td {
				border: 1px solid #ddd;
			}
			th,
			td {
				padding: 8px;
				text-align: left;
			}
			th {
				background-color: #f2f2f2;
			}
		</style>
	</head>
	<body>
		<h1>Test Comunicazione con il Database</h1>
		<p>Visualizza le biciclette nel database:</p>
		<?php include 'database.php'; ?>
	</body>
</html>

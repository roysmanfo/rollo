<?php
	//Utilizzo header per prendere la longitudine e la latitudine dallo script Arduino ogni tot. secondi
	include("connessioneXAMPP.php");
	$data = json_decode(file_get_contents("php://input"),true);
	if($_SERVER["REQUEST_METHOD"]=="POST"){
		if(isset($data["id_dispositivo"], $data["latitudine"], $data["longitudine"])){
			//estrazione dei valori passati dallo script Arduino tramite Json
			$longitudine = $data["longitudine"];
			$latitudine = $data["latitudine"];
			$id_dispositivo = $data["id_dispositivo"];
			
			//preparazione dei valori e inserimento nella query
			$stmt = $conn -> prepare("UPDATE IoT SET latitudine = ?, longitudine = ? WHERE id_Dispositivo = ?");
			$stmt -> bind_param("ddi", $latitudine, $longitudine, $id_dispositivo);
			$ris = $stmt -> execute();
			
			if($ris && $stmt -> affected_rows>0){
				echo json_encode(array("messaggio" => "posizione aggiornata"));
			}else{
				echo json_encode(array("errore" => "Dispositivo non trovato o nessuna modifica apportata alla posizione"));
			}
		}else{
			http_response_code(400);
			echo json_encode(["errore" => "Parametri mancanti."]);
		}
		$stmt -> close();
		$conn -> close();
	}else{
		http_response_code(405);
		echo json_encode(["errore" => "Metodo non consentito."]);
	}
?>
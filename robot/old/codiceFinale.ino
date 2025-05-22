/* #include <WiFi.h>
#include <HTTPClient.h>
#include <TinyGPS++.h>
#include <Wire.h>
#include <SoftwareSerial.h>

const char* ssid = "NomeRete";  // Nome della tua rete Wi-Fi
const char* password = "PasswordRete";  // Password della tua rete Wi-Fi

TinyGPSPlus gps;
SoftwareSerial ss(4, 5); // RX, TX per il modulo GPS Neo-6M

void setup() {
  Serial.begin(115200);
  ss.begin(9600);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connessione alla rete Wi-Fi...");
  }
  Serial.println("Connesso alla rete Wi-Fi!");
}

void loop() {
  while (ss.available() > 0) {
    gps.encode(ss.read());
  }

  if (gps.location.isUpdated()) {
    float lat = gps.location.lat();
    float lng = gps.location.lng();

    HTTPClient http;
    String url = "http://<IP_SERVER>/insert_data.php?latitudine=" + String(lat, 6) + "&longitudine=" + String(lng, 6) + "&id_bicicletta=2001";
    http.begin(url);
    int httpCode = http.GET();

    if (httpCode > 0) {
      String payload = http.getString();
      Serial.println(payload);
    } else {
      Serial.println("Errore nella richiesta HTTP");
    }

    http.end();
  }

  delay(5000);  // Invia i dati ogni 5 secondi
}
*/
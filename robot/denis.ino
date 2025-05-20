#include <WiFi.h>
#include <HTTPClient.h>
#include <TinyGPSPlus.h>
#include <SoftwareSerial.h>
#include <Servo.h>
#include <LiquidCrystal.h>

// Configurazione WiFi
const char* ssid = "NOME_RETE_WIFI";       // Sostituisci con il nome della tua rete WiFi
const char* password = "PASSWORD_WIFI";    // Sostituisci con la password della tua rete WiFi

// URL del backend PHP
const char* serverName = "http://rollo.altervista.com/api/update_location.php";

// Inizializzazione del modulo GPS
static const int RXPin = 16, TXPin = 17;
static const uint32_t GPSBaud = 9600;
TinyGPSPlus gps;
SoftwareSerial ss(RXPin, TXPin);

// Inizializzazione del servo motore
Servo lockServo;
const int servoPin = 14;
bool isLocked = true;

// Inizializzazione del buzzer e dei LED
const int buzzerPin = 5;
const int greenLEDPin = 18;
const int redLEDPin = 19;

// Inizializzazione del display LCD (16x2)
const int rs = 21, en = 22, d4 = 23, d5 = 24, d6 = 25, d7 = 26;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

// Variabili per la gestione del tempo
unsigned long previousMillis = 0;
const long interval = 5000; // Intervallo di 5 secondi

void setup() {
  // Inizializzazione della comunicazione seriale
  Serial.begin(115200);
  ss.begin(GPSBaud);

  // Inizializzazione dei pin
  pinMode(buzzerPin, OUTPUT);
  pinMode(greenLEDPin, OUTPUT);
  pinMode(redLEDPin, OUTPUT);

  // Inizializzazione del servo motore
  lockServo.attach(servoPin);
  lockServo.write(0); // Stato iniziale: bloccato

  // Inizializzazione del display LCD
  lcd.begin(16, 2);
  lcd.print("Inizializzazione...");

  // Connessione alla rete WiFi
  WiFi.begin(ssid, password);
  lcd.setCursor(0, 1);
  lcd.print("Connessione WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  lcd.clear();
  lcd.print("WiFi connesso");
  delay(1000);
  lcd.clear();
}

void loop() {
  // Lettura dei dati dal modulo GPS
  while (ss.available() > 0) {
    gps.encode(ss.read());
  }

  // Verifica se i dati GPS sono disponibili
  if (gps.location.isUpdated()) {
    float latitude = gps.location.lat();
    float longitude = gps.location.lng();

    // Invio dei dati al server
    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      http.begin(serverName);
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");

      // Creazione dei dati da inviare
      String httpRequestData = "latitude=" + String(latitude, 6) + "&longitude=" + String(longitude, 6);

      // Invio della richiesta POST
      int httpResponseCode = http.POST(httpRequestData);

      // Gestione della risposta del server
      if (httpResponseCode > 0) {
        String response = http.getString();
        Serial.println(httpResponseCode);
        Serial.println(response);

        // Analisi della risposta per determinare lo stato della bici
        if (response.indexOf("locked") >= 0 && !isLocked) {
          lockBike();
        } else if (response.indexOf("unlocked") >= 0 && isLocked) {
          unlockBike();
        }
      } else {
        Serial.print("Errore nella richiesta HTTP: ");
        Serial.println(httpResponseCode);
        errorSignal();
      }
      http.end();
    } else {
      Serial.println("WiFi non connesso");
      errorSignal();
    }

    // Aggiornamento del display LCD
    lcd.setCursor(0, 0);
    lcd.print("Lat: ");
    lcd.print(latitude, 2);
    lcd.setCursor(0, 1);
    lcd.print("Lon: ");
    lcd.print(longitude, 2);
  }

  // Attesa prima del prossimo aggiornamento
  delay(interval);
}

// Funzione per sbloccare la bici
void unlockBike() {
  lockServo.write(90); // Posizione di sblocco
  isLocked = false;
  successSignal();
  lcd.clear();
  lcd.print("Bici sbloccata");
  delay(1000);
  lcd.clear();
}

// Funzione per bloccare la bici
void lockBike() {
  lockServo.write(0); // Posizione di blocco
  isLocked = true;
  successSignal();
  lcd.clear();
  lcd.print("Bici bloccata");
  delay(1000);
  lcd.clear();
}

// Segnale di successo: suono positivo e LED verde
void successSignal() {
  tone(buzzerPin, 1000, 200); // Tono di 1000 Hz per 200 ms
  digitalWrite(greenLEDPin, HIGH);
  delay(200);
  digitalWrite(greenLEDPin, LOW);
}

// Segnale di errore: suono negativo e LED rosso
void errorSignal() {
  for (int i = 0; i < 2; i++) {
    tone(buzzerPin, 400, 150); // Tono di 400 Hz per 150 ms
    digitalWrite(redLEDPin, HIGH);
    delay(150);
    noTone(buzzerPin);
    digitalWrite(redLEDPin, LOW);
    delay(100);
  }
}

#include <WiFi.h>
#include <HTTPClient.h>
#include <TinyGPSPlus.h>
#include <HardwareSerial.h>
#include <LiquidCrystal.h>
#include <Servo.h>
#include <ArduinoJson.h>

// === PLACEHOLDER GPIO ===
#define SERVO_PIN         /14  // GPIO per il controllo del servomotore
#define BUZZER_PIN        /5   // GPIO per il buzzer
#define LCD_RS_PIN        27  // GPIO per RS del display LCD
#define LCD_E_PIN         26  // GPIO per E del display LCD
#define LCD_D4_PIN        25  // GPIO per D4 del display LCD
#define LCD_D5_PIN        33  // GPIO per D5 del display LCD
#define LCD_D6_PIN        32  // GPIO per D6 del display LCD
#define LCD_D7_PIN        14  // GPIO per D7 del display LCD
#define GPS_RX_PIN        16  // GPIO per RX del modulo GPS
#define GPS_TX_PIN        4   // GPIO per TX del modulo GPS
#define greenLEDPin       /18;
#define redLEDPin         /19;


// === WiFi ===
const char* ssid = "iPhone di Francesco";         // Sostituire con il nome della rete WiFi
const char* password = "012345678"; // Sostituire con la password della rete WiFi

// === Server PHP ===
const char* serverGetURL = "http://rollo.altervista.org/api/get_bike_data.php";
const char* serverPostURL = "http://rollo.altervista.org/api/post_gps.php";

// === Oggetti ===
LiquidCrystal lcd(LCD_RS_PIN, LCD_E_PIN, LCD_D4_PIN, LCD_D5_PIN, LCD_D6_PIN, LCD_D7_PIN);
HardwareSerial gpsSerial(1); // Utilizzo della seconda porta seriale per il GPS
TinyGPSPlus gps;             // Oggetto per la gestione del GPS
Servo lockServo;             // Oggetto per il controllo del servomotore

// === Variabili di stato ===
bool statoBici = false;      // Stato della bici: true = sbloccata, false = bloccata
float lat = 0.0, lon = 0.0;  // Coordinate GPS
int tokenUtente = 0;         // Numero di token dell'utente
int distanzaMappa = 0;       // Distanza dalla mappa in metri
unsigned long lastUpdate = 0; // Timestamp dell'ultimo aggiornamento

void setup() {
  Serial.begin(115200); // Inizializzazione della porta seriale per il debug
  lcd.begin(16, 2);     // Inizializzazione del display LCD 16x2
  lcd.print("Avvio...");

  // Inizializzazione del modulo GPS
  gpsSerial.begin(9600, SERIAL_8N1, GPS_RX_PIN, GPS_TX_PIN);

  // Configurazione del buzzer e del servomotore
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(greenLEDPin, OUTPUT);
  pinMode(redLEDPin, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);
  lockServo.attach(SERVO_PIN);
  lockServo.write(0); // Stato iniziale: bloccato

  // Connessione alla rete WiFi
  WiFi.begin(ssid, password);
  lcd.setCursor(0, 1);
  lcd.print("Connessione WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  lcd.clear();
  lcd.print("Connesso!");
  delay(1000);
  lcd.clear();
}

void loop() {
  // Lettura dei dati dal modulo GPS
  while (gpsSerial.available()) {
    gps.encode(gpsSerial.read());
  }

  // Aggiornamento delle coordinate GPS se disponibili
  if (gps.location.isUpdated()) {
    lat = gps.location.lat();
    lon = gps.location.lng();
  }

  unsigned long currentMillis = millis();
  if (currentMillis - lastUpdate >= 5000) {
    lastUpdate = currentMillis;

    // Invio delle coordinate GPS al server
    HTTPClient http;
    http.begin(serverPostURL);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    String gpsData = "lat=" + String(lat, 6) + "&lon=" + String(lon, 6);
    int httpResponseCode = http.POST(gpsData);
    http.end();

    // Richiesta dei dati di stato dal server
    http.begin(serverGetURL);
    int code = http.GET();
    if (code == 200) {
      String payload = http.getString();
      // Esempio JSON: {"stato":1,"token":120,"distanza":25}
      DynamicJsonDocument doc(256);
      deserializeJson(doc, payload);
      statoBici = doc["stato"];
      tokenUtente = doc["token"];
      distanzaMappa = doc["distanza"];
    }
    http.end();

    // Visualizzazione delle coordinate GPS sul display LCD
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Lat:");
    lcd.print(lat, 2);
    lcd.setCursor(0, 1);
    lcd.print("Lon:");
    lcd.print(lon, 2);

    // Controllo del servomotore in base allo stato della bici
    if (statoBici) {
      lockServo.write(0); // Sbloccato
    } else {
      lockServo.write(90); // Bloccato
    }

    // Gestione del blocco forzato in base ai token e alla distanza dalla mappa
    if (tokenUtente <= 15) {
      suonoAllerta();
      countdownEBlocco();
    } else if (distanzaMappa <= 2) {
      suonoUscitaMappaLunga();
      countdownEBlocco();
    } else if (distanzaMappa <= 10) {
      suonoPatternContinuo();
    } else if (distanzaMappa <= 20) {
      suonoTreBeep();
    }
  }
}

// Funzione per emettere un suono di allerta quando i token stanno per esaurirsi
void suonoAllerta() {
  for (int i = 0; i < 10; i++) {
    digitalWrite(BUZZER_PIN, HIGH);
    delay(200);
    digitalWrite(BUZZER_PIN, LOW);
    delay(200);
  }
}

// Funzione per emettere un suono lungo quando si è usciti dalla mappa
void suonoUscitaMappaLunga() {
  digitalWrite(BUZZER_PIN, HIGH);
  delay(10000);
  digitalWrite(BUZZER_PIN, LOW);
}

// Funzione per emettere un pattern sonoro continuo quando si è vicini al limite della mappa
void suonoPatternContinuo() {
  for (int i = 0; i < 5; i++) {
    digitalWrite(BUZZER_PIN, HIGH);
    delay(300);
    digitalWrite(BUZZER_PIN, LOW);
    delay(300);
  }
}

// Funzione per emettere tre beep consecutivi quando si è a 20 metri dal limite della mappa
void suonoTreBeep() {
  for (int i = 0; i < 3; i++) {
    digitalWrite(BUZZER_PIN, HIGH);
    delay(500);
    digitalWrite(BUZZER_PIN, LOW);
    delay(500);
  }
}

// Funzione per eseguire un countdown e bloccare la bici
void countdownEBlocco() {
  for (int i = 10; i >= 0; i--) {
    lcd.clear();
    lcd.print("Blocco in:");
    lcd.setCursor(0, 1);
    lcd.print(i);
    delay(1000);
  }
  lockServo.write(90); // Chiude la bici
}

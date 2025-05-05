/*

#include <WiFi.h>
#include <HTTPClient.h>
#include <LiquidCrystal.h>
#include <ArduinoJson.h>

// WiFi credentials
const char* ssid = "iPhone di Francesco";
const char* password = "012345678";

// URL del server PHP
const char* serverUrl = "http://172.20.10.4/Rollo/Demo%20arduino/get_data.php";

// Pin collegati al display LCD1602 (senza I2C)
const int rs = 27, en = 26, d4 = 25, d5 = 33, d6 = 32, d7 = 14;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

void setup() {
  Serial.begin(115200);
  lcd.begin(16, 2); // LCD 16x2
  lcd.clear();
  lcd.print("Connecting...");

  WiFi.begin(ssid, password);
  int retry = 0;
  while (WiFi.status() != WL_CONNECTED && retry < 20) {
    delay(500);
    Serial.print(".");
    retry++;
  }

  lcd.clear();
  if (WiFi.status() == WL_CONNECTED) {
    lcd.print("WiFi Connected!");
    delay(1000);
    fetchAndDisplay();
  } else {
    lcd.print("WiFi Failed :(");
  }
}

void fetchAndDisplay() {
  HTTPClient http;
  http.begin(serverUrl);
  int httpCode = http.GET();

  if (httpCode > 0) {
    String payload = http.getString();
    Serial.println(payload);

    StaticJsonDocument<512> doc;
    DeserializationError error = deserializeJson(doc, payload);

    if (error) {
      Serial.print("JSON Error: ");
      Serial.println(error.c_str());
      lcd.clear();
      lcd.print("JSON Error");
      return;
    }

    String nome = doc["nome"].as<String>();
    String cognome = doc["cognome"].as<String>();
    int token = doc["num_token"].as<int>();

    // Formattazione LCD
    lcd.clear();

    // Riga 1: nome (troncato a 16 caratteri se troppo lungo)
    nome = nome.substring(0, 16);
    lcd.setCursor(0, 0);
    lcd.print(nome);

    // Riga 2: cognome sinistra, token destra
    String tokenStr = String(token);
    int maxCognomeLen = 16 - tokenStr.length() - 1;  // 1 spazio tra cognome e token
    cognome = cognome.substring(0, maxCognomeLen);
    
    lcd.setCursor(0, 1);
    lcd.print(cognome);
    lcd.setCursor(16 - tokenStr.length(), 1);
    lcd.print(tokenStr);

  } else {
    Serial.print("Http Err: ");
    Serial.println(httpCode);
    lcd.clear();
    lcd.print("Http Err: ");
    lcd.setCursor(0, 1);
    lcd.print(httpCode);
  }

  http.end();
}

void loop() {
  // Non cicla nulla per ora
}


*/
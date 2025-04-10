# Rollo - Ride Your Way

## 1. Rete 

### 1.1 Schema dislocazione fisica

### 1.2 Scelta dei dispositivi di rete per le sedi

### 1.3 Cablaggio strutturato

### 1.4 Piano di indirizzamento
- 1.4.1 Definizione dello schema di indirizzamento IP, subnetting, gateway e DNS
- 1.4.2 Gestione indirizzi privati/pubblici e implementazione DHCP

### 1.5 Tabelle di routing

### 1.6 Reti private e servizi
- 1.6.1 Configurazione NAT statico
- 1.6.2 Configurazione NAT dinamico
- 1.6.3 Configurazione PAT (NAT Port forwarding)
- 1.6.4 Reti private con servizi pubblici (WEB, DNS, FTP, MAIL)

### 1.7 Politiche di routing
- 1.7.1 Identificazione degli Autonomous System (AS)
- 1.7.2 Configurazione routing statico/dinamico(RIP, OSPF, BGP)

### 1.8 Accesso a Internet e Sicurezza
- 1.8.1 Configurare l'accesso a Internet e la connessione ad altre reti, utilizzando indirizzi privati e pubblici (DNAT/SNAT/PF)
- 1.8.2 Realizzazione rete TRUST/DMZ per la sicurezza

### 1.9 Internetworking
- 1.9.1 Configurazione router e VPN
- 1.9.2 DNS
- 1.9.3 Scelta di un servizio cloud (tra IaaS, PaaS, SaaS, FaaS, CaaS)

### 1.10 Sistema monitoraggio biciclette con IoT (Prototipo)

#### 1.10.1 Acquisto e preparazione dei componenti
   - 1.10.1.1 Reperimento dei componenti hardware (ESP32, NEO-6M, breadboard, cavetti, power bank)
   - 1.10.1.2 Verifica della compatibilità tra i moduli e l'ESP32

#### 1.10.2 Collegamento hardware
   - 1.10.2.1 Collegamento del modulo GPS NEO-6M all'ESP32 tramite UART (RX, TX)
   - 1.10.2.2 Collegamento dell'ESP32 alla breadboard e collegamenti con i cavetti Dupont
   - 1.10.2.3 Alimentazione del sistema tramite power bank

#### 1.10.3 Programmazione dell'ESP32
   - 1.10.3.1 Produzione del codice per leggere le coordinate GPS dal modulo NEO-6M
   - 1.10.3.2 Codice per connettere l'ESP32 alla rete Wi-Fi
   - 1.10.3.3 Implementazione della logica per inviare i dati GPS al backend PHP (HTTP POST)
   - 1.10.3.4 Gestione del consumo energetico dell'ESP32 per massimizzare la durata della batteria

#### 1.10.4 Testing e debug hardware
   - 1.10.4.1 Testing del corretto funzionamento del modulo GPS (verifica latitudine e longitudine)
   - 1.10.4.2 Test della connessione Wi-Fi dell'ESP32
   - 1.10.4.3 Esecuzione dei test per assicurarsi che i dati vengano inviati correttamente al backend PHP

#### 1.10.5 Sviluppo backend PHP
   - 1.10.5.1 Creazione script PHP che riceve i dati dal modulo ESP32
   - 1.10.5.2 Codice per salvare i dati nel database MySQL
   - 1.10.5.3 Implementazione di un sistema di gestione degli errori (in caso di dati non ricevuti correttamente)

#### 1.10.6 Integrazione con il database MySQL

#### 1.10.7 Integrazione con la webapp
   - 1.10.7.1 Creazione endpoint API che permette alla webapp di ricevere i dati dal database e visualizzare la posizione delle biciclette su una mappa
   - 1.10.7.2 Test dell'integrazione tra il backend e la webapp

#### 1.10.8 Documentazione del sistema IoT
   - 1.10.8.1 Documentazione del processo di configurazione hardware (come collegare i moduli)
   - 1.10.8.2 Documentazione per il codice ESP32 e PHP
   - 1.10.8.3 Manuale per l'installazione e l'uso del sistema IoT

#### 1.10.9 Testing finale e deploy
   - 1.10.9.1 Test finali in ambiente simulato e reale (bicicletta)
   - 1.10.9.2 Verificare che i dati GPS vengano aggiornati correttamente sulla webapp in tempo reale
   - 1.10.9.3 Implementazione eventuali correzioni dopo i test

## 2. Base di dati

### 2.1 Schema entità - relazione
- 2.1.1 Documentazione

### 2.2 Ristrutturazione schema E-R

### 2.3 Traduzione a schema logico

### 2.4 Normalizzazione

### 2.5 Implementazione in MySql
- 2.5.1 Creazione e Popolazione della base di dati
- 2.5.2 Query select e testing

## 3. WebApp

### 3.1 Struttura MVC
- 3.1.1 Creazione delle directory secondo il modello "Model View Controller"

### 3.2 Front-End (React)
- 3.2.1 Implementazione visualizzazione mappa con OpenStreetMap
- 3.2.2 Elenco biciclette disponibili e stato (disponibile, prenotata, guasta)
- 3.2.3 Interfaccia responsive e adattiva (desktop/mobile)
- 3.2.4 Multilingua (italiano, inglese)
- 3.2.5 Sezione profilo utente con storico corse e token
- 3.2.6 Inserimento e visualizzazione recensioni
- 3.2.7 Visualizzazione posizione bici in tempo reale da coordinate GPS

### 3.3 Back-End (PHP)
- 3.3.1 Login/registrazione con verifica OTP via email
- 3.3.2 Endpoint RESTful per operazioni: prenotazione, invio/lettura coordinate, gestione token, recensioni
- 3.3.3 Integrazione completa con MySQL
- 3.3.4 Validazione codice voucher/token e gestione premi
- 3.3.5 Sistema di sicurezza: gestione sessioni, protezione CSRF/XSS, validazione input

### 3.4 Versione Mobile (React Native)
- 3.4.1 Conversione interfaccia in formato app mobile (con PWA o React Native)
- 3.4.2 Notifiche push per promemoria prenotazione, token e manutenzione
- 3.4.3 Integrazione con funzioni native (GPS per localizzazione utente)

### 3.5 Sicurezza e GDPR
- 3.5.1 Implementazione gestione cookie e consensi privacy
- 3.5.2 Crittografia delle password e gestione sicura degli accessi
- 3.5.3 Redazione e integrazione Privacy Policy e Termini di Servizio nella WebApp

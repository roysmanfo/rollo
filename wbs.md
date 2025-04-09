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
   - Reperimento dei componenti hardware (ESP32, NEO-6M, breadboard, cavetti, power bank)
   - Verifica della compatibilità tra i moduli e l'ESP32

#### 1.10.2 Collegamento hardware
   - Collegamento del modulo GPS NEO-6M all'ESP32 tramite UART (RX, TX)
   - Collegamento dell'ESP32 alla breadboard e collegamenti con i cavetti Dupont
   - Alimentazione del sistema tramite power bank

#### 1.10.3 Programmazione dell'ESP32
   - Produzione del codice per leggere le coordinate GPS dal modulo NEO-6M
   - Codice per connettere l'ESP32 alla rete Wi-Fi
   - Implementazione della logica per inviare i dati GPS al backend PHP (HTTP POST)
   - Gestione del consumo energetico dell'ESP32 per massimizzare la durata della batteria

#### 1.10.4 Testing e debug hardware
   - Testing del corretto funzionamento del modulo GPS (verifica latitudine e longitudine)
   - Test della connessione Wi-Fi dell'ESP32
   - Esecuzione dei test per assicurarsi che i dati vengano inviati correttamente al backend PHP

#### 1.10.5 Sviluppo backend PHP
   - Creazione script PHP che riceve i dati dal modulo ESP32
   - Codice per salvare i dati nel database MySQL
   - Implementazione di un sistema di gestione degli errori (in caso di dati non ricevuti correttamente)

#### 1.10.6 Integrazione con il database MySQL

#### 1.10.7 Integrazione con la webapp
   - Creazione endpoint API che permette alla webapp di ricevere i dati dal database e visualizzare la posizione delle biciclette su una mappa
   - Test dell'integrazione tra il backend e la webapp

#### 1.10.8 Documentazione del sistema IoT
   - Documentazione del processo di configurazione hardware (come collegare i moduli)
   - Documentazione per il codice ESP32 e PHP
   - Manuale per l'installazione e l'uso del sistema IoT

#### 1.10.9 Testing finale e deploy
   - Test finali in ambiente simulato e reale (bicicletta)
   - Verificare che i dati GPS vengano aggiornati correttamente sulla webapp in tempo reale
   - Implementazione eventuali correzioni dopo i test

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
- Creazione delle directory secondo il modello "Model View Controller"

### 3.2 Front-End (React)
- Implementazione visualizzazione mappa con OpenStreetMap
- Elenco biciclette disponibili e stato (disponibile, prenotata, guasta)
- Interfaccia responsive e adattiva (desktop/mobile)
- Multilingua (italiano, inglese)
- Sezione profilo utente con storico corse e token
- Inserimento e visualizzazione recensioni
- Visualizzazione posizione bici in tempo reale da coordinate GPS

### 3.3 Back-End (PHP)
- Login/registrazione con verifica OTP via email
- Endpoint RESTful per operazioni: prenotazione, invio/lettura coordinate, gestione token, recensioni
- Integrazione completa con MySQL
- Validazione codice voucher/token e gestione premi
- Sistema di sicurezza: gestione sessioni, protezione CSRF/XSS, validazione input

### 3.4 Versione Mobile (React Native)
- Conversione interfaccia in formato app mobile (con PWA o React Native)
- Notifiche push per promemoria prenotazione, token e manutenzione
- Integrazione con funzioni native (GPS per localizzazione utente)

### 3.5 GDPR
- Implementazione gestione cookie e consensi privacy
- Crittografia delle password e gestione sicura degli accessi
- Redazione e integrazione Privacy Policy e Termini di Servizio nella WebApp

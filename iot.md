## Sottoprogetto IoT - Sistema di monitoraggio biciclette

### 1. **Definizione requisiti IoT**
   - Analizzare le funzionalità richieste (monitoraggio GPS, stato bici, comunicazione con il backend).
   - Selezionare il modulo GPS (NEO-6M) e modulo Wi-Fi (ESP32-WROOM-32U).
   - Determinare i requisiti energetici (alimentazione tramite power bank).

### 2. **Acquisto e preparazione dei componenti**
   - Ordinare e ricevere i componenti hardware (ESP32, NEO-6M, breadboard, cavetti, power bank).
   - Verifica della compatibilità tra i moduli e l’Arduino/ESP32.

### 3. **Collegamento hardware**
   - Collegare il modulo GPS NEO-6M all’ESP32 tramite UART (RX, TX).
   - Collegare l’ESP32 alla breadboard e fare i collegamenti con i cavetti Dupont.
   - Alimentare il sistema tramite power bank.

### 4. **Programmazione dell’ESP32**
   - Installare l’ambiente di sviluppo per ESP32 (Arduino IDE).
   - Scrivere il codice per leggere le coordinate GPS dal modulo NEO-6M.
   - Scrivere il codice per connettere l’ESP32 alla rete Wi-Fi.
   - Implementare la logica per inviare i dati GPS al backend PHP (HTTP POST/GET).
   - Gestire il consumo energetico dell’ESP32 per massimizzare la durata della batteria.

### 5. **Testing e debug hardware**
   - Testare il corretto funzionamento del modulo GPS (verifica latitudine e longitudine).
   - Testare la connessione Wi-Fi dell’ESP32.
   - Eseguire dei test per assicurarsi che i dati vengano inviati correttamente al backend PHP.

### 6. **Sviluppo backend PHP**
   - Creare uno script PHP che riceve i dati dal modulo ESP32.
   - Scrivere il codice per salvare i dati nel database MySQL.
   - Implementare un sistema di gestione degli errori (in caso di dati non ricevuti correttamente).

### 7. **Integrazione con il database MySQL**
   - Creare la tabella nel database MySQL per archiviare le informazioni delle biciclette (id, latitudine, longitudine, stato).
   - Testare l'integrazione tra PHP e MySQL per verificare che i dati vengano salvati correttamente.

### 8. **Integrazione con la webapp**
   - Creare un endpoint API che permette alla webapp di ricevere i dati dal database e visualizzare la posizione delle biciclette su una mappa (OpenStreetMap o Leaflet).
   - Testare l'integrazione tra il backend e la webapp.

### 9. **Ottimizzazione del consumo energetico**
   - Analizzare e implementare strategie per ridurre il consumo energetico (modalità sleep per ESP32, gestione del GPS).
   - Testare la durata della batteria in condizioni reali (simulazione su una bici).

### 10. **Documentazione del sistema IoT**
   - Documentare il processo di configurazione hardware (come collegare i moduli).
   - Scrivere la documentazione per il codice ESP32 e PHP.
   - Creare un manuale per l’installazione e l’uso del sistema IoT.

### 11. **Testing finale e deploy**
   - Eseguire test finali in ambiente simulato e reale (bicicletta).
   - Verificare che i dati GPS vengano aggiornati correttamente sulla webapp in tempo reale.
   - Implementare eventuali correzioni dopo i test.

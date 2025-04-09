# Rollo - Ride Your Way

## 1. Rete
### 1.1 Cablaggio e dispositivi di rete
- Installazione router e switch per sedi
- Configurazione access point Wi-Fi
- Collegamento modem LTE per IoT

### 1.2 Configurazione IP e DNS
- Assegnazione indirizzi IP (IPv4, subnet, gateway)
- Configurazione DHCP e DNS locale

### 1.3 Sicurezza e VPN
- Installazione e configurazione firewall
- Creazione VPN tra sedi
- Isolamento rete pubblica/privata con DMZ

### 1.4 Connessione dispositivi IoT
- Connessione bici alla rete tramite SIM IoT
- Collegamento dispositivi a server backend via VPN

## 2. Base di dati
### 2.1 Progettazione e creazione schema
- Modellazione ER con entità: Utente, Bicicletta, Prenotazione, Token, Voucher, Recensione
- Creazione tabelle MySQL e definizione relazioni

### 2.2 Script e gestione dati
- Script SQL per inserimento e modifica dati
- Trigger per gestione automatica token e premi
- Backup periodici del database

### 2.3 Sicurezza e GDPR
- Gestione cookie e sessioni PHP sicure
- Crittografia password utenti (es. bcrypt)
- Inserimento privacy policy e gestione consensi

## 3. WebApp
### 3.1 Interfaccia utente (frontend - React)
- Visualizzazione mappa con OpenStreetMap
- Elenco bici disponibili e prenotazione
- Multilingua e interfaccia responsive
- Sezione profilo utente e storico corse

### 3.2 Backend (PHP)
- Login/registrazione con OTP via email
- Endpoint RESTful per operazioni (prenotazione, token, bici)
- Integrazione con database MySQL
- Validazione voucher e QR code

### 3.3 Token e premi
- Sistema token per prenotazioni
- Bonus token per chilometri percorsi (calcolati da GPS)
- Sistema pubblicità o voucher per ottenere token

### 3.4 Recensioni e feedback
- Inserimento e visualizzazione recensioni
- Media valutazioni bici e utenti

### 3.5 Sicurezza e ottimizzazione
- Protezione XSS/CSRF
- Gestione cookie secure e HTTPS
- Lazy loading mappa e caching API

### 3.6 Testing e deploy
- Test compatibilità browser/dispositivi
- Deployment su server con Docker
- Conversione in PWA per mobile

## 4. IoT per biciclette
### 4.1 Progettazione e prototipazione
- Prototipo bici con Arduino e modulo GPS/GSM
- Collegamento batteria e sensori movimento
- Test trasmissione dati con SIM

### 4.2 Programmazione firmware
- Lettura coordinate GPS e invio dati via HTTP/MQTT
- Gestione sblocco elettrico tramite pin digitale
- Notifica stato bici e autonomia al backend

### 4.3 Integrazione e controllo remoto
- Salvataggio coordinate in database
- Collegamento con WebApp per disponibilità in tempo reale
- Notifiche per manutenzione o guasti

### 4.4 Collaudo finale
- Test funzionalità GPS e sblocco in ambiente reale
- Verifica affidabilità connessione
- Monitoraggio consumi e autonomia

# Rollo - Ride Your Way

## Rete 

## Base di dati
### Schema entità - relazione
- Scelta delle entità e associazioni tra esse, generalizzazioni, cardinalità e identificatori

## WebApp









## 1. Analisi e Progettazione Iniziale
### 1.1 Raccolta requisiti
- Analisi esigenze aziendali
- Identificazione dispositivi e servizi da gestire
### 1.2 Ipotesi aggiuntive e vincoli
- Dispositivi IoT per biciclette
- Numero di sedi, biciclette, dipendenti
- Modalità di prenotazione
- Esigenze database e Wi-Fi

## 2. Progettazione della Rete
### 2.1 Layout della rete
- Schema topologia (stella, bus, anello)
- Dislocazione fisica dispositivi per sede
### 2.2 Scelta standard e tecnologie
- LAN (Ethernet)
- Wi-Fi (802.11)
- Mobile (4G/5G)
- GPS/Galileo
- Bluetooth
### 2.3 Elenco dispositivi
- Router, switch, modem, schede, cavi, rack, armadi

## 3. Infrastruttura Fisica
### 3.1 Cablaggio strutturato
- Pianificazione cablaggio
- Considerazioni morfologiche
### 3.2 Piano di indirizzamento IP
- Schema IP, subnetting, gateway, DNS
- DHCP, gestione IP privati/pubblici

## 4. Routing e NAT
### 4.1 Tabelle di routing
- Configurazione routing statico e dinamico (RIP, OSPF, BGP)
- Identificazione AS
### 4.2 NAT e servizi
- NAT statico e dinamico
- Port forwarding
- Reti private con servizi pubblici (WEB, DNS, FTP, mail, streaming)

## 5. Connessione tra le Sedi
### 5.1 Internetworking
- VPN o linee dedicate tra sedi
- Routing e firewall tra sedi
### 5.2 Configurazione DMZ
- Isolamento server pubblici (es. web server)
- Sicurezza rete interna

## 6. Servizi e Sistemi
### 6.1 Sistemi operativi e accesso Internet
- OS per client/server
- Configurazione accesso a Internet (DNAT, SNAT, PF)
### 6.2 Servizi di rete
- Web server
- Mail server
- Database server
- Streaming e DNS

## 7. Sicurezza della Rete
### 7.1 Meccanismi di protezione
- Backup e ripristino
- ACL e firewall
- Antivirus
### 7.2 TRUST e DMZ
- Reti sicure per clienti e dipendenti
- Isolamento servizi pubblici

## 8. Collegamenti IoT e VPN
### 8.1 IoT per biciclette
- Collegamento dispositivi alla rete
- Monitoraggio e controllo remoto
### 8.2 VPN tra sedi
- Connessioni sicure
- Accesso controllato e cifrato

## 9. Cloud Computing
### 9.1 Tipologie di servizi Cloud
- IaaS
- PaaS
- SaaS
- FaaS
- CaaS
### 9.2 Scelta e configurazione
- Valutazione fornitori
- Integrazione con rete aziendale

## 10. Gestione Database
### 10.1 Scelta DBMS
- MySQL, PostgreSQL o altri
### 10.2 Creazione e test query SQL
- Gestione clienti, biciclette, prenotazioni

## 11. Sito Internet / Intranet
### 11.1 Progettazione sito
- Mappa del sito
- Front-end e interfaccia utente
### 11.2 Accessi e scripting
- Controllo accessi
- Script lato client/server
### 11.3 Normative privacy
- Conformità GDPR
- Note legali e privacy

## 12. Consegne Finali
### 12.1 Documentazione tecnica
- Schema di rete
- Configurazioni dispositivi
- Piano IP e sicurezza
### 12.2 Codice e software
- Query database
- Struttura sito web (cenni parte dinamica)
### 12.3 Relazione finale
- Scelte tecniche
- Considerazioni e criticità affrontate


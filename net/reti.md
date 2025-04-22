
# Piano di indirizzamento

Indirizzo pubblico: `137.0.0.0/22`
Indirizzo privato: `10.x.y.0/19` (~1000 host disponibili per ogni rete)
Rete per routing: `172.0.0.y/30` (2 host per rete)
Algoritmo di routing tra sedi: RIPv2
## Indirizzi all'interno delle sedi
Rete Principale: `10.0.0.0/19` (4 subnet + 6 inutilizzate)

| Sede       | Subnet   | Primo host | Ultimo host | Broadcast |
| ---------- | ------ | --------- | ------ | -------- |
| Centrale   | `10.0.0.0/22` |  `10.0.0.1` | `10.0.3.254` | `10.0.3.255` |
| Sede Nord  | `10.0.4.0/22` |  `10.0.4.1` | `10.0.7.254` | `10.0.7.255` |
| Sede Sud   | `10.0.8.0/22` |  `10.0.8.1` | `10.0.11.254` | `10.0.11.255` |
| Sede Est   | `10.0.12.0/22` | `10.0.12.1` | `10.0.15.254` | `10.0.15.255` |
| Sede Ovest | `10.0.16.0/22` | `10.0.16.1` | `10.0.19.254` | `10.0.19.255` |

### Sede Centrale
- IP pubblico statico
- IP privati gestiti tramite DHCP
- Server per il sito e database (dominio e hosting in realta' verranno delegati ad un'azienda esterna)
	- NAT statico
	- IP statico
	- Firewall permette solo traffico per le porte `22`, `80`, `443`
		- 22 - SSH
		- 80 - HTTP
		- 443 - HTTPS
### Altre sedi
- IP pubblico statico
- IP privati gestiti tramite DHCP

# Scelta cavi

| Scopo                  | Cavo                             |
| ---------------------- | -------------------------------- |
| comunicazioni tra sedi | Fibra ottica (sedi distanti)     |
| switch - router        | Ethernet                         |
| switch - dispositivo   | Ethernet / wireless (tramite AP) |


# Piano di indirizzamento

Indirizzo pubblico: `137.0.0.0/22`  
Indirizzo privato: `172.160.0.0/23` (512 host disponibili per ogni rete, tra cui 256 pc e 256 wifi tutti in dhcp)  
Rete per routing: `200.100.40.y/30` (2 host per rete)  
Algoritmo di routing tra sedi: RIPv2
## Indirizzi all'interno delle sedi
Rete Principale: `172.160.0.0/23` (128 subnet di cui 5 utilizzate)

| Sede       | Subnet   | Primo host | Ultimo host | Broadcast |
| ---------- | ------ | --------- | ------ | -------- |
| Centrale   | `172.160.0.0/23` |  `172.160.0.1` | `172.160.1.254` | `172.160.1.255` |
| Sede Nord  | `172.160.2.0/25` |  `172.160.2.1` | `172.160.2.254` | `172.160.2.127` |
| Sede Sud   | `172.160.3.0/24` |  `172.160.3.1` | `172.160.5.254` | `172.160.5.255` |
| Sede Est   | `172.160.6.0/24` | `172.160.6.1` | `172.160.7.254` | `172.160.7.255` |
| Sede Ovest | `172.160.8.0/24` | `172.160.8.1` | `172.160.9.254` | `172.160.9.255` |

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

-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Mag 19, 2025 alle 09:39
-- Versione del server: 8.0.36
-- Versione PHP: 8.0.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my_rollo`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `biciclette`
--

CREATE TABLE `biciclette` (
  `id` mediumint NOT NULL,
  `modello` varchar(100) NOT NULL,
  `iot` mediumint DEFAULT NULL,
  `sede_appartenenza` smallint DEFAULT NULL,
  `stato` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `biciclette`
--

INSERT INTO `biciclette` (`id`, `modello`, `iot`, `sede_appartenenza`, `stato`) VALUES
(1, 'Modello A', 1, 1, 1),
(2, 'Modello B', 2, 1, 1),
(3, 'Modello C', 3, 2, 0),
(4, 'Modello D', 4, 2, 1),
(5, 'Modello E', 5, 3, 1),
(6, 'Modello F', 6, 4, 1),
(7, 'Modello G', 7, 5, 0),
(8, 'Modello H', 8, 6, 1),
(9, 'Modello I', 9, 7, 1),
(10, 'Modello J', 10, 8, 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `iot`
--

CREATE TABLE `iot` (
  `id` mediumint NOT NULL,
  `latitudine` decimal(9,6) NOT NULL,
  `longitudine` decimal(9,6) NOT NULL,
  `data_installazione` date NOT NULL,
  `data_revisione` date NOT NULL
) ;

--
-- Dump dei dati per la tabella `iot`
--

INSERT INTO `iot` (`id`, `latitudine`, `longitudine`, `data_installazione`, `data_revisione`) VALUES
(1, '45.406430', '11.876760', '2024-12-01', '2025-05-01'),
(2, '45.407000', '11.877000', '2024-12-15', '2025-05-01'),
(3, '45.408500', '11.874000', '2025-01-01', '2025-06-01'),
(4, '45.405200', '11.875500', '2025-01-10', '2025-06-15'),
(5, '45.403800', '11.872200', '2025-02-01', '2025-07-01'),
(6, '45.409500', '11.878000', '2025-02-15', '2025-07-15'),
(7, '45.402600', '11.870000', '2025-03-01', '2025-08-01'),
(8, '45.401100', '11.869500', '2025-03-15', '2025-08-15'),
(9, '45.400000', '11.868000', '2025-04-01', '2025-09-01'),
(10, '45.410000', '11.879000', '2025-04-15', '2025-09-15');

-- --------------------------------------------------------

--
-- Struttura della tabella `noleggi`
--

CREATE TABLE `noleggi` (
  `id` bigint NOT NULL,
  `data` date NOT NULL,
  `ora_inizio` time NOT NULL,
  `ora_fine` time DEFAULT NULL,
  `distanza_percorsa` float DEFAULT NULL,
  `prezzo` decimal(5,0) DEFAULT NULL,
  `utente` mediumint DEFAULT NULL,
  `bicicletta` mediumint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `noleggi`
--

INSERT INTO `noleggi` (`id`, `data`, `ora_inizio`, `ora_fine`, `distanza_percorsa`, `prezzo`, `utente`, `bicicletta`) VALUES
(1001, '2025-04-01', '08:00:00', '08:30:00', 3.2, '5', 1, 1),
(1002, '2025-04-01', '09:00:00', '09:45:00', 5, '7', 2, 2),
(1003, '2025-04-02', '10:00:00', '10:20:00', 2.5, '4', 3, 3),
(1004, '2025-04-03', '11:00:00', '11:35:00', 4.1, '6', 4, 4),
(1005, '2025-04-04', '12:00:00', NULL, NULL, NULL, 5, 5),
(1006, '2025-04-05', '13:00:00', '13:30:00', 3, '5', 6, 6),
(1007, '2025-04-06', '14:00:00', '14:50:00', 6.7, '9', 7, 7),
(1008, '2025-04-07', '15:00:00', NULL, NULL, NULL, 8, 8),
(1009, '2025-04-08', '16:00:00', '16:25:00', 2, '3', 9, 9),
(1010, '2025-04-09', '17:00:00', '17:45:00', 5.5, '8', 10, 10);

-- --------------------------------------------------------

--
-- Struttura della tabella `sedi`
--

CREATE TABLE `sedi` (
  `id` smallint NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `comune` varchar(100) NOT NULL,
  `cap` decimal(5,0) NOT NULL,
  `via` varchar(100) NOT NULL,
  `civico` smallint DEFAULT NULL,
  `num_biciclette_gestite` mediumint DEFAULT '0',
  `telefono` varchar(20) NOT NULL
) ;

--
-- Dump dei dati per la tabella `sedi`
--

INSERT INTO `sedi` (`id`, `nome`, `comune`, `cap`, `via`, `civico`, `num_biciclette_gestite`, `telefono`) VALUES
(1, 'Centro', 'Padova', '35100', 'Via Roma', 10, 5, '0491234567'),
(2, 'Stazione', 'Padova', '35131', 'Viale Codalunga', 25, 7, '0497654321'),
(3, 'Università', 'Padova', '35121', 'Via del Santo', 3, 4, '0491112233'),
(4, 'Ospedale', 'Padova', '35128', 'Via Giustiniani', 5, 6, '0495566778'),
(5, 'Prato', 'Padova', '35122', 'Via Manzoni', 18, 8, '0498899776'),
(6, 'Fiera', 'Padova', '35129', 'Via Niccolò Tommaseo', 90, 3, '0493322110'),
(7, 'Arcella', 'Padova', '35134', 'Via Tiziano Aspetti', 45, 5, '0499988776'),
(8, 'Porta Trento', 'Padova', '35138', 'Via Trento', 12, 2, '0495544332'),
(9, 'Guizza', 'Padova', '35126', 'Via Guizza', 67, 1, '0496665544'),
(10, 'Forcellini', 'Padova', '35128', 'Via Forcellini', 89, 6, '0494433221');

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `id` mediumint NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cognome` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(100) NOT NULL,
  `num_token` mediumint NOT NULL DEFAULT '100',
  `ruolo` enum('admin','utente') NOT NULL DEFAULT 'utente',
  `data_registrazione` date DEFAULT (curdate())
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`id`, `nome`, `cognome`, `email`, `password`, `num_token`, `ruolo`, `data_registrazione`) VALUES
(1, 'Marco', 'Rossi', 'marco.rossi@email.com', '$2a$10$AIQ93650TqwM7QQXy4V7weo.g7YbGcEstYxitzAQ9y4YpDUmeeRIW', 100, 'utente', '2025-01-10'),
(2, 'Luca', 'Bianchi', 'luca.bianchi@email.com', '$2a$10$AIQ93650TqwM7QQXy4V7weo.g7YbGcEstYxitzAQ9y4YpDUmeeRIW', 120, 'utente', '2025-01-15'),
(3, 'Anna', 'Verdi', 'anna.verdi@email.com', '$2a$10$AIQ93650TqwM7QQXy4V7weo.g7YbGcEstYxitzAQ9y4YpDUmeeRIW', 90, 'utente', '2025-01-20'),
(4, 'Giulia', 'Neri', 'giulia.neri@email.com', '$2a$10$AIQ93650TqwM7QQXy4V7weo.g7YbGcEstYxitzAQ9y4YpDUmeeRIW', 150, 'admin', '2025-01-05'),
(5, 'Davide', 'Ferrari', 'davide.ferrari@email.com', '$2a$10$AIQ93650TqwM7QQXy4V7weo.g7YbGcEstYxitzAQ9y4YpDUmeeRIW', 80, 'utente', '2025-02-01'),
(6, 'Elisa', 'Moretti', 'elisa.moretti@email.com', '$2a$10$AIQ93650TqwM7QQXy4V7weo.g7YbGcEstYxitzAQ9y4YpDUmeeRIW', 200, 'utente', '2025-02-05'),
(7, 'Francesco', 'Russo', 'francesco.russo@email.com', '', 110, 'utente', '2025-02-10'),
(8, 'Sara', 'Gallo', 'sara.gallo@email.com', '$2a$10$AIQ93650TqwM7QQXy4V7weo.g7YbGcEstYxitzAQ9y4YpDUmeeRIW', 70, 'utente', '2025-02-15'),
(9, 'Matteo', 'Greco', 'matteo.greco@email.com', '$2a$10$AIQ93650TqwM7QQXy4V7weo.g7YbGcEstYxitzAQ9y4YpDUmeeRIW', 95, 'utente', '2025-02-20'),
(10, 'Alessia', 'Conti', 'alessia.conti@email.com', '$2a$10$AIQ93650TqwM7QQXy4V7weo.g7YbGcEstYxitzAQ9y4YpDUmeeRIW', 130, 'utente', '2025-03-01');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `biciclette`
--
ALTER TABLE `biciclette`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iot` (`iot`),
  ADD KEY `sede_appartenenza` (`sede_appartenenza`);

--
-- Indici per le tabelle `iot`
--
ALTER TABLE `iot`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `noleggi`
--
ALTER TABLE `noleggi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `utente` (`utente`),
  ADD KEY `bicicletta` (`bicicletta`);

--
-- Indici per le tabelle `sedi`
--
ALTER TABLE `sedi`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

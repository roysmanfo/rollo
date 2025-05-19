CREATE DATABASE rollo;
USE rollo;


CREATE TABLE utenti (
    id MEDIUMINT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cognome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    num_token MEDIUMINT DEFAULT 100  NOT NULL,
    ruolo ENUM('admin', 'utente') DEFAULT 'utente' NOT NULL,
    data_registrazione DATE DEFAULT NOW() NOT NULL
);

CREATE TABLE sedi (
    id SMALLINT PRIMARY KEY,
    nome VARCHAR(100),
    comune VARCHAR(100) NOT NULL,
    cap DECIMAL(5,0) NOT NULL,
    via VARCHAR(100) NOT NULL,
    civico SMALLINT,
    num_biciclette_gestite MEDIUMINT DEFAULT 0,
    telefono VARCHAR(20) NOT NULL,
    CHECK (telefono REGEXP '^[0-9]{10,15}$'),
    CHECK (num_biciclette_gestite >= 0),
    CHECK (civico >= 0),
    CHECK (cap >= 0 AND cap <= 99999)
);

CREATE TABLE iot (
    id MEDIUMINT PRIMARY KEY,
    latitudine DECIMAL(9,6) NOT NULL,
    longitudine DECIMAL(9,6) NOT NULL,
    data_installazione DATE NOT NULL,
    data_revisione DATE NOT NULL,
    CHECK (data_revisione >= data_installazione),
    CHECK (latitudine BETWEEN -90 AND 90),
    CHECK (longitudine BETWEEN -180 AND 180)
    -- Rimuoviamo il controllo su NOW() per compatibilità
);

DELIMITER //

CREATE TRIGGER check_data_installazione
BEFORE INSERT ON iot
FOR EACH ROW
BEGIN
    IF NEW.data_installazione > CURRENT_DATE THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La data di installazione non può essere nel futuro';
    END IF;
END;
//

DELIMITER ;


CREATE TABLE biciclette (
    id MEDIUMINT PRIMARY KEY,
    modello VARCHAR(100) NOT NULL,
    iot MEDIUMINT,
    sede_appartenenza SMALLINT,
    stato BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (iot) REFERENCES iot(id),
    FOREIGN KEY (sede_appartenenza) REFERENCES sedi(id)
);

CREATE TABLE noleggi (
    id BIGINT PRIMARY KEY,
    data DATE DEFAULT CURRENT_DATE,
    ora_inizio TIME NOT NULL,
    ora_fine TIME,
    distanza_percorsa FLOAT,
    prezzo DECIMAL(5,0),
    utente MEDIUMINT,
    bicicletta MEDIUMINT,
    FOREIGN KEY (utente) REFERENCES utenti(id),
    FOREIGN KEY (bicicletta) REFERENCES biciclette(id)
);

-- VISTA: noleggi con dati utente e bicicletta
CREATE VIEW Vista_noleggi_Completa AS
SELECT N.id, N.data, N.ora_inizio, N.ora_fine, N.prezzo, 
       U.nome, U.cognome, B.modello
FROM noleggi N
JOIN utenti U ON N.utente = U.id
JOIN biciclette B ON N.bicicletta = B.id;

-- VISTA: Stato biciclette e ultima posizione
CREATE VIEW Vista_Stato_biciclette AS
SELECT B.id, B.modello, B.stato, I.latitudine, I.longitudine, S.nome AS sede
FROM biciclette B
JOIN iot I ON B.iot = I.id
JOIN sedi S ON B.sede_appartenenza = S.id;


-- Tutti i noleggi effettuati da un utente specifico
SELECT * FROM Vista_noleggi_Completa WHERE nome = 'Marco' AND cognome = 'Rossi';

-- biciclette disponibili in una sede
SELECT id, modello, stato
FROM biciclette
WHERE sede_appartenenza = 1;

-- biciclette che devono essere revisionate entro una certa data
SELECT B.id, I.data_Revisione
FROM biciclette B
JOIN iot I ON B.iot = I.id
WHERE I.data_Revisione <= '2025-06-01';


-- Insert into per dati di testing
-- password: password123
-- hash: BCRYPT_BLOWFISH (cost = 10)
INSERT INTO utenti VALUES
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
INSERT INTO sedi VALUES
(1, 'Centro', 'Padova', 35100, 'Via Roma', 10, 5, '0491234567'),
(2, 'Stazione', 'Padova', 35131, 'Viale Codalunga', 25, 7, '0497654321'),
(3, 'Università', 'Padova', 35121, 'Via del Santo', 3, 4, '0491112233'),
(4, 'Ospedale', 'Padova', 35128, 'Via Giustiniani', 5, 6, '0495566778'),
(5, 'Prato', 'Padova', 35122, 'Via Manzoni', 18, 8, '0498899776'),
(6, 'Fiera', 'Padova', 35129, 'Via Niccolò Tommaseo', 90, 3, '0493322110'),
(7, 'Arcella', 'Padova', 35134, 'Via Tiziano Aspetti', 45, 5, '0499988776'),
(8, 'Porta Trento', 'Padova', 35138, 'Via Trento', 12, 2, '0495544332'),
(9, 'Guizza', 'Padova', 35126, 'Via Guizza', 67, 1, '0496665544'),
(10, 'Forcellini', 'Padova', 35128, 'Via Forcellini', 89, 6, '0494433221');
INSERT INTO iot VALUES
(1, 45.40643, 11.87676, '2024-12-01', '2025-05-01'),
(2, 45.40700, 11.87700, '2024-12-15', '2025-05-01'),
(3, 45.40850, 11.87400, '2025-01-01', '2025-06-01'),
(4, 45.40520, 11.87550, '2025-01-10', '2025-06-15'),
(5, 45.40380, 11.87220, '2025-02-01', '2025-07-01'),
(6, 45.40950, 11.87800, '2025-02-15', '2025-07-15'),
(7, 45.40260, 11.87000, '2025-03-01', '2025-08-01'),
(8, 45.40110, 11.86950, '2025-03-15', '2025-08-15'),
(9, 45.40000, 11.86800, '2025-04-01', '2025-09-01'),
(10, 45.41000, 11.87900, '2025-04-15', '2025-09-15');
INSERT INTO biciclette VALUES
(1, 'Modello A', 1, 1, TRUE),
(2, 'Modello B', 2, 1, TRUE),
(3, 'Modello C', 3, 2, FALSE),
(4, 'Modello D', 4, 2, TRUE),
(5, 'Modello E', 5, 3, TRUE),
(6, 'Modello F', 6, 4, TRUE),
(7, 'Modello G', 7, 5, FALSE),
(8, 'Modello H', 8, 6, TRUE),
(9, 'Modello I', 9, 7, TRUE),
(10, 'Modello J', 10, 8, TRUE);
INSERT INTO noleggi VALUES
(1001, '2025-04-01', '08:00:00', '08:30:00', 3.2, 5, 1, 1),
(1002, '2025-04-01', '09:00:00', '09:45:00', 5.0, 7, 2, 2),
(1003, '2025-04-02', '10:00:00', '10:20:00', 2.5, 4, 3, 3),
(1004, '2025-04-03', '11:00:00', '11:35:00', 4.1, 6, 4, 4),
(1005, '2025-04-04', '12:00:00', NULL, NULL, NULL, 5, 5),
(1006, '2025-04-05', '13:00:00', '13:30:00', 3.0, 5, 6, 6),
(1007, '2025-04-06', '14:00:00', '14:50:00', 6.7, 9, 7, 7),
(1008, '2025-04-07', '15:00:00', NULL, NULL, NULL, 8, 8),
(1009, '2025-04-08', '16:00:00', '16:25:00', 2.0, 3, 9, 9),
(1010, '2025-04-09', '17:00:00', '17:45:00', 5.5, 8, 10, 10);

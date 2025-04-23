CREATE DATABASE Rollo;
USE Rollo;


CREATE TABLE Utenti (
    id_Utente MEDIUMINT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cognome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    num_token MEDIUMINT DEFAULT 100  NOT NULL
);

CREATE TABLE Sedi (
    id_Sede SMALLINT PRIMARY KEY,
    nome VARCHAR(100),
    comune VARCHAR(100) NOT NULL,
    cap DECIMAL(5,0) NOT NULL,
    via VARCHAR(100) NOT NULL,
    civico SMALLINT,
    num_Biciclette_Gestite MEDIUMINT DEFAULT 0,
    telefono VARCHAR(20) NOT NULL
);

CREATE TABLE IoT (
    id_Dispositivo MEDIUMINT PRIMARY KEY,
    latitudine DECIMAL(9,6) NOT NULL,
    longitudine DECIMAL(9,6) NOT NULL,
    data_Installazione DATE NOT NULL,
    data_Revisione DATE NOT NULL,
    CHECK (data_Revisione >= data_Installazione)
);

CREATE TABLE Biciclette (
    id_Bicicletta MEDIUMINT PRIMARY KEY,
    modello VARCHAR(100) NOT NULL,
    scheda_IoT MEDIUMINT,
    sede_appartenenza SMALLINT,
    stato BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (scheda_IoT) REFERENCES IoT(id_Dispositivo),
    FOREIGN KEY (sede_appartenenza) REFERENCES Sedi(id_Sede)
);

CREATE TABLE Noleggi (
    id_Noleggio BIGINT PRIMARY KEY,
    data DATE DEFAULT NOW(),
    ora_Inizio TIME NOT NULL,
    ora_Fine TIME,
    distanza_Percorsa FLOAT CHECK (distanza_Percorsa >= 0),
    prezzo DECIMAL(5,0) CHECK (prezzo >= 0),
    utente BIGINT,
    bicicletta MEDIUMINT,
    FOREIGN KEY (utente) REFERENCES Utenti(id_Utente),
    FOREIGN KEY (bicicletta) REFERENCES Biciclette(id_Bicicletta),
    CHECK (ora_Fine IS NULL OR ora_Fine >= ora_Inizio)
);


INSERT INTO Utenti VALUES (1, 'Marco', 'Rossi', 'marco.rossi@mail.com', 'password123', 3);

INSERT INTO Sedi VALUES (1, 'Sede Centrale', 'Milano', 20100, 'Via Roma', 1, 10, '0245789632');

INSERT INTO IoT VALUES (101, 45.4654, 9.1859, '2024-01-01', '2025-01-01');

INSERT INTO Biciclette VALUES (2001, 'Model X', 101, 1);

INSERT INTO Noleggi VALUES (30001, '2025-04-01', '08:00:00', '09:30:00', 12.5, 3, 1, 2001);


-- VISTA: Noleggi con dati utente e bicicletta
CREATE VIEW Vista_Noleggi_Completa AS
SELECT N.id_Noleggio, N.data, N.ora_Inizio, N.ora_Fine, N.prezzo, 
       U.nome, U.cognome, B.modello
FROM Noleggi N
JOIN Utenti U ON N.utente = U.id_Utente
JOIN Biciclette B ON N.bicicletta = B.id_Bicicletta;

-- VISTA: Stato biciclette e ultima posizione
CREATE VIEW Vista_Stato_Biciclette AS
SELECT B.id_Bicicletta, B.modello, B.stato, I.latitudine, I.longitudine, S.nome AS sede
FROM Biciclette B
JOIN IoT I ON B.scheda_IoT = I.id_Dispositivo
JOIN Sedi S ON B.sede_appartenenza = S.id_Sede;


-- Tutti i noleggi effettuati da un utente specifico
SELECT * FROM Vista_Noleggi_Completa WHERE nome = 'Marco' AND cognome = 'Rossi';

-- Biciclette disponibili in una sede
SELECT id_Bicicletta, modello, stato
FROM Biciclette
WHERE sede_appartenenza = 1;

-- Biciclette che devono essere revisionate entro una certa data
SELECT B.id_Bicicletta, I.data_Revisione
FROM Biciclette B
JOIN IoT I ON B.scheda_IoT = I.id_Dispositivo
WHERE I.data_Revisione <= '2025-06-01';

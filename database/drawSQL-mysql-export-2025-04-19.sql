CREATE TABLE `Sedi`(
    `id_Sede` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(255) NOT NULL,
    `comune` VARCHAR(255) NOT NULL,
    `cap` DECIMAL(8, 2) NOT NULL,
    `via` VARCHAR(255) NOT NULL,
    `civico` SMALLINT NOT NULL,
    `num_Biciclette_Gestite` MEDIUMINT NOT NULL,
    `telefono` VARCHAR(255) NOT NULL
);
CREATE TABLE `IoT`(
    `id_Dispositivo` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `latitudine` DECIMAL(8, 2) NOT NULL,
    `longitudine` DECIMAL(8, 2) NOT NULL,
    `data_Installazione` DATE NOT NULL,
    `data_Revisione` DATE NOT NULL
);
CREATE TABLE `Biciclette`(
    `id_Bicicletta` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `modello` VARCHAR(255) NOT NULL,
    `scheda_IoT` MEDIUMINT NOT NULL,
    `sede_appartenenza` SMALLINT NOT NULL
);
CREATE TABLE `Noleggi`(
    `id_Noleggio` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `data` DATE NOT NULL,
    `ora_Inizio` TIME NOT NULL,
    `ora_Fine` TIME NULL,
    `distanza_Percorsa` FLOAT(53) NOT NULL,
    `prezzo` TINYINT NULL,
    `utente` BIGINT NOT NULL,
    `bicicletta` MEDIUMINT NOT NULL
);
CREATE TABLE `Utenti`(
    `id_Utente` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(255) NOT NULL,
    `cognome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `num_token` MEDIUMINT NOT NULL DEFAULT '100'
);
ALTER TABLE
    `Biciclette` ADD CONSTRAINT `biciclette_scheda_iot_foreign` FOREIGN KEY(`scheda_IoT`) REFERENCES `IoT`(`id_Dispositivo`);
ALTER TABLE
    `Biciclette` ADD CONSTRAINT `biciclette_sede_appartenenza_foreign` FOREIGN KEY(`sede_appartenenza`) REFERENCES `Sedi`(`id_Sede`);
ALTER TABLE
    `Noleggi` ADD CONSTRAINT `noleggi_utente_foreign` FOREIGN KEY(`utente`) REFERENCES `Utenti`(`id_Utente`);
ALTER TABLE
    `Noleggi` ADD CONSTRAINT `noleggi_bicicletta_foreign` FOREIGN KEY(`bicicletta`) REFERENCES `Biciclette`(`id_Bicicletta`);
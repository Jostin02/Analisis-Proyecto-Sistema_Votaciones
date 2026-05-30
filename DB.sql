-- Crear base de datos
CREATE DATABASE sistema_votaciones;
USE sistema_votaciones;

-- Tabla de mesas/polling stations
CREATE TABLE polling_stations (
    station_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    address VARCHAR(200) NOT NULL,
    capacity INT NOT NULL,
    status ENUM('active','inactive') DEFAULT 'active'
);

-- Tabla de votantes
CREATE TABLE voters (
    voter_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    id_number VARCHAR(50) UNIQUE NOT NULL,
    polling_station_id INT NOT NULL,
    registration_date DATE NOT NULL,
    FOREIGN KEY (polling_station_id) REFERENCES polling_stations(station_id)
);

-- Tabla de votaciones
CREATE TABLE votaciones (
    votacion_id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado ENUM('activa','cerrada') DEFAULT 'activa'
);

-- Tabla de candidatos
CREATE TABLE candidates (
    candidate_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    party VARCHAR(100) NOT NULL,
    votacion_id INT NOT NULL,
    FOREIGN KEY (votacion_id) REFERENCES votaciones(votacion_id)
);

-- Tabla de resultados
CREATE TABLE resultados (
    resultado_id INT AUTO_INCREMENT PRIMARY KEY,
    station_id INT NOT NULL,
    votacion_id INT NOT NULL,
    candidate_id INT NOT NULL,
    votos INT NOT NULL,
    FOREIGN KEY (station_id) REFERENCES polling_stations(station_id),
    FOREIGN KEY (votacion_id) REFERENCES votaciones(votacion_id),
    FOREIGN KEY (candidate_id) REFERENCES candidates(candidate_id)
);


INSERT INTO polling_stations (name, address, capacity, status)
VALUES ('Mesa 1', 'Av. Reforma #123', 300, 'active');

select * from polling_stations;
select * from candidates;
select * from votaciones;
select * from voters;

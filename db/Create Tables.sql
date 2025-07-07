CREATE DATABASE IF NOT EXISTS crime_db;
USE crime_db;
DROP TABLE IF EXISTS Victim;
DROP TABLE IF EXISTS Coordinates;
DROP TABLE IF EXISTS Times;
DROP TABLE IF EXISTS Crime_Records;
DROP TABLE IF EXISTS Crime;
DROP TABLE IF EXISTS Area;
DROP TABLE IF EXISTS Weapon;

CREATE TABLE Area (
    area_code INT PRIMARY KEY NOT NULL,
    area_name VARCHAR(100) NOT NULL
);

CREATE TABLE Crime (
    crime_code INT PRIMARY KEY NOT NULL,
    crime_desc VARCHAR(100) NOT NULL
);


CREATE TABLE Weapon (
    weapon_code INT PRIMARY KEY NOT NULL,
    weapon_desc VARCHAR(100) NOT NULL
);

CREATE TABLE Crime_Records (
    dr_num INT PRIMARY KEY NOT NULL,
    weapon_code INT,
    area_code INT NOT NULL,
    crime_code INT NOT NULL,
    FOREIGN KEY (weapon_code) REFERENCES Weapon(weapon_code),
    FOREIGN KEY (area_code) REFERENCES Area(area_code),
    FOREIGN KEY (crime_code) REFERENCES Crime(crime_code)
    ON DELETE CASCADE
);



CREATE TABLE Victim (
    dr_num INT PRIMARY KEY,
    age INT CHECK (age >= 0),
    sex CHAR(1),
    race CHAR(1),
    FOREIGN KEY (dr_num) REFERENCES Crime_Records(dr_num)
    ON DELETE CASCADE
);


CREATE TABLE Times (
    dr_num INT PRIMARY KEY,
    date_reported DATE NOT NULL,
    date_occurred DATE NOT NULL,
    time_occurred TIME NOT NULL,
    CHECK (date_reported >= date_occurred),
	FOREIGN KEY (dr_num) REFERENCES Crime_Records(dr_num)
	ON DELETE CASCADE
);

CREATE TABLE Coordinates (
    dr_num INT PRIMARY KEY,
    latitude DECIMAL(8,4) NOT NULL,
    longitude DECIMAL(8,4) NOT NULL,
    FOREIGN KEY (dr_num) REFERENCES Crime_Records(dr_num)
    ON DELETE CASCADE
);

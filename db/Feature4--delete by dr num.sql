USE crime_db;

DELETE FROM Victim WHERE dr_num = ?;
DELETE FROM Coordinates WHERE dr_num = ?;
DELETE FROM times WHERE dr_num = ?;
DELETE FROM Crime_Records WHERE dr_num = ?;

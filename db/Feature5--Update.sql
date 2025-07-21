INSERT ignore INTO Weapon VALUES
(?, ?);

UPDATE Crime_Records
SET weapon_code = ?
WHERE dr_num = ?;

SELECT weapon_desc from Weapon where weapon_code = ?;
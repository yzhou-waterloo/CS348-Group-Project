INSERT ignore INTO Weapon VALUES
(?, ?);

UPDATE Crime_Records
SET weapon_code = ?
WHERE dr_num = ?;

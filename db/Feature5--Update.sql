START TRANSACTION;

INSERT IGNORE INTO Weapon VALUES (?, ?);

UPDATE Crime_Records
SET weapon_code = ?
WHERE dr_num = ?;

COMMIT;

SELECT weapon_desc FROM Weapon WHERE weapon_code = ?;

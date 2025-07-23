START TRANSACTION;
INSERT ignore INTO Area VALUES
(?, ?);

INSERT ignore INTO Crime VALUES
(?, ?);

INSERT INTO Crime_Records VALUES
(?, ?, ?, ?);

INSERT INTO Times VALUES
(?, ?, ?, ?);

INSERT INTO Coordinates VALUES
(?, ?, ?);

INSERT INTO Victim VALUES
(?, ?, ?, ?);
COMMIT;

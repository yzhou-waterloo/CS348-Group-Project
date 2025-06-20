USE crime_db;

SELECT dr_num, date_occurred
FROM crime_records NATURAL JOIN times
WHERE date_occurred >= ? and date_occurred <= ?;

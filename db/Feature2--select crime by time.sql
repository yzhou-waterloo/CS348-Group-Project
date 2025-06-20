USE crime_db;

SELECT dr_num, date_occurred
FROM crime_records NATURAL JOIN times
WHERE date_occurred >= '2020-01-01' and date_occurred <= '2020-12-01';

SELECT crime_code, COUNT(*) as frequency
FROM crime_records
GROUP BY crime_code
ORDER BY COUNT(*) desc;

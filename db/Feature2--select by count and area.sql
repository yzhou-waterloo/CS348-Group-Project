SELECT area.area_name as label, 
	ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM crime_records), 2) AS percent


FROM crime_records
JOIN area ON crime_records.area_code = area.area_code
GROUP BY area.area_name
ORDER BY percent DESC
LIMIT 5;


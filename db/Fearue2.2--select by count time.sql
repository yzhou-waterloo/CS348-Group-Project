SELECT 
    HOUR(t.time_occurred) AS hour,
    ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM crime_records), 2) AS percent
FROM crime_records cr
JOIN times t ON cr.dr_num = t.dr_num
GROUP BY hour
ORDER BY percent DESC;
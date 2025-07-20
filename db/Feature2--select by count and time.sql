WITH Times_with_hour AS (
  SELECT 
    HOUR(time_occurred) AS hour,
    COUNT(*) AS frequency
  FROM Times
  GROUP BY hour
),
total AS (
  SELECT SUM(frequency) AS total_frequency FROM Times_with_hour
)
SELECT 
  Times_with_hour.hour as label,
  ROUND(100.0 * Times_with_hour.frequency / total.total_frequency, 2) AS percent
FROM Times_with_hour
JOIN total
ORDER BY percent DESC
LIMIT 5;

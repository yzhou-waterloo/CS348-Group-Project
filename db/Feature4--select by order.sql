SELECT 
    cr.dr_num, c.crime_desc, v.age, t.date_occurred, t.time_occurred, a.area_name
FROM crime_records cr
JOIN crime c ON cr.crime_code = c.crime_code
JOIN victim v ON cr.dr_num = v.dr_num
JOIN time t ON cr.dr_num = t.dr_num
JOIN area a ON cr.area_code = a.area_code
ORDER BY v.age DESC;

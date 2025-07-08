SELECT 
    cr.dr_num,
    a.area_code, a.area_name,
    c.crime_code, c.crime_desc,
    w.weapon_code, w.weapon_desc,
    t.date_reported, t.date_occurred, t.time_occurred,
    v.age, v.sex, v.race,
    co.latitude, co.longitude
FROM crime_records cr
JOIN area a ON cr.area_code = a.area_code
JOIN crime c ON cr.crime_code = c.crime_code
LEFT OUTER JOIN weapon w ON cr.weapon_code = w.weapon_code
JOIN times t ON cr.dr_num = t.dr_num
LEFT OUTER JOIN victim v ON cr.dr_num = v.dr_num
LEFT OUTER JOIN coordinates co ON cr.dr_num = co.dr_num
WHERE a.area_name LIKE '%77th Street%' and t.date_occurred > '2020-12-13';
USE crime_db;

SELECT 
    cr.dr_num,
    cr.crime_code,
    c.crime_desc,
    cr.area_code,
    a.area_name,
    cr.weapon_code,
    w.weapon_desc,
    
    t.date_reported,
    t.date_occurred,
    t.time_occurred,

    v.age AS victim_age,
    v.sex AS victim_sex,
    v.race AS victim_race,

    co.latitude,
    co.longitude

FROM Crime_Records cr
LEFT JOIN Crime c ON cr.crime_code = c.crime_code
LEFT JOIN Area a ON cr.area_code = a.area_code
LEFT JOIN Weapon w ON cr.weapon_code = w.weapon_code
LEFT JOIN Times t ON cr.dr_num = t.dr_num
LEFT JOIN Victim v ON cr.dr_num = v.dr_num
LEFT JOIN Coordinates co ON cr.dr_num = co.dr_num;


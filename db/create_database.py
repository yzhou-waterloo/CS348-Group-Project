import pandas as pd

MAX_ROWS = 10000 #SET THIS TO THE NUMBER OF ROWS YOU WANT TO EXPORT


sql_output = open("Production Data.sql", "w", encoding="utf-8")

df = pd.read_csv("Crime_Data_from_2020_to_Present.csv").head(MAX_ROWS)

area_code_used = set()
crime_code_used = set()
weapon_code_used = set()

for _, row in df.iterrows():
    try:
        dr_num = int(row["DR_NO"])
        area_code = int(row["AREA"])
        area_name = str(row["AREA NAME"]).strip().replace("'", "''")

        crime_code = int(row["Crm Cd"])
        crime_desc = str(row["Crm Cd Desc"]).strip().replace("'", "''")

        weapon_code = int(row["Weapon Used Cd"]) if pd.notna(row["Weapon Used Cd"]) else None
        weapon_desc = str(row["Weapon Desc"]).strip().replace("'", "''") if pd.notna(row["Weapon Desc"]) else None

        date_rptd = pd.to_datetime(row["Date Rptd"], errors='coerce')
        date_occ = pd.to_datetime(row["DATE OCC"], errors='coerce')
        time_occ = str(int(row["TIME OCC"])).zfill(4)
        time_occurred = f"{time_occ[:2]}:{time_occ[2:]}:00"

        age = int(row["Vict Age"]) if not pd.isna(row["Vict Age"]) else None
        if (age < 0):
            age = 0
        sex = str(row["Vict Sex"]).strip() if pd.notna(row["Vict Sex"]) else None
        race = str(row["Vict Descent"]).strip() if pd.notna(row["Vict Descent"]) else None

        lat = float(row["LAT"]) if pd.notna(row["LAT"]) else None
        lon = float(row["LON"]) if pd.notna(row["LON"]) else None

        if area_code not in area_code_used:
            sql_output.write(f"INSERT INTO Area VALUES ({area_code}, '{area_name}');\n")
            area_code_used.add(area_code)

        if crime_code not in crime_code_used:
            sql_output.write(f"INSERT INTO Crime VALUES ({crime_code}, '{crime_desc}');\n")
            crime_code_used.add(crime_code)

        if weapon_code and weapon_code not in weapon_code_used:
            sql_output.write(f"INSERT INTO Weapon VALUES ({weapon_code}, '{weapon_desc}');\n")
            weapon_code_used.add(weapon_code)

        sql_output.write(f"INSERT INTO Crime_Records VALUES ({dr_num}, {weapon_code if weapon_code is not None else 'NULL'}, {area_code}, {crime_code});\n")

        if pd.notna(date_rptd) and pd.notna(date_occ):
            sql_output.write(f"INSERT INTO Times VALUES ({dr_num}, '{date_rptd.date()}', '{date_occ.date()}', '{time_occurred}');\n")

        if lat is not None and lon is not None:
            sql_output.write(f"INSERT INTO Coordinates VALUES ({dr_num}, {lat}, {lon});\n")

        if age is not None and sex is not None and race is not None:
            sql_output.write(f"INSERT INTO Victim VALUES ({dr_num}, {age}, '{sex}', '{race}');\n")

    except Exception as e:
        print(f"Skipping row due to error: {e}")

sql_output.close()
print(f" Exported {MAX_ROWS} rows to Production Data.sql")


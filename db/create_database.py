import pandas as pd
import mysql.connector


MAX_ROWS = 30 # CHANGE THIS TO DECIDE HOW MANY ROWS YOU WANT FROM THE CSV AHHH


# Connect to your MySQL database
conn = mysql.connector.connect(
    host='127.0.0.1',
    user='root',
    password='                                 ',  # CHANGE THIS TO YOUR PASSWORD IM NOT SHOWING MINE
    database='crime_db'
)
cursor = conn.cursor()

# === Load CSV file

# === Clear all existing data
cursor.execute("DELETE FROM Victim")
cursor.execute("DELETE FROM Coordinates")
cursor.execute("DELETE FROM Times")
cursor.execute("DELETE FROM Crime_Records")
cursor.execute("DELETE FROM Weapon")
cursor.execute("DELETE FROM Area")
cursor.execute("DELETE FROM Crime")


df = pd.read_csv("Crime_Data_from_2020_to_Present.csv").head(MAX_ROWS)


# === Code tracking to avoid duplicate inserts
area_map = {}
crime_map = {}
weapon_map = {}

area_code_used = set()
crime_code_used = set()
weapon_code_used = set()

for _, row in df.iterrows():
    try:
        # === Normalize and map values
        dr_num = int(row["DR_NO"])
        area_code = int(row["AREA"])
        area_name = str(row["AREA NAME"]).strip()

        crime_code = int(row["Crm Cd"])
        crime_desc = str(row["Crm Cd Desc"]).strip()

        weapon_code = int(row["Weapon Used Cd"]) if not pd.isna(row["Weapon Used Cd"]) else None
        weapon_desc = str(row["Weapon Desc"]).strip() if pd.notna(row["Weapon Desc"]) else None

        date_rptd = pd.to_datetime(row["Date Rptd"], errors='coerce')
        date_occ = pd.to_datetime(row["DATE OCC"], errors='coerce')
        time_occ = str(int(row["TIME OCC"])).zfill(4)
        time_occurred = f"{time_occ[:2]}:{time_occ[2:]}:00"

        age = int(row["Vict Age"]) if not pd.isna(row["Vict Age"]) else None
        sex = str(row["Vict Sex"]).strip() if pd.notna(row["Vict Sex"]) else None
        race = str(row["Vict Descent"]).strip() if pd.notna(row["Vict Descent"]) else None

        lat = float(row["LAT"]) if pd.notna(row["LAT"]) else None
        lon = float(row["LON"]) if pd.notna(row["LON"]) else None

        # === Insert into Area (once)
        if area_code not in area_code_used:
            cursor.execute("INSERT INTO Area VALUES (%s, %s)", (area_code, area_name))
            area_code_used.add(area_code)

        # === Insert into Crime (once)
        if crime_code not in crime_code_used:
            cursor.execute("INSERT INTO Crime VALUES (%s, %s)", (crime_code, crime_desc))
            crime_code_used.add(crime_code)

        # === Insert into Weapon (once)
        if weapon_code and weapon_code not in weapon_code_used:
            cursor.execute("INSERT INTO Weapon VALUES (%s, %s)", (weapon_code, weapon_desc))
            weapon_code_used.add(weapon_code)

        # === Insert into Crime_Records
        cursor.execute("""
            INSERT INTO Crime_Records (dr_num, weapon_code, area_code, crime_code)
            VALUES (%s, %s, %s, %s)
        """, (dr_num, weapon_code, area_code, crime_code))

        # === Insert into Times
        if pd.notna(date_rptd) and pd.notna(date_occ):
            cursor.execute("""
                INSERT INTO Times (dr_num, date_reported, date_occurred, time_occurred)
                VALUES (%s, %s, %s, %s)
            """, (dr_num, date_rptd.date(), date_occ.date(), time_occurred))

        # === Insert into Coordinates
        if lat is not None and lon is not None:
            cursor.execute("""
                INSERT INTO Coordinates (dr_num, latitude, longitude)
                VALUES (%s, %s, %s)
            """, (dr_num, lat, lon))

        # === Insert into Victim
        if age is not None:
            cursor.execute("""
                INSERT INTO Victim (dr_num, age, sex, race)
                VALUES (%s, %s, %s, %s)
            """, (dr_num, age, sex, race))

    except Exception as e:
        print(f"Skipping row due to error: {e}")

# === Commit and close
conn.commit()
cursor.close()
conn.close()

print("Data imported successfully.")

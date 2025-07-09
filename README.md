# CS348-Group-Project
CS348 Group Project

***
Frontend

Install dependencies:
```bash
npm install
```

Run frontend:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
- [http://localhost:3000/get](http://localhost:3000/get) to view the GET page
- [http://localhost:3000/delete](http://localhost:3000/delete) to view the DELETE page
- [http://localhost:3000/insert](http://localhost:3000/insert) to view the INSERT page

___
Backend:

Inside /backend:

Install dependencies:
```bash
npm install
```
Database connection setup: In /backend/db.ts, fill in the database credentials (host, user, password, database). The server will attempt to connect 
to it when launched and will exit if the connection failed.

Run:
```bash
npm run dev
```

The server should not be listening on port 8080 and can serve frontend requests.

___
DateBase

1. How to Create and Load the Sample Database

Requirements:
- MySQL Server
- MySQL Workbench or MySQL CLI
- Scripts:
  - Create Tables.sql
  - Create sample data.sql

Steps:

1. Start MySQL Workbench.
2. Open the script 'Create Tables.sql' and run it. This will:
   - Create the database 'crime_db' (if it does not exist)
   - Create all required tables with constraints and foreign keys

3. Open the script 'Create sample data.sql' and run it. This will:
   - Insert 10 rows of sample datas into the database

To run each feature:

1. Open and execute the corresponding SQL file (like Feature1--count by crime code.sql)

2. View results directly in the output (for Feature1, the ouput will be in feature1.out)


HOW TO CREATE PRODUCTION DATASET

1. Open the create_database.py file, change the first variable "MAX_ROWS" to the value you want the production dataset to be (OURS is 10000)
2. Download Crime_Data_from_2020_to_Present.csv file from the website https://catalog.data.gov/dataset/crime-data-from-2020-to-present
and put the csv file in the same folder of the python script(db/) 
3. run python create_database.py
4. Go to mysql workbench, open the Production Data.sql file, excute it. (make you you have excuted the Create Table.sql already)
(If you created the sample data before this, add those lines at the top of the Production Data.sql file:
CREATE DATABASE IF NOT EXISTS crime_db;
USE crime_db;
DROP TABLE IF EXISTS Victim;
DROP TABLE IF EXISTS Coordinates;
DROP TABLE IF EXISTS Times;
DROP TABLE IF EXISTS Crime_Records;
DROP TABLE IF EXISTS Crime;
DROP TABLE IF EXISTS Area;
DROP TABLE IF EXISTS Weapon;
)
5. This should create the prduction data, if it doesn't, please contact us.

Currently feature1--count with filters, feature2--select by count, feature3--add new records. are implemented in our frontend. 
the files that contains the implementation have the same file name as the features.



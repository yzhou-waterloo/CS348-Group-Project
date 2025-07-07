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



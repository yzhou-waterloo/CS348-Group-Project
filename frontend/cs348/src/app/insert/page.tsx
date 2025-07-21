'use client'

import React, {useState} from "react"
import TextField from '@mui/material/TextField';

export default function Insert() {
    const [drNum, setDrNum] = useState("");
    const [dateRep, setDateRep] = useState("");
    const [dateOcc, setDateOcc] = useState("");
    const [timeOcc, setTimeOcc] = useState("");
    const [areaCode, setAreaCode] = useState("");
    const [areaName, setAreaName] = useState("");
    const [crimeCode, setCrimeCode] = useState("");
    const [crimeDesc, setCrimeDesc] = useState("");
    const [victAge, setVictAge] = useState("");
    const [victSex, setVictSex] = useState("");
    const [victRace, setVictRace] = useState("");
    const [weapCode, setWeapCode] = useState("");
    const [weapDesc, setWeapDesc] = useState("");
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");
    const [status, setStatus] = useState("");

    const handleInsertRecords = async () => {
        if (drNum === "" ||
            dateRep === "" ||
            dateOcc === "" ||
            timeOcc === "" ||
            areaCode === "" ||
            areaName === "" ||
            crimeCode === "" ||
            crimeDesc === "" ||
            victAge === "" ||
            victSex === "" ||
            victRace === "" ||
            lat === "" ||
            lon === ""
        ) {
            return;
        }

        try {
          const requestBody = {
              "dr_num": drNum,
              "date_reported": dateRep,
              "date_occurred": dateOcc,
              "time_occurred": timeOcc,
              "area_code": areaCode,
              "area_name": areaName,
              "crime_code": crimeCode,
              "crime_description": crimeDesc,
              "victim_age": victAge,
              "sex": victSex,
              "race": victRace,
              "weapon_code": weapCode,
              "weapon_description": weapDesc,
              "latitude": lat,
              "longitude": lon
          }
    
          const response = await fetch("http://localhost:8080/insert", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });
    
          if (response.ok) {
            setStatus("Success");
          } else {
            console.error("Error inserting record")
            setStatus("Error");
          }
        } catch (error) {
          console.error("Error: ", error);
          setStatus("Error");
        }
    }

    return (
        <div className="font-[family-name:var(--font-geist-sans)]">
            <div className="flex justify-left items-center mb-2 ml-5">
                <p className="mr-2">DR Num</p>
                <TextField
                id="drnum-text"
                label="DR Num"
                variant="outlined"
                value={drNum}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDrNum(e.target.value)}
                required
                />
            </div>

            <div className="flex justify-left items-center mb-2 ml-5">
                <p className="mr-2">Date Reported</p>
                <TextField
                id="daterep-text"
                label="Date Reported"
                variant="outlined"
                value={dateRep}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateRep(e.target.value)}
                required
                />
            </div>

            <div className="flex justify-left items-center mb-2 ml-5">
                <p className="mr-2">Date Occurred</p>
                <TextField
                id="dateocc-text"
                label="Date Occurred"
                variant="outlined"
                value={dateOcc}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateOcc(e.target.value)}
                required
                />
            </div>

            <div className="flex justify-left items-center mb-2 ml-5">
                <p className="mr-2">Time Occurred</p>
                <TextField
                id="timeocc-text"
                label="Time Occurred"
                variant="outlined"
                value={timeOcc}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTimeOcc(e.target.value)}
                required
                />
            </div>

            <div className="flex justify-left items-center mb-2 ml-5">
                <p className="mr-2">Area Code</p>
                <TextField
                id="areacode-text"
                label="Area Code"
                variant="outlined"
                value={areaCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAreaCode(e.target.value)}
                required
                />
            </div>

            <div className="flex justify-left items-center mb-2 ml-5">
                <p className="mr-2">Area Name</p>
                <TextField
                id="areaname-text"
                label="Area Name"
                variant="outlined"
                value={areaName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAreaName(e.target.value)}
                required
                />
            </div>

            <div className="flex justify-left items-center mb-2 ml-5">
                <p className="mr-2">Crime Code</p>
                <TextField
                id="crimecode-text"
                label="Crime Code"
                variant="outlined"
                value={crimeCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCrimeCode(e.target.value)}
                required
                />
            </div>

            <div className="flex justify-left items-center mb-2 ml-5">
                <p className="mr-2">Crime Description</p>
                <TextField
                id="crimedesc-text"
                label="Crime Description"
                variant="outlined"
                value={crimeDesc}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCrimeDesc(e.target.value)}
                required
                />
            </div>

            <div className="flex justify-left items-center mb-2 ml-5">
                <p className="mr-2">Victim Age</p>
                <TextField
                id="victage-text"
                label="Victim Age"
                variant="outlined"
                value={victAge}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVictAge(e.target.value)}
                required
                />
            </div>

            <div className="flex justify-left items-center mb-2 ml-5">
                <p className="mr-2">Victim Sex</p>
                <TextField
                id="victsex-text"
                label="Victim Sex"
                variant="outlined"
                value={victSex}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVictSex(e.target.value)}
                required
                />
            </div>

            <div className="flex justify-left items-center mb-2 ml-5">
                <p className="mr-2">Victim Race</p>
                <TextField
                id="victrace-text"
                label="Victim Race"
                variant="outlined"
                value={victRace}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVictRace(e.target.value)}
                required
                />
            </div>

            <div className="flex justify-left items-center mb-2 ml-5">
                <p className="mr-2">Weapon Code (optional)</p>
                <TextField
                id="weapcode-text"
                label="Weapon Code"
                variant="outlined"
                value={weapCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWeapCode(e.target.value)}
                />
            </div>

            <div className="flex justify-left items-center mb-2 ml-5">
                <p className="mr-2">Weapon Description (only required for new weapon codes)</p>
                <TextField
                id="weapdesc-text"
                label="Weapon Description"
                variant="outlined"
                value={weapDesc}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWeapDesc(e.target.value)}
                />
            </div>

            <div className="flex justify-left items-center mb-2 ml-5">
                <p className="mr-2">Latitude</p>
                <TextField
                id="lat-text"
                label="Latitude"
                variant="outlined"
                value={lat}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLat(e.target.value)}
                required
                />
            </div>

            <div className="flex justify-left items-center mb-2 ml-5">
                <p className="mr-2">Longitude</p>
                <TextField
                id="lon-text"
                label="Longitude"
                variant="outlined"
                value={lon}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLon(e.target.value)}
                required
                />
            </div>
            <div className="flex justify-center items-center">
                {
                    status && (
                        status == "Success" ?
                            <div className="text-green-500 text-xl">Record inserted successfully</div>
                        :
                        <div className="text-red-500 text-xl">
                            Failed to insert record. Please check for possible duplicate dr_num, invalid date/time format, 
                            or missing mandatory fields and try again
                        </div>
                    )   
                }
            </div>
            <div className="flex justify-center items-center">
                <button className="bg-black text-white p-2 rounded-lg mb-3 text-lg" onClick={() => handleInsertRecords()}>
                    Insert Record
                </button>
            </div>
            
        </div>
    );
}
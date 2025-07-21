'use client'

import React, {useState} from "react"
import TextField from '@mui/material/TextField';

export default function Update() {
    const [drNum, setDrNum] = useState("");
    const [weapCode, setWeapCode] = useState("");
    const [weapDesc, setWeapDesc] = useState("");
    const [status, setStatus] = useState("");

    const handleUpdateRecord = async() => {
        if (drNum == "" || weapCode == "" || weapDesc == "") {
            return;
        }

        try {
          const requestBody = {
              "dr_num": drNum,
              "weapon_code": weapCode,
              "weapon_description": weapDesc,
          }
    
          const response = await fetch("http://localhost:8080/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });
    
          if (response.ok) {

            // DEBUG
            console.log("update successful")

            const json = await response.json();
            console.log("Response JSON: ", json);

            setStatus("Successfully updated the weapon description of record with DR Num = " + drNum + " to " + json.weapon_desc);
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
            <p className="font-bold text-lg mb-2 ml-5">
                Update Weapon Field in Record
            </p>
            <div className="flex justify-left items-center mb-2 ml-5">
                <p className="mr-2">DR Num</p>
                <TextField
                id="drNum-text"
                label="DR Num"
                variant="outlined"
                value={drNum}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDrNum(e.target.value)}
                required
                />
            </div>

            <div className="flex justify-left items-center mb-2 ml-5">
                <p className="mr-2">Weapon Code</p>
                <TextField
                id="weaponCode-text"
                label="Weapon Code"
                variant="outlined"
                value={weapCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWeapCode(e.target.value)}
                required
                />
            </div>

            <div className="flex justify-left items-center mb-2 ml-5">
                <p className="mr-2">Weapon Desc</p>
                <TextField
                id="weapDesc-text"
                label="Weapon Description"
                variant="outlined"
                value={weapDesc}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWeapDesc(e.target.value)}
                required
                />
            </div>

            <div className="flex justify-center items-center">
                <button className="bg-black text-white p-2 rounded-lg mb-3 text-lg" onClick={() => handleUpdateRecord()}>
                    Update Record
                </button>
            </div>

            <div className="flex justify-center items-center">
                {
                    status && (
                        status !== "Error" ?
                            <div className="text-green-500">{status}</div>
                        :
                        <div className="text-red-500">Error</div>
                    )   
                }
            </div>
        </div>
    );
}
'use client'

import React, {useState} from "react"
import TextField from "@mui/material/TextField";

export default function Delete() {
  const [drNum, setDrNum] = useState("");
  const [status, setStatus] = useState("");

  const handleDeleteRecord = async () => {
    if (drNum == "") {
        return;
    }

    try {

      const requestBody = {
        "dr_num": drNum,
      }

      const response = await fetch("http://localhost:8080/delete_record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();

        console.log(data);
        setStatus("Success");
      } else {
        console.error("Error getting record with dr_num: " + drNum)
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
          Delete Weapon
      </p>
      <div className="flex justify-left items-center mb-2 ml-5">
        <p className="mr-2">DR Num</p>
        <TextField 
            id="filter-text" 
            label="DR Num"
            variant="outlined"
            value={drNum}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setDrNum(event.target.value);
            }}
            required
        />
      </div>
      <div className="flex justify-center items-center">
          <button className="bg-black text-white p-2 rounded-lg mb-3 text-lg" onClick={() => handleDeleteRecord()}>
              Delete Record
          </button>
      </div>
      <div className="flex justify-center items-center">
          {
              status && (
                  status ?
                      <div className="text-green-500">Record deleted successfully</div>
                  :
                  <div className="text-red-500">Error</div>
              )   
          }
      </div>
    </div>
  );
}

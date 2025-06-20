'use client'

import React, {useState} from "react"

export default function Delete() {
  const [drNum, setDrNum] = useState("");
  const [status, setStatus] = useState("");

  const handleDeleteRecord = async () => {
    try {
      const response = await fetch("http://localhost:8080/delete_record", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(drNum),
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
        <div className="flex justify-center items-center">
            <button className="bg-black text-white p-2 rounded-lg m-1" onClick={() => handleDeleteRecord()}>
            Delete Record
            </button>
            <input 
            className="bg-white text-black border border-black p-2 rounded-lg m-1"
            type="text"
            placeholder="DR Num"
            value={drNum}
            onChange={(e) => setDrNum(e.target.value)}
            />
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

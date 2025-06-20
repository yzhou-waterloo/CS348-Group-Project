'use client'

import React, {useState} from "react"

export default function Get() {
  const [drNum, setDrNum] = useState("");
  const [status, setStatus] = useState("");
  const [recordData, setRecordData] = useState([{
    dr_num: "211507896",
    time: {
      date_reported: "04/11/2021",
      date_occurred: "11/07/2020",
      time_occurred: "0845"
    },
    area: {
      area_code: "15",
      area_name: "N Hollywood"
    },
    crime: {
      crime_code: "354",
      crime_desc: "THEFT OF IDENTITY"
    },
    victim: {
      age: "31",
      sex: "M",
      race: "H"
    },
    weapon: {
      weapon_code: "",
      weapon_desc: ""
    },
    coordinates: {
      latitude: "34.2124",
      longitude: "-118.4092"
    }
  }
  // ,
  // {
  //   dr_num: "201516622",
  //   time: {
  //     date_reported: "10/21/2022",
  //     date_occurred: "07/23/2021",
  //     time_occurred: "1145"
  //   },
  //   area: {
  //     area_code: "14",
  //     area_name: "Pacific"
  //   },
  //   crime: {
  //     crime_code: "230",
  //     crime_desc: "ASSAULT WITH DEADLY WEAPON, AGGRAVATED ASSAULT"
  //   },
  //   victim: {
  //     age: "32",
  //     sex: "F",
  //     race: "W"
  //   },
  //   weapon: {
  //     weapon_code: "200",
  //     weapon_desc: "KNIFE WITH BLADE 6INCHES OR LESS"
  //   },
  //   coordinates: {
  //     latitude: "34.1994",
  //     longitude: "-118.4203"
  //   }
  // }
]);

  const handleGetRecord = async () => {
    try {
      const response = await fetch("http://localhost:8080/get_record", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(drNum),
      });

      if (response.ok) {
        const data = await response.json();

        setRecordData([data]);

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
        <button className="bg-black text-white p-2 rounded-lg m-1" onClick={() => handleGetRecord()}>
          Get Record
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
                <div className="text-green-500">Record(s) returned successfully</div>
            :
            <div className="text-red-500">Error</div>
          )   
        }
      </div>
      
      <div className="flex justify-center items-center">
        <table className="table-auto border text-sm m-1">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-2 border">DR Num</th>
              <th className="p-2 border">Date Reported</th>
              <th className="p-2 border">Date Occurred</th>
              <th className="p-2 border">Time Occurred</th>
              <th className="p-2 border">Area Code</th>
              <th className="p-2 border">Area Name</th>
              <th className="p-2 border">Crime Code</th>
              <th className="p-2 border">Crime Description</th>
              <th className="p-2 border">Victim Age</th>
              <th className="p-2 border">Sex</th>
              <th className="p-2 border">Race</th>
              <th className="p-2 border">Weapon Code</th>
              <th className="p-2 border">Weapon Description</th>
              <th className="p-2 border">Latitude</th>
              <th className="p-2 border">Longitude</th>
            </tr>
          </thead>
          {recordData.map((record, index) => (
            <tbody key={index}>
              <tr className="bg-white">
                <td className="p-2 border">{record.dr_num}</td>
                <td className="p-2 border">{record.time.date_reported}</td>
                <td className="p-2 border">{record.time.date_occurred}</td>
                <td className="p-2 border">{record.time.time_occurred}</td>
                <td className="p-2 border">{record.area.area_code}</td>
                <td className="p-2 border">{record.area.area_name}</td>
                <td className="p-2 border">{record.crime.crime_code}</td>
                <td className="p-2 border">{record.crime.crime_desc}</td>
                <td className="p-2 border">{record.victim.age}</td>
                <td className="p-2 border">{record.victim.sex}</td>
                <td className="p-2 border">{record.victim.race}</td>
                <td className="p-2 border">{record.weapon.weapon_code || "N/A"}</td>
                <td className="p-2 border">{record.weapon.weapon_desc || "N/A"}</td>
                <td className="p-2 border">{record.coordinates.latitude}</td>
                <td className="p-2 border">{record.coordinates.longitude}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

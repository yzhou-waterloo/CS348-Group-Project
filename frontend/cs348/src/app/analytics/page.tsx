'use client'
import * as React from 'react';
import { Box } from '@mui/material';
import SimplePieChart, { PieDataItem } from '../../components/PieChart';

// const handleGet = async () => {
//     try {
//       const requestBody = {
//           "dr_num": drNum,
//           "date_occurred": dateOcc,
//           "area_name": areaName
//       }

//       const response = await fetch("http://localhost:8080/get_records", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestBody),
//       });

//       if (response.ok) {
//         const data = await response.json();

//         setRecordData([data]);

//         console.log(data);
//         setStatus("Success");
//       } else {
//         console.error("Error getting records")
//         setStatus("Error");
//       }
//     } catch (error) {
//       console.error("Error: ", error);
//       setStatus("Error");
//     }
//   }

const Analytics = () => {
  // Map backend fields to required shape
  const timeData: PieDataItem[] = [
  { label: "12:00:00", percent: 7.15 },
  { label: "18:00:00", percent: 6.04 },
  { label: "20:00:00", percent: 5.85 },
  { label: "16:00:00", percent: 5.61 },
  { label: "17:00:00", percent: 5.57 },
  ];

  const areaData: PieDataItem[] = [
  { label: "Pacific", percent: 8.92 },
  { label: "N Hollywood", percent: 8.05 },
  { label: "Southeast", percent: 7.89 },
  { label: "Olympic", percent: 7.87 },
  { label: "Mission", percent: 6.80 },
];

  return (
    <Box display="flex" minHeight="100vh" sx={{ 
        backgroundColor: '#f5f5f5',
        p: 1, 
        boxSizing: 'border-box'
      }}>
      <Box 
        width="50%" 
        sx={{ 
          pl: 0.5, // Half padding between charts
          height: '100%',
        }}
      >
        <SimplePieChart 
          data={timeData} 
          title="Peak Crime Hours (Top 5)" 
        />
      </Box>
      
      <Box 
        width="50%" 
        sx={{ 
          pl: 0.5,
          height: '100%',
        }}
      >
        <SimplePieChart 
          data={areaData} 
          title="Peak Crime Locations (Top 5)" 
        />
      </Box>
    </Box>
  );
};

export default Analytics;


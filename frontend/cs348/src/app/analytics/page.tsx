'use client'
import * as React from 'react';
import { Box } from '@mui/material';
import SimplePieChart, { PieDataItem } from '../../components/PieChart';

const Analytics = () => {
  // Map backend fields to required shape
  const [timeData, setTimeData] = React.useState<PieDataItem[]>([]);
  const [areaData, setAreaData] = React.useState<PieDataItem[]>([]);

//   const areaData: PieDataItem[] = [
//   { label: "Pacific", percent: 8.92 },
//   { label: "N Hollywood", percent: 8.05 },
//   { label: "Southeast", percent: 7.89 },
//   { label: "Olympic", percent: 7.87 },
//   { label: "Mission", percent: 6.80 },
// ];

  const getRecords = async () => {
    try {
      const timeResponse = await fetch("http://localhost:8080/countTime", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }); 

      if (timeResponse.ok) {
        const data = await timeResponse.json();
      const converted = Array.isArray(data)
        ? data.map((item) => ({
            ...item,
            percent: Number(item.percent),
          }))
        : [];
      setTimeData(converted);
      console.log(converted);
      } else {
        console.error("Error getting records")
      }

      const areaResponse = await fetch("http://localhost:8080/countArea", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (areaResponse.ok) {
        const data = await areaResponse.json();
      const converted = Array.isArray(data)
        ? data.map((item) => ({
            ...item,
            percent: Number(item.percent),
          }))
        : [];
      setAreaData(converted);
      console.log(converted);
      } else {
        console.error("Error getting records")
      }

    } catch (error) {
      console.error("Error: ", error);
    }
  }

  React.useEffect(() => {
    getRecords();
  }, []);

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


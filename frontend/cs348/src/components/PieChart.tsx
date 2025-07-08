import React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Box, Typography } from '@mui/material';

export interface PieDataItem {
  label: string;
  percent: number;
}

interface SimplePieChartProps {
  data: PieDataItem[];
  title?: string;
}

const SimplePieChart: React.FC<SimplePieChartProps> = ({ data, title = "Data Distribution" }) => {

  if (!data || data.length === 0) {
    return (
      <Box width="100%" p={2} display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h6" color="textSecondary" textAlign="center">
          No data available
        </Typography>
      </Box>
    );
  }

  const chartData = data.map((item, index) => ({
    id: index,
    value: item.percent,
    label: item.label,
  }));

  return (
    <Box 
      width="100%" 
      display="flex"
      flexDirection="column"
      sx={{ 
        p: 1,
        boxSizing: 'border-box',
        height: '100%',
        // minHeight: '400px'
      }}
    >
      <Typography 
        variant="h5" 
        textAlign="center" 
        sx={{ 
          mb: 0,
          fontSize: '1.5rem',
          fontWeight: 600,    
        }}
      >
        {title}
      </Typography>
      
      <Box flex={1} display="flex" alignItems="center" justifyContent="center">
        <PieChart
          width={550}
          height={400}
          series={[
            {
              data: chartData,
              outerRadius: 150,
              paddingAngle: 2,
              cornerRadius: 5,
              arcLabel: (item) => `${item.value}%`,
            },
          ]}
          slotProps={{
            legend: {
              direction: "horizontal",
              position: { vertical: 'bottom', horizontal: 'center' },
            },
          }}
          sx={{
            '--ChartsLegend-itemWidth': '150px',
            '& .MuiChartsLegend-root': { 
              width: '100%', 
              justifyContent: 'center',
              fontSize: '1.2rem', 
            },
            [`& .${pieArcLabelClasses.root}`]: {
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default SimplePieChart;
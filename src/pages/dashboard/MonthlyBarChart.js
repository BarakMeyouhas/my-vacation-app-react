import * as React from 'react';
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function BarAnimation() {
  const [allLikes, setAllLikes] = useState([]);
  const [allVacations, setAllVacations] = useState([]);
  const [vacationData, setVacationData] = useState([]);

  useEffect(() => {
    if (allLikes.length < 1) {
      axios
        .get('https://my-vacation-app-database-721ed7af9c4d.herokuapp.com/api/v1/admin/getallLikes')
        .then((response) => response.data)
        .then((allLikes) => {
          setAllLikes(allLikes);
        });
    }
  }, []);

  useEffect(() => {
    if (allVacations.length < 1) {
      axios
        .get('https://my-vacation-app-database-721ed7af9c4d.herokuapp.com/api/v1/admin/getallvacations')
        .then((response) => response.data)
        .then((allVacations) => {
          setAllVacations(allVacations);
        });
    }
  }, []);

  useEffect(() => {
    if (allVacations.length > 1) {
      const vacationsDestinations = allVacations.map((vacation) => vacation.destination);
      const vacationLikes = vacationsDestinations.map((destination) => {
        const vacation = allVacations.find((vacation) => vacation.destination === destination);
        if (vacation) {
          const likesCount = allLikes.filter((like) => like.vacation_id === vacation.id).length;
          return {
            likes: likesCount,
            name: destination
          };
        }
      });
      setVacationData(vacationLikes);
    }
  }, [allVacations]);

  return (
    <Box sx={{ width: '100%' }}>
      {vacationData.length > 0 && (
        <BarChart
          xAxis={[
            {
              scaleType: 'band',
              data: vacationData.map((v) => v.name)
            }
          ]}
          series={[
            {
              data: vacationData.map((v) => v.likes)
            }
          ]}
          height={300}
        />
      )}
    </Box>
  );
}

// const highlightScope = {
//   highlighted: 'series',
//   faded: 'global'
// };

// const series = [
//   {
//     label: 'series 1',
//     data: [2423, 2210, 764, 1879, 1478, 1373, 1891, 2171, 620, 1269, 724, 1707, 1188, 1879, 626, 1635, 2177, 516, 1793, 1598, 724, 1707]
//   }
// ].map((s) => ({ ...s, highlightScope }));

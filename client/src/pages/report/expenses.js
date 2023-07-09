import React, {useState, useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { Pie } from 'react-chartjs-2';
import { instance } from '../../modules/axios/index';
import { Box, Text } from '@chakra-ui/react';

ChartJS.register(ArcElement, Tooltip, Legend);



const ExpensesChart = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    // Mengambil data dari API localhost:3000/api/revenue
    instance
      .get('expense')
      .then(response => {
        // Memperbarui totalExpenses dengan nilai yang diterima dari respons
        setTotalExpenses(response.data.totalExpenses);
      })
      .catch(error => {
        console.error('Terjadi kesalahan dalam mengambil data:', error);
      });
  }, []);

  const remainingBudget = 1000000 - totalExpenses; // Menghitung sisa anggaran

  const data = {
    labels: ['Expenses', 'Remaining Budget'],
    datasets: [
      {
        data: [totalExpenses, remainingBudget], // Menggunakan totalExpenses dan remainingBudget
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 2,
        with: 10
      },
    ],
  };
 
  
  return (
    <>

    <Box 
      w="100vw" 
      h="400px" 
      display={'flex'} 
      justifyContent={'center'} 
      alignItems={'center'}>

    <Text>Total expense: {totalExpenses}</Text>

    <Pie data={data} />

    </Box>
    </>
   
  );
  }

export default ExpensesChart;
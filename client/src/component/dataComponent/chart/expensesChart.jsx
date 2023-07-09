import { Box } from '@chakra-ui/react';
import { Doughnut } from 'react-chartjs-2';

const ExpensesChart = ({ totalExpenses }) => {
  const data = {
    labels: ['Total Expenses'],
    datasets: [
      {
        data: [totalExpenses],
        backgroundColor: ['#3182CE'],
      },
    ],
  };

  return (
    <Box w="400px" h="400px">
      <Doughnut data={data} />
    </Box>
  );
};

export default ExpensesChart;

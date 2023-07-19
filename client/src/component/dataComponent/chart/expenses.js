import React, { useState, useEffect, useContext } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { Pie } from 'react-chartjs-2';
import { instance } from '@/modules/axios';
import { Box, Text, Flex } from '@chakra-ui/react';
import { formatter } from '@/modules/formatter';
import { DataContext } from '@/context/AllDataContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesChart = () => {
  const { totalExpenses } = useContext(DataContext);
  const { totalRevenue } = useContext(DataContext);

  const profit = totalRevenue - totalExpenses;

  const data = {
    labels: ['Profit', 'Total Revenue', 'Total Expenses'],
    datasets: [
      {
        data: [profit, totalRevenue, totalExpenses],
        backgroundColor: ['#4318FF', '#6AD2FF', '#EFF4FB'],
        chart: {
          width: '50px',
        },
        states: {
          hover: {
            filter: {
              type: 'none',
            },
          },
        },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        hover: { mode: null },
        plotOptions: {
          donut: {
            expandOnClick: false,
            donut: {
              labels: {
                show: false,
              },
            },
          },
        },
        fill: {
          colors: ['#4318FF', '#6AD2FF', '#EFF4FB'],
        },
        tooltip: {
          enabled: true,
          theme: 'dark',
        },
      },
    ],
  };

  return (
    <Box>
      <Pie data={data} />
      <Flex flexDir='column' my={4}>
        <Flex justify='space-between' mb={2}>
          <Text color='gray.400'>Profit</Text>
          <Text fontWeight='bold' fontSize='xl'>
            {/* IDR {formatter.format(profit)} */}
            {profit?.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </Text>
        </Flex>

        <Flex justify='space-between' mb={2}>
          <Text color='gray.400'>Expenses</Text>
          <Text fontWeight='bold' fontSize='xl'>
            {/* IDR {formatter.format(totalExpenses)} */}
            {totalExpenses?.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </Text>
        </Flex>

        <Flex justify='space-between' mb={2}>
          <Text color='gray.400'>Revenue</Text>
          <Text fontWeight='bold' fontSize='xl'>
            {/* IDR {formatter.format(totalRevenue)} */}
            {totalRevenue?.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ExpensesChart;

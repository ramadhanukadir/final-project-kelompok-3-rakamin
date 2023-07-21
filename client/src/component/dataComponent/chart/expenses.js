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
        backgroundColor: ['#1363DF', '#47B5FF', '#DFF6FF'],
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
          colors: ['#1363DF', '#47B5FF', '#DFF6FF'],
        },
        tooltip: {
          enabled: true,
          theme: 'dark',
        },
      },
    ],
  };

  return (
    <Flex
      flexDir='column'
      boxShadow={'2px 2px 10px 1px #DDE6ED'}
      border={'1px solid #DDE6ED'}
      borderRadius={'10px'}
      p='3%'
    >
      <Box h='300px' w='300px'>
        <Pie data={data} />
      </Box>
      <Flex flexDir='column' my={2}>
        <Flex justify='space-between' mb={2}>
          <Text color='gray.400'>Profit</Text>
          <Text fontWeight='semibold' fontSize='lg'>
            {/* IDR {formatter.format(profit)} */}
            {profit?.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </Text>
        </Flex>

        <Flex justify='space-between' mb={2}>
          <Text color='gray.400'>Expenses</Text>
          <Text fontWeight='semibold' fontSize='lg'>
            {/* IDR {formatter.format(totalExpenses)} */}
            {totalExpenses?.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </Text>
        </Flex>
        <Flex justify='space-between' mb={2}>
          <Text color='gray.400'>Revenue</Text>
          <Text fontWeight='semibold' fontSize='lg'>
            {/* IDR {formatter.format(totalRevenue)} */}
            {totalRevenue?.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ExpensesChart;

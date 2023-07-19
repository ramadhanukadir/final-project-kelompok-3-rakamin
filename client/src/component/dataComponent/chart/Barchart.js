import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { instance } from '@/modules/axios/index';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,

)



const ChartComponent = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await instance.get('expense/itemsOrders');
          const data = response.data.data;
    
          const processedData = processData(data);
          setChartData(processedData);
        } catch (error) {
          console.log(error);
        }
      };
    fetchData();
  }, []);

  

  const processData = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      // Kasus jika data tidak ada atau responsenya tidak sesuai yang diharapkan
      return {
        labels: [],
        datasets: [],
      };
    }

    // Group data by month and itemId
    const groupedData = data.reduce((acc, item) => {
      const createdAt = new Date(item.createdAt);
      const month = createdAt.toLocaleString('default', { month: 'long' });
      const year = createdAt.getFullYear();
      const key = `${month} ${year}`;
      const itemId = item.items_id;

      if (!acc[key]) {
        acc[key] = {};
      }

      if (!acc[key][itemId]) {
        acc[key][itemId] = 0;
      }

      acc[key][itemId] += item.quantity;

      return acc;
    }, {});

    // Get the itemId with the highest quantity for each month
    const monthlyMaxItems = Object.keys(groupedData).map((key) => {
      const monthData = groupedData[key];
      const maxItem = Object.keys(monthData).reduce((maxItem, itemId) => {
        if (monthData[itemId] > monthData[maxItem]) {
          return itemId;
        } else {
          return maxItem;
        }
      });

      return {
        month: key,
        itemId: parseInt(maxItem),
        count: monthData[maxItem],
      };
    });

    // Sort the data by month in ascending order
    monthlyMaxItems.sort((a, b) => {
      const monthA = new Date(a.month);
      const monthB = new Date(b.month);
      return monthA - monthB;
    });

    // Prepare the chart data
    const labels = monthlyMaxItems.map((item) => item.month);
    const datasets = [
      {
        label: 'ItemId with the Highest Quantity',
        data: monthlyMaxItems.map((item) => item.count),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ];

    return {
      labels,
      datasets,
    };
  };

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Chart.js Bar Chart</h1>
      <Bar  data={chartData} />
    </div>
  );
};

export default ChartComponent;

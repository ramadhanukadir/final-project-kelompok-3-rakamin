import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

import { faker } from '@faker-js/faker';

const ChartComponent = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL);
      const data = response.data;

      const processedData = processData(data);
      setChartData(processedData);
    } catch (error) {
      console.log(error);
    }
  };

  const processData = (data) => {
    // Proses data untuk mendapatkan itemId terbanyak setiap bulannya
    // ...

    // Misalnya, kita menggunakan data statis untuk contoh
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const datasets = [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default ChartComponent;

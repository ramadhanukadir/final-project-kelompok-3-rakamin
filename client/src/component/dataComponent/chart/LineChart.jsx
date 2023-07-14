import React, {useState, useEffect} from 'react'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import { instance } from '@/modules/axios/index';

  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const MyChart = () => {

    const [orderData, setOrderData] = useState([]);

const [itemName, setItemName] = useState('');


useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('expense/itemsOrders');
        const data = response.data.data;
        console.log(data);
        setOrderData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const chartData = orderData.map((order) => ({
    x: `Order ${order.orders_id}`,
    y: order.total_price,
  }));

  const chartLabels = orderData.map((order) => `Order ${order.orders_id}`);

      

 
  
    const data = {
        labels: chartLabels,
        datasets: [
            {
                label: 'my balance',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#db86b2',
                borderColor: '#B57295',
                borderCapStyle: 'butt',
                borderDashOffset: 0.0,
                borderJoinStyle: '#B57295',
                pointBorderColor: '#B57295',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#B57295',
                pointHoverBorderColor: '#B57295',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: chartData
            },
        ],
    }
    
      const options = {
        maintainAspectRatio: true,
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    borderDash: [3, 3],
                },
                // beginAtZero: true, // this works
            },
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
    return (
    
        <Line 
        data={data}
        options={options} />
    )
  }

// const MyChart = () => (
//     <Line
//         data={data}
//         options={options}
//     />
// )



export default MyChart;
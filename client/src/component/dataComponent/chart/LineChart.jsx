import React, { useState, useEffect, useContext } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { Text } from "@chakra-ui/react";
import { instance } from "@/modules/axios/index";
import { DataContext } from "@/context/AllDataContext";
import { formatter } from "@/modules/formatter";

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
  const getTotalPriceForLast7Days = () => {
    const currentDate = new Date();
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - 6);
  
    let totalPrice = 0;
  
    orderData.forEach((order) => {
      const createdAt = new Date(order.createdAt);
      if (createdAt >= startDate && createdAt <= currentDate) {
        totalPrice += order.total_price;
      }
    });
  
    return formatter.format(totalPrice);
  };
  
  const { orderData } = useContext(DataContext);

  const currentDate = new Date();
  const endDate = new Date();
  endDate.setHours(0, 0, 0, 0);
  endDate.setDate(currentDate.getDate() + 1); 
  endDate.setHours(endDate.getHours() + 7);
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - 6);
  startDate.setHours(0, 0, 0, 0);
  startDate.setHours(startDate.getHours() + 7); 

  const dailyData = Array(7).fill(0);

  orderData.forEach((order) => {
    const createdAt = new Date(order.createdAt);
    if (createdAt >= startDate && createdAt <= endDate) {
      const dayIndex = Math.floor((createdAt - startDate + (7 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
      const total_price = order.total_price;
      dailyData[dayIndex] += total_price;
    }
  });

  const chartData = dailyData;

  const chartLabels = Array(7)
    .fill()
    .map((_, index) => {
      const labelDate = new Date(startDate);
      labelDate.setDate(startDate.getDate() + index);
      return labelDate.toLocaleString("default", {
        month: "short",
        day: "numeric",
      });
    });

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Total Price",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#db86b2",
        borderColor: "#B57295",
        borderCapStyle: "butt",
        borderDashOffset: 0.0,
        borderJoinStyle: "#B57295",
        pointBorderColor: "#B57295",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#B57295",
        pointHoverBorderColor: "#B57295",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: chartData,
      },
    ],
  };

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
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <Text color="gray" fontSize="sm">
        My Balance
      </Text>
      <Text fontWeight="bold" fontSize="2xl">
        {getTotalPriceForLast7Days()}
      </Text>
      <Line data={data} options={options} />
    </>
  );
};

export default MyChart;

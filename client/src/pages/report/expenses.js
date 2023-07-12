import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";
import { instance } from "../../modules/axios/index";
import { Box, Text, Flex } from "@chakra-ui/react";
import Dashboard from "../dashboard";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesChart = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expenseResponse = await instance.get("expense");
        setTotalExpenses(expenseResponse.data.totalExpenses);
      } catch (error) {
        console.error("Terjadi kesalahan dalam mengambil data expense:", error);
      }

      try {
        const ordersResponse = await instance.get("orders");

        let totalRevenueSum = 0;
        if (Array.isArray(ordersResponse.data.data)) {
          ordersResponse.data.data.forEach((data) => {
            totalRevenueSum += data.totalRevenue || 0;
          });
        } else {
          console.error("Data orders tidak valid:", ordersResponse.data);
        }
        setTotalRevenue(totalRevenueSum);
      } catch (error) {
        console.error("Terjadi kesalahan dalam mengambil data orders:", error);
      }
    };
    fetchData();
  }, []);

  const profit = totalRevenue - totalExpenses; // Menghitung sisa anggaran

  const data = {
    labels: ["Profit", "Total Revenue", "Total Expenses"],
    datasets: [
      {
        data: [profit, totalRevenue, totalExpenses],
        backgroundColor: ["#4318FF", "#6AD2FF", "#EFF4FB"],
        chart: {
          width: "50px",
        },
        states: {
          hover: {
            filter: {
              type: "none",
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
          colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
        },
        tooltip: {
          enabled: true,
          theme: "dark",
        },
      },
    ],
  };

  return (
    <Box>
      <Pie data={data} />
      <Flex flexDir="column" my={4}>
    
        <Flex justify="space-between" mb={2}>
          <Text color="gray.400">Profit</Text>
          <Text fontWeight="bold" fontSize="xl">
            IDR{" "}
            {new Intl.NumberFormat("en-US", { style: "decimal" }).format(
              profit
            )}
          </Text>
        </Flex>
      
        <Flex justify="space-between" mb={2}>
          <Text color="gray.400">Expenses</Text>
          <Text fontWeight="bold" fontSize="xl">
            IDR{" "}
            {new Intl.NumberFormat("en-US", { style: "decimal" }).format(
              totalExpenses
            )}
          </Text>
        </Flex>

        <Flex justify="space-between" mb={2}>
          <Text color="gray.400">Revenue</Text>
          <Text fontWeight="bold" fontSize="xl">
            IDR{" "}
            {new Intl.NumberFormat("en-US", { style: "decimal" }).format(
              totalRevenue
            )}
          </Text>
        </Flex>

      </Flex>
      


    
    </Box>
  );
};

export default ExpensesChart;

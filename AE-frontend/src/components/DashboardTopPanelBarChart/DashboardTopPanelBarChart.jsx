import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";


// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const DashboardTopPanelBarChart = () => {

    
    const data = {
    labels: ["Category A", "Category B", "Category C"], // main categories
    datasets: [
      {
        label: "Sub 1",
        data: [10, 20, 30],
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
      {
        label: "Sub 2",
        data: [15, 25, 10],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
      {
        label: "Sub 3",
        data: [5, 10, 15],
        backgroundColor: "rgba(75, 192, 192, 0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Grouped Bar Chart (Sub-bars per Category)",
      },
    },
    scales: {
      x: {
        stacked: false, // grouped instead of stacked
      },
      y: {
        beginAtZero: true,
      },
    },
  };


    return (
        <>
            <h3>chart here</h3>
            <Bar data={data} options={options} />

        </>
    )
}
export default DashboardTopPanelBarChart;
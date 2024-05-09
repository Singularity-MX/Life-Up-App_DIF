import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // Etiquetas como cadenas de texto
  datasets: [
    {
      label: 'Example Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ]
};

const options = {
  scales: {
    xAxes: [
      {
        type: 'category' // Especifica que el eje x debe usar una escala de tipo "category"
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};

const MyLineChart = () => (
  <div>
    <h2>Line Chart Example</h2>
    <Line data={data} options={options} />
  </div>
);

export default MyLineChart;

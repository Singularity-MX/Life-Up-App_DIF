import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './line.css';

const LineChartComponent = ({ data, titulo }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Referencia al objeto de gráfico

  useEffect(() => {
    if (!data || data.length === 0) return;

    const ctx = chartRef.current.getContext('2d');

    const labels = data.map(item => item.Fecha); // Cambiar 'fecha' por 'Fecha'
    const consultasData = data.map(item => item.NumConsultas); // Cambiar 'biomasa' por 'NumConsultas'

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Consultas',
          data: consultasData,
          borderColor: '#4175F2',
          borderWidth: 2,
          fill: false,
        },
      ],
    };

    const options = {
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Fecha', // Agregar título para el eje x
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Número de consultas', // Agregar título para el eje y
          },
        },
      },
    };

    // Destruir el gráfico existente antes de crear uno nuevo
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Crear el nuevo gráfico
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: options,
    });

    // Retornar una función de limpieza para destruir el gráfico al desmontar
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="containerGraphicLine">
      <p>{titulo}</p>
      <canvas ref={chartRef} className="grafico" />
    </div>
  );
};

export default LineChartComponent;

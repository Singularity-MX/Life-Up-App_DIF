import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

import './bar.css'

const BarChartComponent = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Referencia al objeto de gráfico

  useEffect(() => {
    if (!data || data.length === 0) return;

    const ctx = chartRef.current.getContext('2d');

    const labels = data.map(item => item.Nombre);
    const asistentesData = data.map(item => item.TotalAsistentes || 0); // Manejar valores nulos

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Total de Asistentes',
          data: asistentesData,
          backgroundColor: '#FF5733', // Color de las barras
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    // Destruir el gráfico existente antes de crear uno nuevo
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Crear el nuevo gráfico de barras
    chartInstance.current = new Chart(ctx, {
      type: 'bar', // Tipo de gráfico de barras
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
      <p>Asistencia a talleres</p>
      <canvas ref={chartRef} className="grafico" />
    </div>
  );
};

export default BarChartComponent;

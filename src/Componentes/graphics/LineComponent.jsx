import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './line.css';

const LineChartComponent = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Referencia al objeto de gráfico

  useEffect(() => {
    if (!data || data.length === 0) return;

    const ctx = chartRef.current.getContext('2d');

    const labels = data.map(item => item.fecha);
    const biomasaData = data.map(item => item.biomasa);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Biomasa',
          data: biomasaData,
          borderColor: '#4175F2',
          borderWidth: 2,
          fill: false,
        },
      ],
    };

    const options = {
      scales: {
        x: {
          display: false, // Oculta la etiqueta del eje x
        },
        y: {
          beginAtZero: true,
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
        <canvas ref={chartRef} className="grafico" />
      </div>
    
  );
};

export default LineChartComponent;

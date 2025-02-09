import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface HumidityChartProps {
  data: number[];
}

const HumidityChart: React.FC<HumidityChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((_, index) => index),
    datasets: [
      {
        label: 'Humidity',
        data: data, 
        borderColor: 'rgb(229, 232, 67)', 
        backgroundColor: 'rgba(226, 234, 241, 0.96)', 
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF',
          font: {
            size: 12,
            weight: 700,
          },
        },
      },
      title: {
        display: true,
        text: 'Humidity Over Time',
        color: '#FFFFFF',
        font: {
          size: 14,
          weight: 700,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time Interval',
          color: '#FFFFFF',
          font: {
            size: 12,
            weight: 700,
          },
        },
        ticks: {
          color: '#FFFFFF',
          font: {
            size: 12,
            weight: 700,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Humidity (%)',
          color: '#FFFFFF',
          font: {
            size: 12,
            weight: 700,
          },
        },
        ticks: {
          color: '#FFFFFF',
          font: {
            size: 12,
            weight: 700,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}> 
      <Line data={chartData} options={options} />
    </div>
  );
};

export default HumidityChart;
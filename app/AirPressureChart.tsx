import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LineControllerChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface WindSpeedChartProps {
  data: number[];
}

const WindSpeedChart: React.FC<WindSpeedChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((_, index) => index), 
    datasets: [
      {
        label: 'Wind Speed',
        data: data, 
        borderColor: 'rgba(255, 165, 0, 1)', 
        backgroundColor: 'rgba(238, 234, 232, 0.94)', 
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
        text: 'Wind Speed Over Time',
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
          text: 'Wind Speed (km/h)',
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
    <div style={{ height: '300px' }}> 
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WindSpeedChart;
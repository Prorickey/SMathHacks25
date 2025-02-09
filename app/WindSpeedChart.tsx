import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LineControllerChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface WindSpeedChartProps {
  data: number[];
}

const WindSpeedChart: React.FC<WindSpeedChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((_, index) => index), // X-axis labels as constant intervals
    datasets: [
      {
        label: 'Wind Speed',
        data: data, // Y-axis data values
        borderColor: 'rgb(99, 177, 241)', // Orange border color
        backgroundColor: 'rgba(250, 245, 245, 0.96)', // Light orange background color
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
    <div style={{ height: '300px', width: '400px' }}> {/* Adjust the height as needed */}
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WindSpeedChart;


import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface UltravioletChartProps {
  data: number[];
}

const UltravioletChart: React.FC<UltravioletChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((_, index) => index), // X-axis labels as constant intervals
    datasets: [
      {
        label: 'Ultraviolet Data',
        data: data, // Y-axis data values
        borderColor: 'rgb(99, 177, 241)', // Blue border color
        backgroundColor: 'rgba(99, 177, 241, 0.2)', // Light blue background color
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
        text: 'Ultraviolet Data Over Time',
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
          text: 'Ultraviolet Intensity',
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
    <div style={{ height: '300px', width: '100%' }}> {/* Adjust the height and width as needed */}
      <Line data={chartData} options={options} />
    </div>
  );
};

export default UltravioletChart;
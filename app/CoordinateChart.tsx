import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface CoordinateChart {
  data: { longitude: number[], latitude: number[] };
}

const CoordinateChart: React.FC<CoordinateChart> = ({ data }) => {
  const chartData = {
    labels: data.longitude,
    datasets: [
      {
        label: 'Coordinate Data',
        data: data.latitude, 
        borderColor: 'rgb(255, 99, 132)', 
        backgroundColor: 'rgba(247, 235, 238, 0.99)', 
        pointradius: 16,
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
        text: 'Latitude & Longitude',
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
          text: 'Longitude (°)',
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
          text: 'Latitude (°)',
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

export default CoordinateChart;
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface VelocityChartProps {
  data: { x: number[], y: number[], z:number[] };
}


const VelocityChart: React.FC<VelocityChartProps> = ({ data }) => {
  const chartData = {
    labels: data.x.map((_, index) => index),
    datasets: [
      {
        label: 'Angular Velocity X',
        data: data.x, 
        borderColor: 'rgb(255, 99, 132)', 
        backgroundColor: 'rgba(255, 99, 132, 0.2)', 
      },
      {
        label: 'Angular Velocity Y',
        data: data.y, 
        borderColor: 'rgb(54, 162, 235)', 
        backgroundColor: 'rgba(54, 162, 235, 0.2)', 
      },
      {
        label: 'Angular Velocity Z',
        data: data.z, 
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)', 
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
        text: 'Angular Velocity (X) Over Time',
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
          text: 'Angular Velocity (m/s)',
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

export default VelocityChart;
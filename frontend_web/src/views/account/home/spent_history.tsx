import Card from 'react-bootstrap/Card';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'left' as const,
    },
    title: {
      display: false,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Register',
      data: labels.map(() => Math.random() * 100),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'CNAES',
      data: labels.map(() => Math.random() * 100),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function SpentHistory() {
  return (
    <Card className="pointer">
      <Card.Header>
        <Card.Title>Histórico de custos</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Movimentação dos últimos 5 meses.</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Line options={options} data={data} height={30}/>
      </Card.Body>
    </Card>
  );
}

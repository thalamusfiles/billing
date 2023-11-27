import { observer } from 'mobx-react-lite';
import { useAccountHomeStore } from './ctrl';
import Card from 'react-bootstrap/Card';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { DateTime } from 'luxon';

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
  datasets: [] as any[],
};

export const SpentHistory: React.FC = observer(() => {
  const ctrl = useAccountHomeStore();

  const groupByProduct = Object.entries(ctrl.invoicesbyProduct);

  data.labels = ctrl.invoicesbyProductMonths.map((date) => DateTime.fromFormat(date, 'yyyy-MM-dd').toFormat('dd/MM/yyyy'));
  data.datasets = groupByProduct.map(([key, productByMonths]) => {
    return {
      label: key,
      data: (productByMonths as any[]).map((month: any) => month.value as number),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    };
  });

  return (
    <Card className="pointer">
      <Card.Header>
        <Card.Title>Histórico de custos</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Movimentação dos últimos 5 meses.</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Line options={options} data={data} height={30} />
      </Card.Body>
    </Card>
  );
});

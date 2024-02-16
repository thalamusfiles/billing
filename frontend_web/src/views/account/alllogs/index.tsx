import { Container, Pagination, Table } from 'react-bootstrap';
import { AllLogsCtrl, AllLogsProvider, useAllLogsCtrlStore } from './ctrl';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

const ctrl = new AllLogsCtrl();
const AllLogsPage = () => {
  useEffect(() => {
    ctrl.handleClear();
    ctrl.search();
  }, []);

  return (
    <AllLogsProvider value={ctrl}>
      <Container>
        <AllLogs />
      </Container>
    </AllLogsProvider>
  );
};

const AllLogs = () => {
  return (
    <>
      <h1>Histórico de atividades</h1>
      <p>Registros de atividades dos últimos 3 meses</p>

      <LogsTable />
    </>
  );
};

const LogsTable = observer(() => {
  const ctrl = useAllLogsCtrlStore();
  return (
    <>
      <Table responsive striped>
        <thead>
          <tr>
            <th>Sistema / Atividade</th>
            <th>Parametros utilizado</th>
          </tr>
        </thead>
        <tbody>
          {ctrl?.response?.length === 0 && (
            <tr>
              <td colSpan={3}>Nenhum resultado encontrado</td>
            </tr>
          )}
          {ctrl?.response?.map((log, idx) => (
            <tr key={idx}>
              <td>{log.product}</td>
              <td>{JSON.stringify(log.params)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="mr-2" size="sm" style={{ marginBottom: 0 }}>
        <Pagination.Prev onClick={ctrl!.handlePreviewsPage} disabled={ctrl.page === 1} id="previews_page" />
        <Pagination.Item>{ctrl!.page}</Pagination.Item>
        <Pagination.Next onClick={ctrl!.handleNextPage} id="next_page" />
      </Pagination>
    </>
  );
});

export default AllLogsPage;

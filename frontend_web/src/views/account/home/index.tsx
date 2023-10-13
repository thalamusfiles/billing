import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useI18N } from '../../../commons/i18';
import { AccountHomeCtrl, AccountHomeProvider, useAccountHomeStore } from './ctrl';
import TCardTile from '../../../components/Card/card-tile';
import { ColorsDef, IconsDef } from '../../../commons/consts';
import { Table } from 'react-bootstrap';

const HomeAccountPage: React.FC = () => {
  const ctrl = new AccountHomeCtrl();

  useEffect(() => {
    ctrl.init();
  });

  return (
    <AccountHomeProvider value={ctrl}>
      <HomeAccountPageProvided />
    </AccountHomeProvider>
  );
};

const HomeAccountPageProvided: React.FC = () => {
  return (
    <Container>
      <HomeSummary />
      <br />

      <BillingByService />
    </Container>
  );
};

const HomeSummary: React.FC = observer(() => {
  const __ = useI18N();

  return (
    <Row>
      <Col md={3}>
        <TCardTile
          variant={ColorsDef.forecastVariant}
          title={<strong>{__('languages.BRL_', { value: 956.12 })}</strong>}
          subtitle={__('account.home.spend_forecast')}
        />
      </Col>
      <Col md={3}>
        <TCardTile
          variant={ColorsDef.spentVariant}
          title={<strong>{__('languages.BRL_', { value: 123.12 })}</strong>}
          subtitle={__('account.home.spent_month')}
        />
      </Col>
      <Col md={3}>
        <TCardTile
          variant={ColorsDef.spentVariant}
          title={<strong>{__('languages.BRL_', { value: 956.12 })}</strong>}
          subtitle={__('account.home.spent_last_month')}
        />
      </Col>
    </Row>
  );
});

const BillingByService: React.FC = observer(() => {
  const __ = useI18N();
  const ctrl = useAccountHomeStore();

  return (
    <>
      <h1>{__('account.home.billing.title', { name: ctrl?.me?.name })}</h1>
      <p>{__('account.home.billing.subtitle')}</p>

      <Table>
        <thead>
          <tr>
            <th>Sistema</th>
            <th>Utilizado</th>
            <th>Valor</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>+ IAM</td>
            <td>100</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>&nbsp;&nbsp;Logins</td>
            <td>100</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>+ Register</td>
            <td>150</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>&nbsp;&nbsp;Consulta empresa por documento</td>
            <td>100</td>
            <td>R$ 0,25</td>
            <td>R$ 25,00</td>
          </tr>
          <tr>
            <td>&nbsp;&nbsp;Consulta estabelecimentos por zipcode(cep)</td>
            <td>20</td>
            <td>R$ 0,25</td>
            <td>R$ 5,00</td>
          </tr>
          <tr>
            <td>&nbsp;&nbsp;Consulta informações de contatos</td>
            <td>10</td>
            <td>R$ 0,25</td>
            <td>R$ 2,50</td>
          </tr>
          <tr>
            <td>&nbsp;&nbsp;Consulta sócios</td>
            <td>20</td>
            <td>R$ 0,25</td>
            <td>R$ 5,00</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <strong>Total</strong>
            </td>
            <td></td>
            <td></td>
            <td>
              <strong>R$ 37,50</strong>
            </td>
          </tr>
        </tfoot>
      </Table>
    </>
  );
});

export default HomeAccountPage;

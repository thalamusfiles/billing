import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useI18N } from '../../../commons/i18';
import { AccountHomeCtrl, AccountHomeProvider, useAccountHomeStore } from './ctrl';
import TCardTile from '../../../components/Card/card-tile';
import { ColorsDef } from '../../../commons/consts';
import { SpentHistory } from './SpentHistory';
import { BillingByService } from './BillingByService';
import { historyPush } from '../../../commons/route';

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

      <SpentHistory />
      <br />

      <BillingByService />
    </Container>
  );
};

const HomeSummary: React.FC = observer(() => {
  const __ = useI18N();
  const ctrl = useAccountHomeStore();

  return (
    <Row>
      <Col md={3}>
        <TCardTile
          variant={ColorsDef.forecastVariant}
          title={<strong>{__('languages.BRL_', { value: ctrl.costForecast })}</strong>}
          subtitle={__('account.home.spend_forecast')}
        />
      </Col>
      <Col md={3}>
        <TCardTile
          variant={ColorsDef.spentVariant}
          title={<strong>{__('languages.BRL_', { value: ctrl.costTotal })}</strong>}
          subtitle={__('account.home.spent_month')}
        />
      </Col>
      <Col md={3}>
        <TCardTile
          variant={ColorsDef.spentVariant}
          title={<strong>{__('languages.BRL_', { value: ctrl.lastInvoiceTotal })}</strong>}
          subtitle={__('account.home.spent_last_month')}
        />
      </Col>
      <Col md={3}>
        <TCardTile onClick={() => historyPush('actions')}
          variant={ColorsDef.historyVariant}
          title={<strong>{__('account.home.showhistory')}</strong>}
          subtitle={__('account.home.showhistorydesc')}
        />
      </Col>
    </Row>
  );
});

export default HomeAccountPage;

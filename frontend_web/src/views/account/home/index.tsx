import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useI18N } from '../../../commons/i18';
import { AccountHomeCtrl, AccountHomeProvider, useAccountHomeStore } from './ctrl';
import TCardTile from '../../../components/Card/card-tile';
import { ColorsDef } from '../../../commons/consts';
import { SpentHistory } from './spent_history';
import { BillingByService } from './BillingByService';

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
          title={<strong>{__('languages.BRL_', { value: 956.12 })}</strong>}
          subtitle={__('account.home.spent_last_month')}
        />
      </Col>
    </Row>
  );
});

export default HomeAccountPage;

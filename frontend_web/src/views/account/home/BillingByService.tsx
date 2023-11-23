import { observer } from 'mobx-react-lite';
import React from 'react';
import { useI18N } from '../../../commons/i18';
import { useAccountHomeStore } from './ctrl';
import { Table } from 'react-bootstrap';

export const BillingByService: React.FC = observer(() => {
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
          {ctrl.servicesUsedInTheMonth.map((line: any) => (
            <tr key={line.product_name}>
              <td>{line.product_description}</td>
              <td>{line.product_cost}</td>
              <td>{line.ammout_use}</td>
              <td>{line.total_cost}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <strong>Total</strong>
            </td>
            <td></td>
            <td></td>
            <td>
              <strong>{ctrl.costTotal}</strong>
            </td>
          </tr>
        </tfoot>
      </Table>
    </>
  );
});

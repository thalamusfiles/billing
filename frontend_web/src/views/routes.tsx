import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { PrivateRoutes } from '../commons/route';
import TokenLoad from './public/token-load';

//Lazy Loading
const LoginPage = React.lazy(() => import('./public/login'));
const Account = React.lazy(() => import('./account'));

const routes = (
  <>
    <Route path="/public/app/login" element={<LoginPage />} index />
    <Route path="/public/app/tokenload" element={<TokenLoad />} index />

    <Route path="/account/*" element={<PrivateRoutes element={<Account />} redirect={'/public/app/login'} />} />

    <Route path="/" element={<Navigate to={'/account'} replace />} />
  </>
);

export default routes;

import { Navigate, Route, Routes } from 'react-router-dom';
import { RouteDefinitions } from '../../commons/route';
import HomeAccount from '../account/home';
import AllLogsPage from './alllogs';

/**
 * Definições das rotas.
 * Nome da propriedade é utilizado como identificador da rota
 */
export const routes: RouteDefinitions = {
  // Home
  home: { title: 'menu.home', path: '/home', component: HomeAccount },
  actions: { title: 'menu.actions', path: '/actions', component: AllLogsPage },
};

/**
 * Rotas
 */
export default function AccountRoutesRoutes() {
  //Não é porcorrida as ou realizado um foreach por questão de desempenho
  return (
    <Routes>
      {Object.values(routes).map((route, idx) => (
        <Route path={route.path.concat('/*')} element={<route.component />} key={idx} />
      ))}
      <Route path="/" element={<Navigate to={'/account/home'} replace />} />
    </Routes>
  );
}

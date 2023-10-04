import { Navigate, Route, Routes } from 'react-router-dom';
import { IconsDef } from '../../commons/consts';
import { RouteDefinition, RouteDefinitions } from '../../commons/route';
import { InModal } from '../../components/Modal';
import { ApplicationEdit, ApplicationList } from './application';
import Home from './home';

/**
 * Definições das rotas.
 * Nome da propriedade é utilizado como identificador da rota
 */
export const routes: RouteDefinitions = {
  // Home
  home: { title: 'menu.home', path: '/home', component: Home, index: true },
  // Application
  application_list: { title: 'applications.list.title', icon: IconsDef.applications, path: '/application/list', component: ApplicationList },
  application_edit: { title: 'applications.edit.title', path: '/application/edit/:uuid', component: ApplicationEdit },
  application_new: { title: 'applications.new.title', path: '/application/new', component: ApplicationEdit },
};

/**
 * Localiza a rota pelo pathname e nome da rota
 * @param location react-route.location
 */
export const findRouteByLocation = (location: any, parentMatch: any): RouteDefinition | null => {
  const pathId = location.pathname.replace(parentMatch.path + '/', '').replace(/\//g, '_');

  return routes[pathId];
};

/**
 * Rotas
 */
export default function MgtRoutes() {
  return (
    <Routes>
      {Object.values(routes).map((route, idx) => (
        <Route index={route.index} path={route.path.concat('/*')} element={<route.component />} key={idx} />
      ))}
      <Route path="/" element={<Navigate to={'/mgt/home'} replace />} />
    </Routes>
  );
}

/**
 * Criar rotas para serem exibidas em modal.
 * @param props
 */
export function MgtModalRoutes(props: any) {
  //Component modal com as rotas
  const modalComponent = (
    <InModal>
      <Routes>
        {Object.values(routes).map((route, idx) => (
          <Route path={route.path.concat('/*')} element={<route.component inModal={true} {...props} />} key={idx} />
        ))}
      </Routes>
    </InModal>
  );
  // Adiciona prepende para abertura do modal
  return (
    <Routes>
      <Route path={':ignore1/modal/*'} element={modalComponent} />
      <Route path={':ignore1/:ignore2/modal/*'} element={modalComponent} />
    </Routes>
  );
}

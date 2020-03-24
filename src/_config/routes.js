import React from 'react';

const ExampleComponent = React.lazy(() => import('../_components/ExampleComponent'));
const Example = React.lazy(() => import('../_components/Example'));
const MasterRoute = React.lazy(() => import('../_components/master/route/ReactDatatable'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: '' },
  { path: '/example1', parent: 'Example', name: 'Example 1', component: ExampleComponent },
  { path: '/example2', parent: 'Example', name: 'Example 2', component: Example },
  { path: '/master_route', parent: 'Master', name: 'Master Route', component: MasterRoute },
];

export default routes;

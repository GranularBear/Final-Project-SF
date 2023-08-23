import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { AuthProvider } from './AuthContext';
import AuthorizedRoute from './Routing/AuthorizedRoute';
import UnauthorizedRoute from './Routing/UnauthorizedRoute';

import MainPage from './Routing/Pages/MainPage/MainPage';
import AuthorizationPage from './Routing/Pages/AuthorizationPage/AuthorizationPage';
import ScanPage from './Routing/Pages/ScanPage/ScanPage';

import './App.css';

const routes = [
  {path: '/', element: <MainPage />},
  {
    path: '/authorization',
    element: <UnauthorizedRoute />,
    children: [{index: true, element: <AuthorizationPage />}],
  },
  {
    path: '/search',
    element: <AuthorizedRoute />,
    children:[{index: true, element:<ScanPage/>}],
  },
];

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
         {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element}>
            {route.children &&
              route.children.map((childRoute, childIndex) => (
                <Route
                  key={childIndex}
                  path={childRoute.index ? '' : ':id'}
                  element={childRoute.element}
                />
              ))
            }
          </Route>
         ))}
        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;

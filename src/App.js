import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { AuthProvider } from './AuthContext';
import AuthorizedRoute from './Routing/AuthorizedRoute';
import UnauthorizedRoute from './Routing/UnauthorizedRoute';

import MainPage from './Routing/Pages/MainPage/MainPage';
import AuthorizationPage from './Routing/Pages/AuthorizationPage/AuthorizationPage';
import ScanPage from './Routing/Pages/ScanPage/ScanPage';

import './App.css';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' exact element={<MainPage />} />
          <Route path='/authorization' element={<UnauthorizedRoute />}>
            <Route index element={<AuthorizationPage/>}/>
          </Route>
          <Route path='/search' element={<AuthorizedRoute />}>
            <Route index element={<ScanPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;

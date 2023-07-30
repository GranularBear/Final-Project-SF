import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { AuthProvider } from './AuthContext';
import AuthorizedRoute from './Routing/AuthorizedRoute';
import UnauthorizedRoute from './Routing/UnauthorizedRoute';

import HomePage from './Routing/Pages/HomePage/HomePage';
import AuthorizationPage from './Routing/Pages/AuthorizationPage/AuthorizationPage';
import SearchPage from './Routing/Pages/SearchPage/SearchPage';

import './App.css';




function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' exact element={<HomePage />} />
          <Route path='/authorization' element={<UnauthorizedRoute />}>
            <Route index element={<AuthorizationPage/>}/>
          </Route>
          <Route path='/search' element={<AuthorizedRoute />}>
            <Route index element={<SearchPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;

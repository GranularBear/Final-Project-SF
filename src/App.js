import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css';

import { AuthProvider } from './AuthContext';

import HomePage from './Routing/HomePage/HomePage';
import AuthorizationPage from './Routing/AuthorizationPage/AuthorizationPage';
import SearchPage from './Routing/SearchPage/SearchPage';



function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' exact element={<HomePage />} />
          <Route path='/authorization' exact element={<AuthorizationPage />} />
          <Route path='/search' exact element={<SearchPage />} />
        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;

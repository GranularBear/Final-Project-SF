import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css';

import HomePage from './Routing/HomePage/HomePage';
import AuthorizationPage from './Routing/AuthorizationPage/AuthorizationPage';



function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<HomePage />} />
        <Route path='/authorization' exact element={<AuthorizationPage />} />
      </Routes>
    </Router>
  );
}

export default App;

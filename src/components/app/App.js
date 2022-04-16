import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Header from './../header/Header';
import ConfigurationPage from './../pages/configurationPage/ConfigurationPage';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/KworkFurnicom-1/" element={<ConfigurationPage />} />
      </Routes>
    </Router>
      
  );
};

export default App;
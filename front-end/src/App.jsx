import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import NavigationBar from './components/NavigationBar';

const App = () =>  {
  return (
    <Router>
      <NavigationBar />
      <AppRoutes />
    </Router>
  );
};

export default App;

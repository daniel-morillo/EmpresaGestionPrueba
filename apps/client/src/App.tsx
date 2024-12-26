import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './layout';
import { AppRouter } from './Router';

function App() {
  return (
    <Router>
    <Layout>
      <AppRouter />
    </Layout>
    </Router>
  );
}

export default App;


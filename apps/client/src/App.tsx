import { EmployeeCard } from './components/employeeCard';
import { Layout } from './layout';


function App() {

  return (
    <Layout>
    <div className="App">

      
      <EmployeeCard name='Rigoberto' email='RigobertosdelosRigobertos' departments={['Compras', 'Ventas']}/>
    </div>
    </Layout>
  );
}

export default App;

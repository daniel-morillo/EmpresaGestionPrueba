import { EmployeeCard } from './components/employeeCard';
import { Layout } from './layout';
import { useEmployee, useEmployees, useCreateEmployee, useUpdateEmployee } from 'shared/src/services';

function App() {
  const { data: employees, isLoading, error } = useEmployees();
  const {data: employee} = useEmployee({_id: '6768977cf74a3666264da353'});
  const { mutate: createEmployee} = useCreateEmployee();
  const { mutate: updateEmployee} = useUpdateEmployee();

  const handleCreateEmployee = () => {
    const newEmployee = {
      name: 'John Doe',
      email: 'Doe@example.com',
      departments: ['Ventas', 'Marketing']
    };

    createEmployee(newEmployee, {
      onSuccess: () => {
        console.log('Employee created successfully!');
      },
      onError: (error) => {
        console.error('Error creating employee:', error);
      }
    });
  };

  const handleUpdateEmployee = () => {
    const updatedEmployee = {
      _id: '676c37394082a23da500bdc6', // ID del empleado a actualizar
      input: {
        name: 'John Doe Updated',
        email: 'DoeUpdated@example.com',
        departments: ['Ventas', 'Finanzas'], // Nuevos departamentos
      },
    };

    updateEmployee(updatedEmployee, {
      onSuccess: () => {
        console.log('Employee updated successfully!');
      },
      onError: (error) => {
        console.error('Error updating employee:', error);
      },
    });
  };


  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    console.error(error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <Layout>
      <div className="App">
        {employees?.map(employee => (
          <EmployeeCard
            name={employee.name}
            email={employee.email}
            departments={['Ventas', 'Marketing']} 
          />
        ))}
        {employee && (
          <EmployeeCard
            name={employee.name}
            email={employee.email}
            departments={['Ventas', 'Marketing']} 
          />
        )}
        <button onClick={() => {handleCreateEmployee()}}>Create Employee</button>
        <button onClick={() => {handleUpdateEmployee()}}>Update Employee</button>
      </div>
    </Layout>
  );
}

export default App;

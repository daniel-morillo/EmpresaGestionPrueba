import { useState } from 'react';
import { useEmployees } from 'shared/src/services';
import { EmployeeCard } from '../components/employeeCard';
import { useNavigate } from 'react-router-dom';

const Employees = () => {
  const { data: employees, isLoading, error } = useEmployees();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredEmployees = employees?.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Encabezado y buscador */}
      <div className="flex flex-col items-center mb-8">
      <h1 className="text-3xl font-bold text-center mb-4">Employees List</h1>
        <div className="flex justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full max-w-md"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button
          className="btn btn-primary"
          onClick={() => navigate('/employees/new')}>
            Add Employee
          </button>
        </div>
      </div>
      

      {/* Lista de empleados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredEmployees && filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <EmployeeCard
            key={employee._id.toString()}
            name={employee.name}
            email={employee.email}
            departments={employee.departments.map((dept) => dept.name)}
            onView={() => navigate(`/employees/${employee._id}`)}
            onEdit={() => navigate(`/employees/${employee._id}/edit`)}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No employees found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;



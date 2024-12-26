import { useState } from 'react';
import { useDepartments } from 'shared/src/services';
import { DepartmentCard } from '../components/departmentCard';
import { useNavigate } from 'react-router-dom';

const Departments = () => {
  const { data: departments, isLoading, error } = useDepartments();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredDepartments = departments?.filter((department) =>
    department.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        <h1 className="text-3xl font-bold text-center mb-4">Departments List</h1>
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
            onClick={() => navigate('/departments/new')}>
            Add Department
          </button>
        </div>
      </div>

      {/* Lista de departamentos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredDepartments && filteredDepartments.length > 0 ? (
          filteredDepartments.map((department) => (
            <DepartmentCard
              key={department._id.toString()}
              name={department.name}
              description={department.description}
              employees={department.employees.map((emp) => emp.name)}
              onView={() => navigate(`/departments/${department._id}`)}
              onEdit={() => navigate(`/departments/${department._id}/edit`)}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No departments found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Departments;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom';
import { useEmployee } from 'shared/src/services';
import { useJerarchiesByEmployee } from 'shared/src/services';

const EmployeeDetails = () => {
  const { id } = useParams();
  const { data: employee, isLoading: employeeLoading, error: employeeError } = useEmployee({ _id: id || "" });
  const { data: hierarchies, isLoading: hierarchiesLoading, error: hierarchiesError } = useJerarchiesByEmployee(id || "");

  if (employeeLoading || hierarchiesLoading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  if (employeeError || hierarchiesError) {
    console.error(employeeError || hierarchiesError);
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-500">
        Error: {(employeeError || hierarchiesError)?.message}
      </div>
    );
  }

  if (!employee) {
    return <div className="flex justify-center items-center h-screen text-xl">Employee not found</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Employee Details</h1>
        <div className="mb-6">
          <p className="text-lg font-medium">Name: <span className="font-light">{employee.name}</span></p>
          <p className="text-lg font-medium">Email: <span className="font-light">{employee.email}</span></p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Departments</h2>
          {hierarchies?.length ? (
            <div className="space-y-4">
              {hierarchies.map((hierarchy: any) => (
                <div key={hierarchy._id} className="border rounded-lg p-4 bg-gray-100">
                  <p className="text-lg font-medium">Department: <span className="font-light">{hierarchy.department.name}</span></p>
                  {hierarchy.superior ? (
                    <p className="text-lg font-medium">Superior: <span className="font-light">{hierarchy.superior.name}</span></p>
                  ) : (
                    <p className="text-lg font-medium">Superior: <span className="font-light">None</span></p>
                  )}
                  {hierarchy.subordinates?.length ? (
                    <div className="mt-2">
                      <p className="text-lg font-medium">Subordinates:</p>
                      <ul className="list-disc ml-6">
                        {hierarchy.subordinates.map((subordinate: any) => (
                          <li key={subordinate._id}>{subordinate.name}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-lg font-medium">Subordinates: <span className="font-light">None</span></p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg font-light">No department information available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;


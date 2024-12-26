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

  // Grouping hierarchies by department
  const departmentsMap = hierarchies?.reduce((acc: any, hierarchy: any) => {
    const departmentId = hierarchy.department._id;
    if (!acc[departmentId]) {
      acc[departmentId] = {
        department: hierarchy.department,
        superior: hierarchy.superior,
        subordinates: [],
      };
    }

    //if is not the actual employee, it is considered a subordinate
    if (hierarchy.employee._id !== id) {
      acc[departmentId].subordinates.push(hierarchy.employee);
    }

    return acc;
  }, {});

  const departments = Object.values(departmentsMap);

  return (
    <div className="bg-slate-800 p-8  min-h-screen">
      <div className="bg-slate-800 shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Employee Details</h1>
        <div className="mb-6">
          <p className="text-lg font-semibold">Name: <span className="font-light">{employee.name}</span></p>
          <p className="text-lg font-semibold">Email: <span className="font-light">{employee.email}</span></p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Departments</h2>
          {departments.length ? (
            <div className="space-y-4">
              {departments.map((dept: any) => (
                <div key={dept.department._id} className="border rounded-lg p-4 bg-slate-700">
                  <p className="text-lg font-medium">Department: <span className="font-light">{dept.department.name}</span></p>
                  <p className="text-lg font-medium">Superior: <span className="font-light">{dept.superior?.name || "None"}</span></p>
                  {dept.subordinates.length ? (
                    <div className="mt-2">
                      <p className="text-lg font-medium">Subordinates:</p>
                      <ul className="list-disc ml-6">
                        {dept.subordinates.map((subordinate: any) => (
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



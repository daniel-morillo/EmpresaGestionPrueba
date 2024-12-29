/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateDepartment,
  useDepartment,
  useEmployees,
  useAddEmployeeToDepartment,
  useRemoveEmployeeFromDepartment,
  useRemoveJerarchyByEmployeeAndDepartment,
} from "shared/src/services";

const EditDepartment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: department, isLoading, error } = useDepartment({ _id: id! });
  const { data: employees } = useEmployees();

  const { mutate: updateDepartment } = useUpdateDepartment();
  const { mutate: addEmployeeToDepartment } = useAddEmployeeToDepartment();
  const { mutate: removeEmployeeFromDepartment } = useRemoveEmployeeFromDepartment();
  const { mutate: removeJerarchyByEmployeeAndDepartment } = useRemoveJerarchyByEmployeeAndDepartment();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (department) {
      setName(department.name);
      setDescription(department.description);
      setSelectedEmployees(department.employees.map((e: any) => e._id));
    }
  }, [department]);

  const handleEmployeeAdd = (employeeId: string) => {
    if (selectedEmployees.includes(employeeId)) {
      //Checks if the employee is already added
      alert("This employee is already added!");
      return;
    }
    setSelectedEmployees([...selectedEmployees, employeeId]);
  };

  const handleEmployeeRemove = (employeeId: string) => {
    const confirmRemove = window.confirm(
      //We have to handle the confirmation of the user to remove the employee
      "Are you sure you want to remove this employee? All related hierarchies will also be deleted."
    );
    if (!confirmRemove) return;

    setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId));
  };

  const handleUpdate = () => {
    if (!name || !description) {
      alert("Please fill out all fields.");
      return;
    }

    const initialEmployees = department?.employees.map((e: any) => e._id);
    const addedEmployees = selectedEmployees.filter((id) => !initialEmployees?.includes(id));
    const removedEmployees = initialEmployees?.filter((id) => !selectedEmployees.includes(id));

    updateDepartment(
      {
        _id: id!,
        input: { name, description, employees: selectedEmployees },
      },
      {
        onSuccess: () => {
          //adds or remove the employees as being selected
          addedEmployees.forEach((empId) => addEmployeeToDepartment({ _id: id!, employeeId: empId }));
          removedEmployees?.forEach((empId) => {
            removeEmployeeFromDepartment({ _id: id!, employeeId: empId });
            removeJerarchyByEmployeeAndDepartment({ employeeId: empId, departmentId: id! });
          });
          alert("Department updated successfully!");
          navigate("/departments");
        },
        onError: () => {
          alert("Error updating department.");
        },
      }
    );
  };

  const filteredEmployees = employees?.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading department details.</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Department</h1>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Department Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Employees</label>
          <input
            type="text"
            className="input input-bordered w-full mb-2"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {filteredEmployees && filteredEmployees.length > 0 && (
            <ul className="list-disc list-inside bg-white border border-gray-200 rounded-md shadow-sm max-h-40 overflow-y-auto">
              {filteredEmployees.map((employee) => (
                <li
                  key={employee._id.toString()}
                  className="cursor-pointer px-2 py-1 hover:bg-gray-100"
                  onClick={() => handleEmployeeAdd(employee._id.toString())}
                >
                  {employee.name} ({employee.email})
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Selected Employees:</p>
            {selectedEmployees.length > 0 ? (
              <ul className="list-disc list-inside">
                {selectedEmployees.map((empId) => {
                  const employee = employees?.find((e) => e._id === empId);
                  return (
                    <li key={empId} className="flex items-center gap-2">
                      {employee?.name} ({employee?.email})
                      <button
                        type="button"
                        className="btn btn-error btn-xs"
                        onClick={() => handleEmployeeRemove(empId)}
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No employees selected.</p>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/departments")}
          >
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={handleUpdate}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDepartment;


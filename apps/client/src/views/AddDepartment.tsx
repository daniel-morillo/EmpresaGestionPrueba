import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateDepartment } from "shared/src/services/department/mutations";
import { useEmployees } from "shared/src/services/employee/queries";

const CreateDepartment = () => {
  const { mutate: createDepartment } = useCreateDepartment();
  const { data: employees } = useEmployees();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddEmployee = (employeeId: string) => {
    if (selectedEmployees.includes(employeeId)) {
      alert("This employee is already added!");
      return;
    }
    setSelectedEmployees([...selectedEmployees, employeeId]);
  };

  const handleRemoveEmployee = (employeeId: string) => {
    setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId));
  };

  const handleCreate = () => {
    if (!name || !description) {
      alert("Please fill out all fields.");
      return;
    }

    createDepartment(
      { name, description, employees: selectedEmployees },
      {
        onSuccess: () => {
          alert("Department created successfully!");
          navigate("/departments");
        },
        onError: () => {
          alert("Error creating department.");
        },
      }
    );
  };

  const filteredEmployees = employees?.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Create Department</h1>
      <div className="flex flex-col gap-4">
        {/* Nombre del Departamento */}
        <div>
          <label className="block text-sm font-medium mb-2">Department Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Empleados */}
        <div>
          <label className="block text-sm font-medium mb-2">Add Employees</label>
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
                  onClick={() => handleAddEmployee(employee._id.toString())}
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
                {selectedEmployees.map((employeeId) => {
                  const employee = employees?.find((e) => e._id === employeeId);
                  return (
                    <li key={employeeId} className="flex items-center gap-2">
                      {employee?.name} ({employee?.email})
                      <button
                        type="button"
                        className="btn btn-error btn-xs"
                        onClick={() => handleRemoveEmployee(employeeId)}
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

        {/* Botones de acción */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/departments")}
          >
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={handleCreate}>
            Create Department
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDepartment;

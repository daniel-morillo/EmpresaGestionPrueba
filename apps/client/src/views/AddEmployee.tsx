import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateEmployee, useAddEmployeeToDepartment } from "shared/src/services";
import { useDepartments } from "shared/src/services/department/queries";

const CreateEmployee = () => {
  const { mutate: createEmployee } = useCreateEmployee();
  const { data: availableDepartments } = useDepartments();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [departments, setDepartments] = useState<string[]>([]);
  const { mutate: addEmployeeToDepartment } = useAddEmployeeToDepartment();

  const handleAddDepartment = () => {
    setDepartments([...departments, ""]);
  };

  const handleDepartmentChange = (index: number, value: string) => {
    if (departments.includes(value) && departments[index] !== value) {
      alert("This department is already selected!");
      return;
    }

    const updatedDepartments = [...departments];
    updatedDepartments[index] = value;
    setDepartments(updatedDepartments);
  };

  const handleRemoveDepartment = (index: number) => {
    const updatedDepartments = departments.filter((_, i) => i !== index);
    setDepartments(updatedDepartments);
  };

  const handleCreate = () => {
    if (!name || !email) {
      alert("Please fill out all fields.");
      return;
    }

    createEmployee(
      { name, email, departments },
      {
        onSuccess: (newEmployee) => {
          departments.forEach((deptId) => {
            addEmployeeToDepartment({ _id: deptId, employeeId: newEmployee._id.toString() });
          });

          alert("Employee created successfully!");
          navigate("/employees");
        },
        onError: () => {
          alert("Error creating employee.");
        },
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Create Employee</h1>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Departments</label>
          {departments.map((dept, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <select
                className="select select-bordered w-full"
                value={dept}
                onChange={(e) => handleDepartmentChange(index, e.target.value)}
              >
                <option value="" disabled>
                  Select department
                </option>
                {availableDepartments?.map((d) => (
                  <option key={d._id.toString()} value={d._id.toString()}>
                    {d.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-error btn-sm"
                onClick={() => handleRemoveDepartment(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleAddDepartment}
          >
            Add Department
          </button>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/employees")}
          >
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={handleCreate}>
            Create Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;

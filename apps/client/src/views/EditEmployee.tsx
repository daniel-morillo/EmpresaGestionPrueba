/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEmployee,
   useUpdateEmployee,
   useAddEmployeeToDepartment,
   useRemoveEmployeeFromDepartment, 
   useDeleteEmployee,
  useRemoveJerarchy,
useDepartments,
useJerarchiesByEmployee } from "shared/src/services";
;

const EditEmployee = () => {
  const { id } = useParams<{ id: string }>();
  const { data: employee, isLoading, error } = useEmployee({ _id: id! });
  const { mutate: updateEmployee } = useUpdateEmployee();
  const { mutate: deleteEmployee } = useDeleteEmployee();
  const { mutate: removeJerarchy } = useRemoveJerarchy();
  const { data: availableDepartments } = useDepartments();
  const { data: jerarchies } = useJerarchiesByEmployee(id!);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [departments, setDepartments] = useState<string[]>([]);
  const { mutate: addEmployeeToDepartment } = useAddEmployeeToDepartment();
  const { mutate: removeEmployeeFromDepartment } = useRemoveEmployeeFromDepartment();
  

  useEffect(() => {
    if (employee && availableDepartments) {
      setName(employee.name);
      setEmail(employee.email);

      const selectedDepartments = employee.departments
        .map((dept: any) => 
          availableDepartments.find((d) => d._id.toString() === dept._id.toString())?._id.toString()
        )
        .filter((dept): dept is string => dept !== undefined);
      setDepartments(selectedDepartments);
    }
  }, [employee, availableDepartments]);
  

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

  const handleUpdate = () => {
    if (!name || !email) {
      alert("Please fill out all fields.");
      return;
    }
  
    const initialDepartments = employee?.departments.map((dept: any) => dept._id.toString());
    const addedDepartments = departments.filter((dept) => !initialDepartments?.includes(dept));
    const removedDepartments = initialDepartments?.filter((dept) => !departments.includes(dept));
  
    updateEmployee(
      {
        _id: id!,
        input: { name, email, departments },
      },
      {
        onSuccess: () => {
          addedDepartments.forEach((deptId) => {
            addEmployeeToDepartment({ _id: deptId, employeeId: id! });
          });
          removedDepartments?.forEach((deptId) => {
            removeEmployeeFromDepartment({ _id: deptId, employeeId: id! });
          });
  
          alert("Employee updated successfully!");
          navigate("/employees");
        },
        onError: () => {
          alert("Error updating employee.");
        },
      }
    );
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;

    jerarchies?.forEach((jerarchy: any) => {
      removeJerarchy(jerarchy._id);
    });

    deleteEmployee(id!, {
      onSuccess: () => {
        alert("Employee deleted successfully!");
        navigate("/employees");
      },
      onError: () => {
        alert("Error deleting employee.");
      },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !employee) {
    console.error(error);
    return <div>Error loading employee details.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Employee</h1>
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
          <button type="button" className="btn btn-error" onClick={handleDelete}>
            Delete Employee
          </button>
          <button type="button" className="btn btn-primary" onClick={handleUpdate}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;


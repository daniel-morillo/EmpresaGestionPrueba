/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from "react";
import { useParams } from "react-router-dom";
import { useJerarchiesByDepartment } from "shared/src/services";
import { useRemoveJerarchy, useCreateJerarchy } from "shared/src/services";
import { useEmployeesByDepartment } from "shared/src/services";
import { useNavigate } from "react-router-dom"; 

const ManageHierarchies = () => {
  const { id: departmentId } = useParams();
  const { data: hierarchies, isLoading: hierarchiesLoading } = useJerarchiesByDepartment(departmentId || "");
  const { data: employees, isLoading: employeesLoading } = useEmployeesByDepartment(departmentId || "");

  const { mutate: removeJerarchy } = useRemoveJerarchy();
  const { mutate: createJerarchy } = useCreateJerarchy();

  const [superiorId, setSuperiorId] = useState("");
  const [subordinateId, setSubordinateId] = useState("");
  const navigate = useNavigate();

  const handleDelete = (hierarchyId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this hierarchy?");
    if (!confirmDelete) return;

    removeJerarchy(hierarchyId, {
      onSuccess: () => {
        alert("Hierarchy deleted successfully.");
        navigate(`/departments/${departmentId}`);
      },
      onError: () => {
        alert("Failed to delete hierarchy.");
      },
    });
  };

  const handleCreate = () => {
    if (!superiorId || !subordinateId) {
      alert("Both superior and subordinate must be selected.");
      return;
    }

    if (superiorId === subordinateId) {
      alert("Superior and subordinate cannot be the same.");
      return;
    }
    //checks if the hierarchy is going to have a circular dependency, if so, it will not be created
    const hasCircularDependency = hierarchies?.some((hierarchy: any) => {
      return (
        (hierarchy.superior?._id === subordinateId && hierarchy.employee?._id === superiorId) ||
        (hierarchy.employee?._id === subordinateId && hierarchy.superior?._id === superiorId)
      );
    });

    if (hasCircularDependency) {
      alert("Circular dependency detected. Cannot create this hierarchy.");
      return;
    }

    //checks if the subordinate already has a superior, if so, it will not be created
    const alreadyHasSuperior = hierarchies?.some((hierarchy: any) => {
      return hierarchy.employee?._id === subordinateId && hierarchy.superior;
    });

    if (alreadyHasSuperior) {
      alert("Subordinate already has a superior. Cannot assign another superior.");
      return;
    }

    if (departmentId) {
      createJerarchy(
        {
          employee: subordinateId,
          superior: superiorId,
          department: departmentId,
        },
        {
          onSuccess: () => {
            alert("Hierarchy created successfully.");
            navigate(`/departments/${departmentId}`);
          },
          onError: () => {
            alert("Failed to create hierarchy.");
          },
        }
      );
    } else {
      alert("Department ID is missing.");
    }
  };

  if (hierarchiesLoading || employeesLoading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="bg-slate-800 p-8 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Manage Hierarchies</h1>

      {/* Delete Hierarchies */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Delete Hierarchies</h2>
        {hierarchies?.length ? (
          <ul className="space-y-4">
            {hierarchies.map((hierarchy: any) => (
              <li key={hierarchy._id} className="flex justify-between p-4 border rounded-lg bg-slate-700">
                <span>
                  {hierarchy.superior?.name || "None"} → {hierarchy.employee.name}
                </span>
                <button
                  onClick={() => handleDelete(hierarchy._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg font-light">No hierarchies available.</p>
        )}
      </div>

      {/* Create Hierarchies */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Create Hierarchy</h2>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2">Superior</label>
            <select
              value={superiorId}
              onChange={(e) => setSuperiorId(e.target.value)}
              className="p-2 rounded-lg bg-slate-700 text-white"
            >
              <option value="">Select Superior</option>
              {employees?.map((employee: any) => (
                <option key={employee._id} value={employee._id}>{employee.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2">Subordinate</label>
            <select
              value={subordinateId}
              onChange={(e) => setSubordinateId(e.target.value)}
              className="p-2 rounded-lg bg-slate-700 text-white"
            >
              <option value="">Select Subordinate</option>
              {employees?.map((employee: any) => (
                <option key={employee._id} value={employee._id}>{employee.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCreate}
            className="p-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700"
          >
            Create Hierarchy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageHierarchies;



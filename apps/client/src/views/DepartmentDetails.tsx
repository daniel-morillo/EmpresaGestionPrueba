/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useParams, useNavigate } from "react-router-dom";
import { useDepartment } from "shared/src/services";
import { useJerarchiesByDepartment } from "shared/src/services";

const DepartmentDetails = () => {
  const { id } = useParams();
  const { data: department, isLoading: departmentLoading, error: departmentError } = useDepartment({ _id: id || "" });
  const { data: hierarchies, isLoading: hierarchiesLoading, error: hierarchiesError } = useJerarchiesByDepartment(id || "");
  const navigate = useNavigate();

  if (departmentLoading || hierarchiesLoading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  if (departmentError || hierarchiesError) {
    console.error(departmentError || hierarchiesError);
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-500">
        Error: {(departmentError || hierarchiesError)?.message}
      </div>
    );
  }

  if (!department) {
    return <div className="flex justify-center items-center h-screen text-xl">Department not found</div>;
  }

  const hierarchiesMap = hierarchies?.reduce((acc: any, hierarchy: any) => {
    const superiorId = hierarchy.superior?._id || "no-superior";
    if (!acc[superiorId]) {
      acc[superiorId] = {
        superior: hierarchy.superior,
        subordinates: [],
      };
    }

    acc[superiorId].subordinates.push(hierarchy.employee);

    return acc;
  }, {});

  const groups = Object.values(hierarchiesMap);

  return (
    <div className="bg-slate-800 p-8 min-h-screen">
      <div className="bg-slate-800 shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Department Details</h1>
        <div className="mb-6">
          <p className="text-lg font-semibold">Name: <span className="font-light">{department.name}</span></p>
          <p className="text-lg font-semibold">Description: <span className="font-light">{department.description || "N/A"}</span></p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Hierarchies</h2>
          {groups.length ? (
            <div className="space-y-4">
              {groups.map((group: any, index: number) => (
                <div key={group.superior?._id || `group-${index}`} className="border rounded-lg p-4 bg-slate-700">
                  <p className="text-lg font-medium">Superior: <span className="font-light">{group.superior?.name || "None"}</span></p>
                  {group.subordinates.length ? (
                    <div className="mt-2">
                      <p className="text-lg font-medium">Subordinates:</p>
                      <ul className="list-disc ml-6">
                        {group.subordinates.map((subordinate: any) => (
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
            <p className="text-lg font-light">No hierarchy information available.</p>
          )}
          <button className="btn btn-primary mt-4" onClick={() => navigate(`/departments/${id}/hierarchies`)}>
            Manage Hierarchies
            </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;

/* eslint-disable @typescript-eslint/no-explicit-any */
interface DepartmentCardProps {
    name: string;
    description: string;
    employees: any[];
    onView?: () => void;
    onEdit?: () => void;
  }
  
  export function DepartmentCard({
    name,
    description,
    employees,
    onView,
    onEdit,
  }: DepartmentCardProps) {
    const visibleEmployees = employees.slice(0, 4);
    const hasMoreEmployees = employees.length > 4;
  
    return (
      <div className="max-w-sm mx-auto bg-slate-800 shadow-lg rounded-lg overflow-hidden border border-gray-200 m-5 flex flex-col justify-between">
        {/* Header */}
        <div className="bg-blue-500 text-white text-center py-3">
          <h2 className="text-xl font-bold">{name}</h2>
        </div>
  
        {/* Content */}
        <div className="p-4 flex-grow">
          <p className="text-white mb-4">{description}</p>
          <p className="text-sm text-white font-semibold">Employees:</p>
          <ul className="list-disc list-inside">
            {visibleEmployees.map((employee, index) => (
              <li key={index} className="text-white text-sm">
                {employee}
              </li>
            ))}
            {hasMoreEmployees && (
              <li className="text-white text-sm italic">more employees...</li>
            )}
          </ul>
        </div>
  
        {/* Actions */}
        <div className="flex justify-center p-4 border-t border-gray-200">
          <button className="btn btn-primary btn-sm mx-1" onClick={onView}>
            View Department
          </button>
          <button className="btn btn-secondary btn-sm mx-1" onClick={onEdit}>
            Edit Department
          </button>
        </div>
      </div>
    );
  }
  

/* eslint-disable @typescript-eslint/no-explicit-any */
interface EmployeeCardProps {
    name: string;
    email: string;
    departments?: any[];
    onView?: () => void;
    onEdit?: () => void;
}

export function EmployeeCard({
    name,
    email,
    departments,
    onView,
    onEdit,
}: EmployeeCardProps) {
    return (
        <div className="max-w-sm mx-auto bg-base-100 shadow-lg rounded-lg overflow-hidden border border-gray-200 m-5">
            {/* Avatar Only Cause I don't have one image per employee*/}
            <div className="flex justify-center p-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-16 h-16 text-gray-400">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m8-6a4 4 0 100-8 4 4 0 000 8z"/>
                    </svg>
                </div>
            </div>

            {/* Employee Info */}
            <div className="p-4 text-center">
                <h2 className="text-xl font-bold">{name}</h2>
                <p className="text-gray-600">{email}</p>
                <div className="mt-2">
                    <p className="text-sm text-gray-500 font-semibold">Departments:</p>
                    <ul className="list-disc list-inside">
                        {departments?.map((department, index) => (
                            <li key={index} className="text-gray-700 text-sm">
                                {department}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-around p-4 border-t border-gray-200">
                <button className="btn btn-primary btn-sm mx-1" onClick={onView}>
                    View Employee
                </button>
                <button className="btn btn-secondary btn-sm mx-1" onClick={onEdit}>
                    Edit Employee
                </button>
            </div>
        </div>
    );
}

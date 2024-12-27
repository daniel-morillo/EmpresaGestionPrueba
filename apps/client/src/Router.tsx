import { Routes, Route, Navigate } from 'react-router-dom';
import Employees from './views/Employees';
import EmployeeDetails from './views/EmployeeDetails';
import EditEmployee from './views/EditEmployee';
import NewEmployee from './views/AddEmployee';
import Departments from './views/Departments';
import AddDepartment from './views/AddDepartment';
import EditDepartment from './views/EditDepartment';
import DepartmentDetails from './views/DepartmentDetails';
import ManageHierarchies from './views/ManageHierarchy';

export const AppRouter = () => {
  return (
   
      <Routes>
        <Route path="/" element={<Navigate to="/employees" />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} /> 
        <Route path="/employees/:id/edit" element={<EditEmployee />} />
        <Route path="/employees/new" element={<NewEmployee />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/new" element={<AddDepartment />} />
        <Route path="/departments/:id/edit" element={<EditDepartment/>} />
        <Route path = "/departments/:id" element={<DepartmentDetails />} />
        <Route path = "/departments/:id/hierarchies" element={<ManageHierarchies />} />
      </Routes>
    
  );
};

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Employees from './views/Employees';
import EmployeeDetails from './views/EmployeeDetails';
import EditEmployee from './views/EditEmployee';
import NewEmployee from './views/AddEmployee';
import Departments from './views/Departments';
import AddDepartment from './views/AddDepartment';

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
      </Routes>
    
  );
};

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Employees from './views/Employees';
import EmployeeDetails from './views/EmployeeDetails';
import EditEmployee from './views/EditEmployee';
import NewEmployee from './views/AddEmployee';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/employees" />} />
        <Route path="/employees" element={<Employees />} />
        {/* <Route path="/employees/:id" element={<EmployeeDetails />} /> */}
        <Route path="/employees/:id/edit" element={<EditEmployee />} />
        <Route path="/employees/new" element={<NewEmployee />} />
      </Routes>
    </Router>
  );
};

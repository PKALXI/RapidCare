import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Login from './views/login';
import PatientProfile from './views/HealthcareProfessional/PatientProfile';
import AdminDashboard from './views/Admin/AdminDashboard';
import AppointmentsList from './views/HealthcareProfessional/AppointmentList';
import AccountSettings from './views/HealthcareProfessional/Account';
import HpDashboard from './views/HealthcareProfessional/HpDashboard';
import PatientList from './views/HealthcareProfessional/PatientList';
import AdminAccount from './views/Admin/AdminAccount';
import EmployeeList from './views/Admin/EmployeeList';
import HospitalList from './views/Admin/HospitalList';

const App: React.FC = () => {
  const { isAuthenticated, isUserAdmin } = useSelector((state: RootState) => state.app);

  return (
    <Router>
      <Routes>
        {!isAuthenticated && <Route path="/" element={<Login />} />}
        
        {isAuthenticated && isUserAdmin && (
          <>
            <Route path="/home" element={<AdminDashboard />} />
            <Route path="/hospitals" element={<HospitalList />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/account" element={<AdminAccount />} />
          </>
        )}

        {isAuthenticated && !isUserAdmin && (
          <>
            <Route path="/home" element={<HpDashboard />} />
            <Route path="/patients" element={<PatientList />} />
            <Route path="/appointments" element={<AppointmentsList />} />
            <Route path="/account" element={<AccountSettings />} />
            <Route path="/patient/:patientId" element={<PatientProfile />} />
          </>
        )}

        <Route
          path="*"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

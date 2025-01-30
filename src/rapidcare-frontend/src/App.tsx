import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

import Login from './views/login';
import AdminDashboard from './views/adminDashboard';
import HpDashboard from './views/hpDashboard';
import PatientList from './views/patientList';
import AppointmentsList from './views/appointmentList';
import AccountSettings from './views/account';
import CreateProfile from './views/createProfile';

const App: React.FC = () => {
  const { isAuthenticated, isUserAdmin } = useSelector((state: RootState) => state.app);

  return (
    <Router>
      <Routes>
        {!isAuthenticated && <Route path="/" element={<Login />} />}

        {isAuthenticated && isUserAdmin && <Route path="/home" element={<AdminDashboard />} />}

        {isAuthenticated && !isUserAdmin && (
          <>
            <Route path="/home" element={<HpDashboard />} />
            <Route path="/patients" element={<PatientList />} />
            <Route path="/appointments" element={<AppointmentsList />} />
            <Route path="/account" element={<AccountSettings />} />
            <Route path="/createProfile" element={<CreateProfile />} />

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

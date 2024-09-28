import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import AdminDashboard from './AdminDashboard';
import DirectorDashboard from './DirectorDashboard';
import BursarDashboard from './BursarDashboard';

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register setUserRole={setUserRole} setUserId={setUserId} />} />
        <Route path="/login" element={<Login setUserRole={setUserRole} setUserId={setUserId} />} />
        <Route path="/student-dashboard" element={userRole === 'Student' ? <StudentDashboard userId={userId} /> : <Navigate to="/login" />} />
        <Route path="/teacher-dashboard" element={userRole === 'Teacher' ? <TeacherDashboard /> : <Navigate to="/login" />} />
        <Route path="/admin-dashboard" element={userRole === 'Admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/director-dashboard" element={userRole === 'Director' ? <DirectorDashboard /> : <Navigate to="/login" />} />
        <Route path="/bursar-dashboard" element={userRole === 'Bursar' ? <BursarDashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

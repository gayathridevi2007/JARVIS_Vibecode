import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginRoute from './routes/LoginRoute';
import LandingPage from './routes/LandingPage';
import DashboardPage from './routes/DashboardPage';
import DayPage from './routes/DayPage';
import RecruiterPage from './routes/RecruiterPage';
import AdminPage from './routes/AdminPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginRoute />} />

      <Route path="/recruiter" element={<RecruiterPage />} />
      <Route path="/admin" element={<AdminPage />} />

      <Route element={<ProtectedRoute requireAuth />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/day/:dayNumber" element={<DayPage />} />
      </Route>
    </Routes>
  );
}

export default App;
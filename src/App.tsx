import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginRoute from './routes/LoginRoute';
import LandingPage from './routes/LandingPage';
import DashboardPage from './routes/DashboardPage';
import DayPage from './routes/DayPage';

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <Routes>
        <Route element={<ProtectedRoute requireAuth={false} />}>
          <Route path="/" element={<LoginRoute />} />
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/landing" element={<LandingPage />} />
        </Route>

        <Route element={<ProtectedRoute requireAuth />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/day/:dayNumber" element={<DayPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import Mobile from './pages/Mobile';
import Auth from './pages/auth/Login';
import Dashboard from './pages/admin/Dashboard';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

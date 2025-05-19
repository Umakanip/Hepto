import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from './ProtectedRoute';
import Unauthorized from './components/Unauthorized';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDasboard';
import Layout from './components/Layout'; 
import CartPage from './components/CartPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* 👇 Protected Route with Layout & Header for logged-in users */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
          }/>
        </Route>
      </Routes>
    </Router>
  );
}

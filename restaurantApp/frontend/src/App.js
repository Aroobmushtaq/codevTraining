import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminHome from './pages/admin/AdminHome';
import CustomerHome from './pages/customer/CutomerHome';
import Toast from './components/Toast';
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from './components/AdminLayout';
import Layout from './components/Layout';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<AdminLayout />}>
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminHome />
              </ProtectedRoute>
            }
          />
          </Route>
          <Route element={<Layout />}>
          <Route
            path="/customer"
            element={
              <ProtectedRoute role="customer">
                <CustomerHome />
              </ProtectedRoute>
            }
          />
          </Route>
        </Routes>
      </Router>
      <Toast.Container />
    </>
  );
}

export default App;

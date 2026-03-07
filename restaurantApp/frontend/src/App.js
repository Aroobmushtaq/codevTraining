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
import Menu from './pages/admin/Menu';
import Orders from './pages/admin/Orders';
import Reservations from './pages/admin/Reservations';
import Review from './pages/admin/Review';
import { MenuProvider } from './pages/admin/contex/MenuContext';
import Dashboard from './pages/admin/Dashboard';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
  element={
    <MenuProvider>
      <AdminLayout />
    </MenuProvider>
  }
>
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/menu"
            element={
              <ProtectedRoute role="admin">
                <Menu />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute role="admin">
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reservations"
            element={
              <ProtectedRoute role="admin">
                <Reservations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute role="admin">
                <Review />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <Dashboard />
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

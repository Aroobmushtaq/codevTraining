import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminHome from './pages/admin/AdminHome';
import CustomerHome from './pages/customer/CustomerHome';
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
import CustomerMenu from './pages/customer/CustomerMenu';
import CustomerReservations from './pages/customer/CustomerReservations';
import CustomerOrders from './pages/customer/CustomerOrders';
import CustomerReviews from './pages/customer/CustomerReviews';
import CustomerCard from './pages/customer/CustomerCard';
import { CartProvider } from './pages/customer/context/CartContext';
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
          <Route element={
            <CartProvider>
              <Layout />
            </CartProvider>
          }>
            <Route
              path="/customer"
              element={
                <ProtectedRoute role="customer">
                  <CustomerHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/menu"
              element={
                <ProtectedRoute role="customer">
                  <CustomerMenu />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/cart"
              element={
                <ProtectedRoute role="customer">
                  <CustomerCard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/reservations"
              element={
                <ProtectedRoute role="customer">
                  <CustomerReservations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/orders"
              element={
                <ProtectedRoute role="customer">
                  <CustomerOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/reviews"
              element={
                <ProtectedRoute role="customer">
                  <CustomerReviews />
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

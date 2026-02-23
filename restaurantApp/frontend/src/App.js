import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminHome from './pages/admin/AdminHome';
import CustomerHome from './pages/customer/CutomerHome';
import Toast from './components/Toast';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/customer" element={<CustomerHome />} />
        </Routes>
      </Router>
      <Toast.Container />
    </>
  );
}

export default App;

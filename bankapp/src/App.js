import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import Transactions from './pages/transactions/Transactions';
import Account from './pages/account/Account';
import MainLayout from './components/MainLayout';
import CreateAccount from './components/CreateAccount';
import ViewAccount from './components/ViewAccount';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      {/* Toast notifications container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}   // closes after 3s
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<MainLayout><Home /></MainLayout>} />
        <Route path='/transactions' element={<MainLayout><Transactions /></MainLayout>} />
        <Route path='/account' element={<MainLayout><Account /></MainLayout>} />
        <Route path='/createAccount' element={<MainLayout><CreateAccount /></MainLayout>} />
        <Route path='/viewAccount' element={<MainLayout><ViewAccount /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

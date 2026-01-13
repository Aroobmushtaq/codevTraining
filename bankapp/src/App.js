import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import Transactions from './pages/transactions/Transactions';
import Account from './pages/account/Account';
import MainLayout from './components/MainLayout';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/' element={<MainLayout><Home/></MainLayout>}/>
          <Route path='/transactions' element={<MainLayout><Transactions/></MainLayout>}/>
          <Route path='/account' element={<MainLayout><Account/></MainLayout>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

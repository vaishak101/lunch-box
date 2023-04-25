import Home from './pages/home/Home'
import Signup from './pages/user/UserSignUp';
import Login from './pages/user/UserLogin';
import About from './pages/about/About'
import Contact from './pages/contact/Contact';
import User from './pages/user/User';
import { Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/admin/AdminLogin';
import Admin from './pages/admin/Admin';
import './App.css';
import ForgotPassword from './pages/user/ForgotPassword';
import ResetPassword from './pages/user/ResetPassword';
import AdminForgotPassword from './pages/admin/AdminForgotPassword';
import AdminResetPassword from './pages/admin/AdminResetPassword';
import PageNotFound from './pages/PageNotFound';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/about' element={< About />}></Route>
        <Route exact path='/contact' element={< Contact />}></Route>
        <Route exact path='/login' element={< Login />}></Route>
        <Route exact path='/signup' element={< Signup />}></Route>
        <Route exact path='/user' element={< User />}></Route>
        <Route exact path='/admin-login' element={< AdminLogin />}></Route>
        <Route exact path='/admin' element={< Admin />}></Route>
        <Route exact path='/forgot-pw' element={< ForgotPassword />}></Route>
        <Route exact path='/reset-pw' element={< ResetPassword />}></Route>
        <Route exact path='/admin-forgot-pw' element={< AdminForgotPassword />}></Route>
        <Route exact path='/admin-reset-pw' element={< AdminResetPassword />}></Route>
      </Routes>
    </div>
  );
}

export default App;

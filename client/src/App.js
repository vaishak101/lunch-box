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


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/about' element={< About />}></Route>
        <Route exact path='/contact' element={< Contact />}></Route>
        <Route exact path='/login' element={< Login />}></Route>
        <Route exact path='/signup' element={< Signup />}></Route>
        <Route exact path='/user' element={< User />}></Route>
        <Route exact path='/admin-login' element={< AdminLogin />}></Route>
        <Route exact path='/admin' element={< Admin />}></Route>
      </Routes>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthService from "./../../services/auth-service";
import axios from "axios";
import './User.css'

import MenuTab from './../../components/user/MenuTab'
import OrderTab from './../../components/user/OrderTab'
import ProfileTab from './../../components/user/ProfileTab'


function User() {
  const navigate = useNavigate()
  const currentUser = AuthService.getCurrentUser();
  const [activeTab, setActiveTab] = useState("menu");
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      return navigate("/login")
    }
    const menu = 'http://127.0.0.1:3000/api/lunchbox/v1/menu';
    const order = 'http://127.0.0.1:3000/api/lunchbox/v1/orders/user'
    axios.get(menu, { headers: { "Authorization": `Bearer ${currentUser.token}` } })
      .then(res => {
        setMenu([...res.data.menu]);
      })
    axios.post(order, { "email": currentUser.data.user.email, }, { headers: { "Authorization": `Bearer ${currentUser.token}` } })
      .then(res => {
        setOrders([...res.data.data]);
      })
  }, []);

  if (!currentUser) {
    alert("you are not logged in , Please login and try again")
    return <Navigate to={"/login"} />
  }
  console.log(currentUser.data.user.email)

  function logout() {
    AuthService.logout();
    navigate("/login")
  }


  return (

    <section className="user-dashboard">
      <div className="container">
        <header>
          <h1>Welcome, {currentUser.data.user.name}</h1>
          <button onClick={logout}>Logout</button>
        </header>
        <div className="tab-wrap">
          <ul className="nav">
            <li className={activeTab === "menu" ? "active" : ""} onClick={e => { setActiveTab('menu') }}>Menu Tab</li>
            <li className={activeTab === "order" ? "active" : ""} onClick={e => { setActiveTab('order') }}>Order Tab</li>
            <li className={activeTab === "profile" ? "active" : ""} onClick={e => { setActiveTab('profile') }}>Profile Tab</li>
          </ul>
          <div className="outlet">
            {activeTab === "menu" && <MenuTab userData={currentUser.data.user} token={currentUser.token} menu={menu} />}
            {activeTab === "order" && <OrderTab orders={orders} />}
            {activeTab === "profile" && <ProfileTab userData={currentUser.data.user} token={currentUser.token} />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default User;
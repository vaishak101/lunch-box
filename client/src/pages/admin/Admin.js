import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthService from "./../../services/auth-service";
import './Admin.css';
import axios from "axios";

import MenuTab from './../../components/admin/MenuTab'
import OrderTab from './../../components/admin/OrderTab'
import Contact from './../../components/admin/ContactTab'
import UserTab from './../../components/admin/UserTab'
import ProfileTab from './../../components/admin/ProfileTab'

function Admin() {
  const navigate = useNavigate()
  const currentUser = AuthService.getCurrentUser("admin");
  const [activeTab, setActiveTab] = useState("menu");
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    if (!currentUser) {
      return navigate("/login")
    }
    const menuUrl = 'http://127.0.0.1:3000/api/lunchbox/v1/menu/admin';
    const orderUrl = 'http://127.0.0.1:3000/api/lunchbox/v1/orders';
    const contactUrl = 'http://127.0.0.1:3000/api/lunchbox/v1/contact'
    const userUrl = 'http://127.0.0.1:3000/api/lunchbox/v1/user'

    axios.get(menuUrl, { headers: { "Authorization": `Bearer ${currentUser.token}` } })
      .then(res => {
        setMenu([...res.data.menu]);
      })
    axios.get(orderUrl, { headers: { "Authorization": `Bearer ${currentUser.token}` } })
      .then(res => {
        setOrders([...res.data.orders]);
      })
    axios.get(contactUrl, { headers: { "Authorization": `Bearer ${currentUser.token}` } })
      .then(res => {
        setMessageList([...res.data.messages]);
      })
    axios.get(userUrl, { headers: { "Authorization": `Bearer ${currentUser.token}` } })
      .then(res => {
        setUserList([...res.data.userList]);
      })
  }, []);

  if (!currentUser) {
    alert("you are not logged in , Please login and try again")
    return <Navigate to={"/admin-login"} />
  }

  function logout() {
    AuthService.logout('admin');
    navigate("/admin-login")
  }




  return (

    <section className="admin-dashboard">
      <div className="container">
        <header>
          <h1>Admin Page</h1>
          <button onClick={e => logout()}>Logout</button>
        </header>
        <div className="tab-wrap">
          <ul className="nav">
            <li className={activeTab === "menu" ? "active" : ""} onClick={e => { setActiveTab('menu') }}>Menu Tab</li>
            <li className={activeTab === "order" ? "active" : ""} onClick={e => { setActiveTab('order') }}>Order Tab</li>
            <li className={activeTab === "user" ? "active" : ""} onClick={e => { setActiveTab('user') }}>User Tab</li>
            <li className={activeTab === "contact" ? "active" : ""} onClick={e => { setActiveTab('contact') }}>Contact Tab</li>
            <li className={activeTab === "profile" ? "active" : ""} onClick={e => { setActiveTab('profile') }}>Profile Tab</li>
          </ul>
          <div className="outlet">
            {activeTab === "menu" && <MenuTab menu={menu} token={currentUser.token} />}
            {activeTab === "order" && <OrderTab orders={orders} token={currentUser.token} />}
            {activeTab === "contact" && <Contact messageList={messageList} token={currentUser.token} />}
            {activeTab === "user" && <UserTab userList={userList} token={currentUser.token} />}
            {activeTab === "profile" && <ProfileTab userData={currentUser.data.user} token={currentUser.token} />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Admin;
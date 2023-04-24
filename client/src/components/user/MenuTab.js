import { useEffect, useState } from "react";

import './MenuTab.css';
import OrderModal from "../common/OrderModal";

const MenuTab = ({ userData, token, menu }) => {

  const [user, setUser] = useState(userData)
  const [orderDetail, setOrderDetail] = useState({
    email: user.email,
    orderTitle: "",
    orderPrice: null
  })
  const [showModal, setShowModal] = useState(false)


  return (
    <div className="menu-tab">
      <h2>Order your food NOW!</h2>
      <ul className="menu-wrap">
        {menu.map(el => <li key={el._id}>
          <div className="left-wrap">
            <h2 className="title">{el.name}</h2>
            <p className="desc">{el.desc}</p>
          </div>
          <div className="right-wrap">
            <p className="price">{el.price}</p>
            <button className="order-btn" onClick={e => { setOrderDetail({ ...orderDetail, orderTitle: el.name, orderPrice: el.price }); setShowModal(true) }}>Order now!</button>
          </div>
        </li>)}
      </ul>
      {showModal && <OrderModal orderDetail={orderDetail} setShowModal={setShowModal} token={token} />}
    </div>
  );
};
export default MenuTab;
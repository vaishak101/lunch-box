import PriceAndQty from './PriceAndQty'
import { useState } from "react";
import axios from "axios";

function OrderModal({ orderDetail, setShowModal, token }) {

  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(orderDetail.orderPrice);
  console.log(orderDetail)
  function sendOrder() {
    axios.post(
      "http://127.0.0.1:3000/api/lunchbox/v1/orders",
      {
        "email": orderDetail.email,
        "orderTitle": orderDetail.orderTitle,
        "orderQty": qty,
        "orderPrice": price
      },
      {
        headers: { "Authorization": `Bearer ${token}` }
      },)
      .then(response => {
        alert("Ordered")
        return response.data;
      });
  }

  return (
    <>
      <div className="overlay"></div>
      <div className="order-modal">
        <div className="content-wrap">
          <div className="close-btn" onClick={e => setShowModal(false)}>x</div>
          <div className="title">{orderDetail.orderTitle}</div>
          <PriceAndQty initialPrice={orderDetail.orderPrice} price={price} qty={qty} setPrice={setPrice} setQty={setQty} />
          <button onClick={sendOrder}>ORDER NOW</button>
        </div>
      </div>
    </>
  )
}
export default OrderModal;
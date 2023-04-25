const OrderTab = ({ orders, token }) => {
  console.log(orders)
  return (
    <div className="order-tab">
      <h2>View All Orders</h2>
      <ul>
        {orders.map(el =>
          <li key={el._id}>
            <div className="left-wrap">
              <p>User Email: {el.email}</p>
              <p>Order Items: {el.orderTitle}</p>
            </div>
            <div className="right-wrap">
              <p>Price: {el.orderPrice}</p>
              <p>Qty: {el.orderQty}</p>
              <p>Date: {el.Date}</p>
            </div>
          </li>)}
      </ul>
    </div>
  );
};
export default OrderTab;
import moment from 'moment';

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
              <h2>Order-Detail</h2>
              <div class="order-detail">
                <ul>
                  {el.particular.map(item => <li>
                    <span>{item.item}</span> x <span>{item.qty}</span>
                  </li>)}
                </ul>
              </div>
            </div>
            <div className="right-wrap">
              <p>Price: {el.totalPrice}</p>
              <p>Qty: {el.totalQty}</p>
              <p>Date: {moment(el.orderDate).format('dd-mm-YYYY')}</p>
            </div>
          </li>)}
      </ul>
    </div>
  );
};
export default OrderTab;
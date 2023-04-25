import moment from 'moment';
import './OrderTab.css'
const OrderTab = ({ orders }) => {
  return (
    <div className="order-tab">
      <h2>Your Orders!</h2>
      <ul>
        {orders.map(el => <li key={el._id}>
          <div className="left-wrap">
            <h2>Order-Detail</h2>
            <div class="order-detail">
              <ul>
                {el.particular.map(item => <li>
                  <span>{item.item}</span> x <span>{item.qty}</span>
                </li>)}
              </ul>
            </div>
            <p className="qty">Qty - {el.totalQty}</p>
            <p className="price">Rs.{el.totalPrice}</p>
            <p className="date">Orderd On : {moment(el.orderDate).format('dd-mm-YYYY')}</p>
          </div>
        </li>)}
      </ul>
    </div>
  );
};
export default OrderTab;
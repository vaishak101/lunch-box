import moment from 'moment';
import './OrderTab.css'
const OrderTab = ({ orders }) => {
  return (
    <div className="order-tab">
      <h2>Your Orders!</h2>
      <ul>
        {orders.map(el => <li key={el._id}>
          <div className="left-wrap">
            <h2 className="title">{el.orderTitle}</h2>
            <p className="price">Rs.{el.orderPrice}</p>
            <p className="qty">Qty - {el.orderQty}</p>
            <p className="date">Orderd On : {moment(el.orderDate).format('dd-mm-YYYY')}</p>
          </div>
        </li>)}
      </ul>
    </div>
  );
};
export default OrderTab;
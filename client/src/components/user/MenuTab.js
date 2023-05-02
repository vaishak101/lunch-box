import { useState } from "react";
import FoodList from "../common/menu/FoodList";
import Cart from "../common/menu/Cart";
import Nav from "../common/menu/Nav";
import axios from "axios"
import './MenuTab.css';
const MenuTab = ({ userData, token, menu }) => {

  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);
  const [orderItems, setOrderItems] = useState([]);

  const handleClick = (item) => {
    console.log(item)
    let isPresent = false;
    cart.forEach((product) => {
      console.log(product)
      if (item._id === product._id)
        isPresent = true;
    })
    if (isPresent) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
      return;
    }


    setCart([...cart, item]);
    setOrderItems([...orderItems, item])
  }

  const handleChange = (item, d) => {
    let ind = -1;
    cart.forEach((data, index) => {
      if (data._id === item._id)
        ind = index;
    });
    const tempArr = cart;
    tempArr[ind].amount += d;


    setOrderItems([...orderItems, { ...tempArr[ind] }])

    if (tempArr[ind].amount === 0)
      tempArr[ind].amount = 1;
    setCart([...tempArr])
  }

  const finalSubmit = (price) => {

    const arrayUniqueByKey = [...new Map(orderItems.map(item =>
      [item['_id'], item])).values()];

    const finalArr = []
    let finalQty = 0
    arrayUniqueByKey.forEach(element => {
      const temp = {
        item: element.name,
        qty: element.amount
      }
      finalQty += element.amount
      finalArr.push(temp)
    });

    // console.log(userData.email)
    sendOrder(finalArr, finalQty, price)

  }

  function sendOrder(particular, totalQty, totalPrice) {
    axios.post(
      "http://127.0.0.1:3000/api/lunchbox/v1/orders",
      {
        "email": userData.email,
        "particular": particular,
        "totalQty": totalQty,
        "totalPrice": totalPrice
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
    <div className="menu-tab">
      <Nav size={cart.length} setShow={setShow} />
      <ul className="menu-wrap">
        {show ? <FoodList menu={menu} handleClick={handleClick} /> : <Cart cart={cart} setCart={setCart} handleChange={handleChange} finalSubmit={finalSubmit} />}
        {
          warning && <div className='warning'>Item is already added to your cart</div>
        }
      </ul>
    </div>
  );
};
export default MenuTab;
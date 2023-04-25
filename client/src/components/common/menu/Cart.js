import { useState, useEffect } from 'react';

const Cart = ({ cart, setCart, handleChange, finalSubmit }) => {
  const [price, setPrice] = useState(0);

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => (
      ans += item.amount * item.price
    ))
    setPrice(ans);
  }

  const handleRemove = (id) => {
    const arr = cart.filter((item) => item._id !== id);
    setCart(arr);
    // handlePrice();
  }

  useEffect(() => {
    handlePrice();
  })

  return (
    <article>
      {
        cart?.map((item) => (
          <div className="cart_box" key={item._id}>
            <h2>{item.name}</h2>
            <div>
              <button onClick={() => handleChange(item, +1)}> + </button>
              <button>{item.amount}</button>
              <button onClick={() => handleChange(item, -1)}> - </button>
            </div>
            <div>
              <span>{item.price}</span>
              <button onClick={() => handleRemove(item._id)} >Remove</button>
            </div>
          </div>
        ))}
      <div className='total'>
        <span>Total Price of your Cart</span>
        <span>Rs - {price}</span>
      </div>
      <button onClick={() => finalSubmit(price)}>Order</button>
    </article>
  )
}

export default Cart

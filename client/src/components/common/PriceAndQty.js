
const PriceAndQty = ({ initialPrice, price, qty, setPrice, setQty }) => {
  setPrice(initialPrice * qty);
  return (
    <>
      <p className="price">Rs.{price}</p>
      <div className="qty-wrap">
        <p>Qty:{qty}</p>
        <div className="btn-wrap">
          <button onClick={e => { setQty(qty + 1); }}>+</button>
          <button onClick={e => { qty > 1 && setQty(qty - 1); }}>-</button>
        </div>
      </div >
    </>
  )
}
export default PriceAndQty;
function List({ item, handleClick }) {

  const { name, desc, price } = item
  return (
    <li>
      <div className="left-wrap">
        <h2 className="title">{name}</h2>
        <p className="desc">{desc}</p>
      </div>
      <div className="right-wrap">
        <p className="price">{price}</p>
        <button className="order-btn" onClick={e => handleClick(item)}>Add to Cart</button>
      </div>
    </li>
  )
}

export default List;
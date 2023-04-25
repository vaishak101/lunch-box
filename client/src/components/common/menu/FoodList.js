import List from "./List";

function FoodList({ menu, handleClick }) {
  return (
    <>
      {
        menu.map(el => <List item={el} key={el.id} handleClick={handleClick} />)
      }
    </>
  )
}

export default FoodList;
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const MenuTab = ({ menu, token }) => {
  const navigate = useNavigate()




  function deleteMenuItem(id) {
    const result = window.confirm("Are you Sure you want to delete Item ?");

    if (result) {
      axios.delete(
        `http://127.0.0.1:3000/api/lunchbox/v1/menu/${id} `,
        {
          headers: { "Authorization": `Bearer ${token} ` }
        },)
        .then(response => {
          alert("Item Deleted");
          window.location.reload(false);
        });
    }

  }


  function editMenuItem(id) {

  }

  return (
    <div className="menu-tab admin-menu">
      <h2>Manage Menu</h2>
      <button>Add Item</button>
      <ul className="menu-wrap">
        {menu.map(el =>
          <li key={el._id}>
            <div className="left-wrap">
              <h2>Item Name : <span>{el.name}</span></h2>
              <h2>Item Desc : <span>{el.desc}</span></h2>
              <h2>Price : <span>{el.price}</span></h2>
              <h2>Category : <span>{el.category}</span></h2>
              {el.veg && <h2 style={{ color: "yellowgreen", fontWeight: 700 }}>Veg</h2>}
            </div>
            <div className="right-wrap">
              <button>Edit</button>
              <button onClick={e => deleteMenuItem(el._id)}>Delete</button>
            </div>
          </li>)}
      </ul>
    </div >
  );
};
export default MenuTab;
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import MenuEditModal from "../common/MenuEditModal";
import MenuAddModal from "../common/MenuAddModal";



const MenuTab = ({ menu, token }) => {
  const navigate = useNavigate()
  const [showEditModal, setShowEditModal] = useState(false)
  const [addModal, setAddModal] = useState(false)

  const [menuDetail, setMenuDetail] = useState({
    _id: null,
    name: null,
    desc: null,
    category: null,
    price: null,
    veg: null
  })

  function editMenu(data) {
    setMenuDetail({
      ...data
    });
    setShowEditModal(true)
  }

  function addMenu() {
    setAddModal(true)
  }

  function deleteMenuItem(id) {
    const result = window.confirm("Are you Sure you want to delete Item ?");

    if (result) {
      axios.delete(
        `https://lunch-box-lsdisrrct-vaishak101.vercel.app/api/lunchbox/v1/menu/${id} `,
        {
          headers: { "Authorization": `Bearer ${token} ` }
        },)
        .then(response => {
          alert("Item Deleted");
          window.location.reload(false);
        });
    }
  }




  return (
    <div className="menu-tab admin-menu">
      <h2>Manage Menu</h2>
      <button onClick={e => addMenu()}>Add Item</button>
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
              <button onClick={e => editMenu(
                {
                  _id: el._id,
                  name: el.name,
                  desc: el.desc,
                  category: el.category,
                  price: el.price,
                  veg: el.veg
                }
              )}>Edit</button>
              <button onClick={e => deleteMenuItem(el._id)}>Delete</button>
            </div>
          </li>)}
      </ul>
      {showEditModal && <MenuEditModal menuDetail={menuDetail} setShowEditModal={setShowEditModal} token={token} />}
      {addModal && <MenuAddModal setAddModal={setAddModal} token={token} />}
    </div >
  );
};
export default MenuTab;
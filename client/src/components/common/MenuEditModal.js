import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MenuEditModal({ menuDetail, setShowEditModal, token }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: menuDetail.name,
      desc: menuDetail.desc,
      category: menuDetail.category,
      price: menuDetail.price,
      veg: menuDetail.veg
    }
  });

  function editMenuItem(data) {
    axios.patch(
      `http://127.0.0.1:3000/api/lunchbox/v1/menu/${menuDetail._id}`,
      {
        name: data.name,
        desc: data.desc,
        category: data.category,
        price: data.price,
        veg: data.veg
      },
      {
        headers: { "Authorization": `Bearer ${token}` }
      },)
      .then(response => {
        console.log(response)
        alert("Item Updated");
        window.location.reload(false);
      });
  }

  return (
    <>
      <div className="overlay"></div>
      <div className="menu-edit-modal">
        <div className="content-wrap">
          <div className="close-btn" onClick={e => setShowEditModal(false)}>x</div>
          <form onSubmit={handleSubmit(editMenuItem)} noValidate>
            <input type="text" id="name"
              {...register("name", { required: { value: true, message: "Please enter Item Name!" } })}
            />
            <input type="text" id="desc"
              {...register("desc", { required: { value: true, message: "Please enter Item Desc!" } })}
            />
            <input type="text" id="category"
              {...register("category", { required: { value: true, message: "Please enter Item Category!" } })}
            />
            <input type="text" id="price"
              {...register("price", { required: { value: true, message: "Please enter Item Price!" } })}
            />
            <input type="text" id="veg"
              {...register("veg", { required: { value: true, message: "Please enter if Item is Veg or not!" } })}
            />
            <button type="submit">Update Item</button>
          </form>
        </div>
      </div>
    </>
  )
}
export default MenuEditModal;
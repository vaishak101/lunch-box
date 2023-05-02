import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MenuAddModal({ setAddModal, token }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  function addMenuItem(data) {
    axios.post(
      `http://127.0.0.1:3000/api/lunchbox/v1/menu`,
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
        alert("Item Added");
        window.location.reload(false);
      });
  }

  return (
    <>
      <div className="overlay"></div>
      <div className="menu-edit-modal">
        <div className="content-wrap">
          <div className="close-btn" onClick={e => setAddModal(false)}>x</div>
          <form onSubmit={handleSubmit(addMenuItem)} noValidate>
            <div className="field-wrap">
              <label htmlFor="name">Item Name</label>
              <input type="text" id="name"
                {...register("name", { required: { value: true, message: "Please enter Item Name!" } })}
              />
            </div>

            <div className="field-wrap">
              <label htmlFor="desc">Item Desc</label>
              <input type="text" id="desc"
                {...register("desc", { required: { value: true, message: "Please enter Item Desc!" } })}
              />
            </div>
            <div className="field-wrap">
              <label htmlFor="category">Item Category</label>
              <input type="text" id="category"
                {...register("category", { required: { value: true, message: "Please enter Item Category!" } })}
              />
            </div>
            <div className="field-wrap">
              <label htmlFor="price">Item Price</label>
              <input type="text" id="price"
                {...register("price", { required: { value: true, message: "Please enter Item Price!" } })}
              />
            </div>
            <div className="field-wrap">
              <label htmlFor="veg">Item Veg ?</label>
              <input type="text" id="veg"
                {...register("veg", { required: { value: true, message: "Please enter if Item is Veg or not!" } })}
              />
            </div>
            <button type="submit">Add Item</button>
          </form>
        </div>
      </div>
    </>
  )
}
export default MenuAddModal;
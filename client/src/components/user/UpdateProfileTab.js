import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "./../../services/auth-service";

const UpdateProfileTab = ({ userData, token }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: userData.name,
      phone: userData.phone,
      address: userData.address
    }
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {

    axios.patch(
      "http://127.0.0.1:3000/api/lunchbox/v1/user/updateUser",
      {
        "name": data.name,
        "phone": data.phone,
        "address": data.address
      },
      {
        headers: { 'Content-type': 'application/json', "Authorization": `Bearer ${token}` }
      },)
      .then(response => {
        console.log(response)
        alert("User Details Updated. Please Login Again");
        AuthService.logout("user");
        navigate('/login');
      });
  }

  return (
    <>
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <input type="text" id="name" autoComplete="off"
          {...register("name", { required: { value: true, message: "Please enter your Name!" } })}
        />
        <input type="text" id="phone" autoComplete="off"
          {...register("phone",
            {
              required: { value: true, message: "Please enter your Phone Number!" },
              // pattern: { value: /, message: ["Please enter a valid Phone Number!"] }
            })}
        />
        <input type="text" id="address" autoComplete="off"
          {...register("address", { required: { value: true, message: "Please enter your Address!" } })}
        />
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};
export default UpdateProfileTab;
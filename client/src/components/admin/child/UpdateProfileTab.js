import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "./../../../services/auth-service";

const UpdateProfileTab = ({ adminData, token }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: adminData.name,
      phone: adminData.phone,
    }
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios.patch(
      `http://127.0.0.1:3000/api/lunchbox/v1/admin/updateAdmin`,
      {
        "name": data.name,
        "phone": data.phone,
      },
      {
        headers: { 'Content-type': 'application/json', "Authorization": `Bearer ${token}` }
      },)
      .then(response => {
        console.log(response)
        alert("Admin Details Updated. Please Login Again");
        AuthService.logout("admin");
        navigate('/admin-login');
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
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};
export default UpdateProfileTab;
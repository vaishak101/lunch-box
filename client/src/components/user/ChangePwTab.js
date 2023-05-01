import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "./../../services/auth-service";

const ChangePwTab = ({ token }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    axios.patch(
      "https://lunch-box-lsdisrrct-vaishak101.vercel.app/api/lunchbox/v1/user/updatePassword",
      {
        "passwordCurrent": data.current_pw,
        "password": data.new_pw,
        "passwordConfirm": data.confirm_new_pw
      },
      {
        headers: { "Authorization": `Bearer ${token}` }
      },)
      .then(response => {
        alert("PW Changed");
        AuthService.logout("user");
        navigate('/login')
      });
  }

  return (
    <>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <input type="password" id="current_pw" autoComplete="off" placeholder="Current Password"
          {...register("current_pw", { required: { value: true, message: "Please enter your password!" } })}
        />
        <input type="password" id="new_pw" autoComplete="off" placeholder="New Password"
          {...register("new_pw", { required: { value: true, message: "Please enter your password!" } })}
        />
        <input type="password" id="confirm_new_pw" autoComplete="off" placeholder="Confirm New Password"
          {...register("confirm_new_pw", { required: { value: true, message: "Please enter your password!" } })}
        />
        <button type="submit">Change PW</button>
      </form>
    </>
  );
};
export default ChangePwTab;
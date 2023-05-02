import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [msg, setMsg] = useState('');

  let params = (new URL(document.location)).searchParams;
  let token = params.get("lb");

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    axios.patch(
      `https://lunch-box-lsdisrrct-vaishak101.vercel.app/api/lunchbox/v1/user/resetPassword/${token}`,
      {
        "password": data.new_pw,
        "passwordConfirm": data.confirm_new_pw
      },
      {
        headers: { "Authorization": `Bearer ${token}` }
      },)
      .then(response => {
        alert("PW Changed");
        navigate('/login')
      }).catch(err => {
        setMsg(err.response.data.message);
        alert(`${err.response.data.message} : Please Try again`);
        navigate('/forgot-pw');
      });
  }

  return (
    <>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <input type="password" id="new_pw" autoComplete="off" placeholder="New Password"
          {...register("new_pw", { required: { value: true, message: "Please enter your password!" } })}
        />
        <input type="password" id="confirm_new_pw" autoComplete="off" placeholder="Confirm New Password"
          {...register("confirm_new_pw", { required: { value: true, message: "Please enter your password!" } })}
        />
        <button type="submit">Change PW</button>
        {msg && <p>{msg}</p>}
      </form>
    </>
  );
};
export default ResetPassword;
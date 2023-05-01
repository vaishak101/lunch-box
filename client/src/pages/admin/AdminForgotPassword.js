import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import Header from '../../components/common/Header/Header';
import AuthService from "../../services/auth-service";
import { useState } from "react";
import axios from "axios";

function AdminForgotPassword() {
  const [msg, setMsg] = useState('');
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    setDisable(true)
    axios.post("https://lunch-box-lsdisrrct-vaishak101.vercel.app/api/lunchbox/v1/admin/forgotPassword", {
      "email": data.email,
    })
      .then(response => {
        alert("Mail Sent , Please Use the url from the mail you received to update the password!");
        navigate('/');
      }).catch(err => {
        setMsg(err.response.data.message);
        setDisable(false)
      }
      );
  }

  return (
    <>
      <Header />
      <section className='userlogin'>
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="field-wrap">
              <label htmlFor="email">Enter your Email Address</label>
              <input type="email" id='email' {...register("email", { required: { value: true, message: "Please enter your email!" }, pattern: { value: /\S+@\S+\.\S+/, message: ["Please enter a valid Email Address!"] } })} />
              <p className='error-msg'>{errors.email?.message}</p>
            </div>
            <button className='submit-btn' type='submit' disabled={disable}>Send Mail!</button>
            {msg && <p>{msg}</p>}
          </form>
        </div>
      </section>
    </>
  )
}

export default AdminForgotPassword;
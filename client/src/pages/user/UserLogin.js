import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from './../../components/common/Header/Header';
import './UserLogin.css';
import AuthService from "./../../services/auth-service";
import { useState } from "react";


function Login() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    AuthService.login(data, "user").then(
      () => {
        setMsg("Logged In");
        navigate('/user')
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMsg(resMessage)
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
            <div className="field-wrap">
              <label htmlFor="password">Enter your Password</label>
              <input type="password" id='password' autoComplete="off" {...register("password", { required: { value: true, message: "Please enter your password!" } })} />
              <p className='error-msg'>{errors.password?.message}</p>
            </div>
            <button className='submit-btn' type='submit'>Login!</button>
            {msg && <p>{msg}</p>}
          </form>
        </div>
      </section>
    </>
  )
}

export default Login;
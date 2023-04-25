import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
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
          <h2 className="title">Hello,</h2>
          <p className="desc">Please enter following details to login:</p>
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
            <div className="cta-wrap">
              <button className='submit-btn' type='submit'>Login!</button>
              <div className="fgt-pw">
                <Link to={'/forgot-pw'}>Forgot Password ?</Link>
              </div>
            </div>

            {msg && <p>{msg}</p>}
          </form>
        </div>
      </section>
    </>
  )
}

export default Login;
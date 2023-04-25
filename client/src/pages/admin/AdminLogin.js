import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Header from './../../components/common/Header/Header';
import './AdminLogin.css';
import AuthService from "./../../services/auth-service";
import { useState } from "react";


function AdminLogin() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data)
    AuthService.login(data, "admin").then(
      () => {
        setMsg("Logged In");
        navigate('/admin')
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
      <section className='adminlogin'>
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h1>Welcome Admin</h1>
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
                <Link to={'/admin-forgot-pw'}>Forgot Password ?</Link>
              </div>
            </div>
            {msg && <p>{msg}</p>}
          </form>
        </div>
      </section>
    </>
  )
}

export default AdminLogin;
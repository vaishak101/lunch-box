import Header from './../../components/common/Header/Header'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "./../../services/auth-service";
import { useState } from "react";
import './UserLogin.css';

function Signup() {
  const [msg, setMsg] = useState('')
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    AuthService.register(data).then(
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
        console.log(resMessage)
        setMsg(resMessage)
      }
    );
  }

  return (
    <>
      <Header />
      <section className='signup'>
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h2 className="title">Hello,</h2>
            <p className="desc">Please enter following details to Signup:</p>
            <div className="field-wrap">
              <label htmlFor="name">Enter your Name</label>
              <input
                type="text"
                id='name'
                {
                ...register("name",
                  { required: { value: true, message: "Please enter your Name!" } })
                }
              />
              <p className='error-msg'>{errors.name?.message}</p>
            </div>

            <div className="field-wrap">
              <label htmlFor="email">Enter your Email Address</label>
              <input
                type="email"
                id='email'
                {...register("email",
                  {
                    required: {
                      value: true,
                      message: "Please enter your email!"
                    },
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: ["Please enter a valid Email Address!"]
                    }
                  })
                }
              />
              <p className='error-msg'>{errors.email?.message}</p>

            </div>

            <div className="field-wrap">
              <label htmlFor="password">Enter your Password</label>
              <input
                type="password"
                id='password'
                {...register("password",
                  {
                    required: { value: true, message: "Please enter your password!" }
                  })
                }
                autoComplete='off' />
              <p className='error-msg'>{errors.password?.message}</p>

            </div>

            <div className="field-wrap">
              <label htmlFor="confirm_password">Confirm your Password</label>
              <input
                type="password"
                id='confirm_password'  {...register("confirm_password", {
                  required: true,
                  validate: (val) => {
                    if (watch('password') != val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
                autoComplete='off'
              />
              <p className='error-msg'>{errors.confirm_password?.message}</p>
            </div>

            <div className="field-wrap">
              <label htmlFor="phone">Add your Phone Number</label>
              <input
                type="text"
                id='phone'
                {...register("phone",
                  {
                    required: { value: true, message: "Please enter your Phone Number!" },
                    // pattern: { value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, message: ["Please enter a valid Phone Number!"] }
                  })}
                autoComplete='off' />
              <p className='error-msg'>{errors.phone?.message}</p>
            </div>
            <div className="field-wrap">
              <label htmlFor="address">Add your Address</label>
              <input
                type="text"
                id='address'
                {
                ...register("address",
                  {
                    required: { value: true, message: "Please enter your address!" }
                  })}
                autoComplete='off' />
              <p className='error-msg'>{errors.address?.message}</p>
            </div>

            <button className='submit-btn' type='submit'>SignUp!</button>
            {msg && <p>{msg}</p>}
          </form>
        </div>
      </section>
    </>
  )
}

export default Signup;
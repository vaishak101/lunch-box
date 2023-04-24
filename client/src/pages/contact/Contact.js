import Header from './../../components/common/Header/Header';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import './Contact.css';

function Contact() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  function sendMessage(data) {
    return axios
      .post("http://127.0.0.1:3000/api/lunchbox/v1/contact", {
        "name": data.name,
        "email": data.email,
        "message": data.message
      })
      .then(response => {
        return response.data;
      });
  }

  const onSubmit = (data) => {
    sendMessage(data).then(
      () => {
        alert("Message Sent");
        navigate('/')
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage)
      }
    );
  }

  return (
    <>
      <Header />
      <section className='contact'>
        <div className="container">
          <h2 className='title'>Contact Us</h2>
          <p className='desc'>Send us a message we will contact you!</p>
          <div className="content-wrap">
            <div className="form-wrap">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="field-wrap">
                  <label for="name">Enter your Name</label>
                  <input type="text" id='name' {...register("name", { required: { value: true, message: "Please enter your Name!" } })} />
                  <p className='error-msg'>{errors.name?.message}</p>
                </div>
                <div className="field-wrap">
                  <label for="email">Enter your Email Address</label>
                  <input type="email" id='email' {...register("email", { required: { value: true, message: "Please enter your email!" }, pattern: { value: /\S+@\S+\.\S+/, message: ["Please enter a valid Email Address!"] } })} />
                  <p className='error-msg'>{errors.email?.message}</p>
                </div>
                <div className="field-wrap">
                  <label for="message">Enter your Message</label>
                  <textarea id='message' {
                    ...register("message",
                      { required: { value: true, message: "Please enter your Name!" } })
                  } placeholder='I am coming to eat good food!' />
                  <p className='error-msg'>{errors.message?.message}</p>

                </div>
                <button className='submit-btn' type='submit'>Send Message !</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact;
import { useState } from 'react';
import Header from './../../components/common/Header/Header';
import './Contact.css';

function Contact() {

  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [emailError, setEmailerror] = useState(null);
  const [fnameError, setFnameerror] = useState(null);


  function validateEmail(enteredValue) {
    const result = /\S+@\S+\.\S+/.test(enteredValue);
    !result ? setEmailerror('Email is Invalid') : setEmailerror(null);
    setEmail(enteredValue)
  }


  async function handleCick(e) {
    e.preventDefault();
    // if (fname.length < 1) {
    //   setFnameerror('Please enter a valid name')
    // }
    const url = '/api/lunchbox/v1/contact'
    const data = {
      "name": fname,
      "email": email,
      "message": msg
    }

    const response = await fetch("http://127.0.0.1:3000/api/lunchbox/v1/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (response.status == 201) {
      setFname('')
      setEmail('')
      setMsg('')
      console.log("Message Sent!")
    } else {
      console.log(response.statusText)
    }
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
              <form action="">
                <div className="field-wrap">
                  <label for="name">Enter your Name</label>
                  <input type="text" id='name' value={fname} onChange={e => setFname(e.target.value)} placeholder='John Wick' />
                  {fnameError && <p style={{ color: 'red' }}>{fnameError}</p>}
                </div>
                <div className="field-wrap">
                  <label for="email">Enter your Email Address</label>
                  <input type="email" id='email' value={email} onChange={e => validateEmail(e.target.value)} placeholder='johnwick@babayaga.com' />
                  {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                </div>
                <div className="field-wrap">
                  <label for="message">Enter your Message</label>
                  <textarea id='message' value={msg} onChange={e => setMsg(e.target.value)} placeholder='I am coming to eat good food!' />
                </div>
                <button className='submit-btn' type='submit' onClick={e => handleCick(e)}>Send Message !</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact;
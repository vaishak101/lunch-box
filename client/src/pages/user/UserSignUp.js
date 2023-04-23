import Header from './../../components/common/Header/Header'
import { useState } from 'react'
import './UserLogin.css';

function Signup() {
  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [emailError, setEmailerror] = useState('');
  const [errorMsg, setErrorMsg] = useState('')
  const [passwordError, setPassworderror] = useState(null);
  const [fnameError, setFnameerror] = useState(null);
  const [confirmPasswordError, setconfirmPasswordError] = useState(null);
  const [phoneError, setPhoneError] = useState(null)
  const [errorAddress, setAddressError] = useState(null)

  function validateEmail(enteredValue) {
    const result = /\S+@\S+\.\S+/.test(enteredValue);
    !result ? setEmailerror('Email is Invalid') : setEmailerror(null);
    setEmail(enteredValue)
  }

  async function handleCick(e) {
    e.preventDefault();

    const data = {
      "name": fname,
      "email": email,
      "password": password,
      "passwordConfirm": confirmPassword,
      "phone": phone,
      "address": address
    }

    const response = await fetch("http://127.0.0.1:3000/api/lunchbox/v1/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const responseData = await response.json();
    console.log(responseData)
    if (response.status == 200) {
      setErrorMsg(responseData.status)
    }
    else {
      setErrorMsg(responseData.message)
    }
  }
  return (
    <>
      <Header />
      <section className='signup'>
        <div className="container">
          <form action="">
            <div className="field-wrap">
              <label for="name">Enter your Name</label>
              <input type="text" id='name' value={fname} onChange={e => setFname(e.target.value)} placeholder='' />
              {fnameError && <p style={{ color: 'red' }}>{fnameError}</p>}
            </div>
            <div className="field-wrap">
              <label for="email">Enter your Email Address</label>
              <input type="email" id='email' value={email} onChange={e => validateEmail(e.target.value)} placeholder='' />
              {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
            </div>
            <div className="field-wrap">
              <label for="password">Enter your Password</label>
              <input type="password" id='password' value={password} onChange={e => setpassword(e.target.value)} placeholder='' autoComplete='off' />
              {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
            </div>
            <div className="field-wrap">
              <label for="confirm-password">Confirm your Password</label>
              <input type="password" id='confirm-password' value={confirmPassword} onChange={e => setconfirmPassword(e.target.value)} placeholder='' autoComplete='off' />
              {confirmPasswordError && <p style={{ color: 'red' }}>{confirmPasswordError}</p>}
            </div>
            <div className="field-wrap">
              <label for="phone">Add your Phone Number</label>
              <input type="text" id='phone' value={phone} onChange={e => setPhone(e.target.value)} placeholder='' autoComplete='off' />
              {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}
            </div>
            <div className="field-wrap">
              <label for="address">Add your Address</label>
              <input type="text" id='address' value={address} onChange={e => setAddress(e.target.value)} placeholder='' autoComplete='off' />
              {errorAddress && <p style={{ color: 'red' }}>{errorAddress}</p>}
            </div>
            <button className='submit-btn' type='submit' onClick={e => handleCick(e)}>SignUp!</button>
            {<p style={{ color: ' red' }}>{errorMsg}</p>}
          </form>
        </div>
      </section>
    </>
  )
}

export default Signup;
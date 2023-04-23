import { useState } from 'react';
import Header from './../../components/common/Header/Header';
import './UserLogin.css';
function Login() {

  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [emailError, setEmailerror] = useState(null);
  const [passwordError, setPassworderror] = useState(null);
  const [userStatus, setUserStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState('')

  function validateEmail(enteredValue) {
    const result = /\S+@\S+\.\S+/.test(enteredValue);
    !result ? setEmailerror('Email is Invalid') : setEmailerror(null);
    setEmail(enteredValue)
  }


  async function handleCick(e) {
    e.preventDefault();
    // if (setEmailerror) {
    //   setPassworderror('Password should contain min 4 chars')
    //   return
    // }
    const data = {
      "email": email,
      "password": password
    }

    const response = await fetch("http://127.0.0.1:3000/api/lunchbox/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const responseData = await response.json();
    if (response.status == 200) {
      setUserStatus(true)
      console.log(responseData)
      setErrorMsg(responseData.message)
    }
    else {
      setUserStatus(false)
      setErrorMsg(responseData.message)
    }
  }

  return (
    <>
      <Header />
      <section className='userlogin'>
        <div className="container">
          <form action="">
            <div className="field-wrap">
              <label for="email">Enter your Email Address</label>
              <input type="email" id='email' value={email} onChange={e => validateEmail(e.target.value)} placeholder='johnwick@babayaga.com' />
              {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
            </div>
            <div className="field-wrap">
              <label for="password">Enter your Name</label>
              <input type="password" id='password' value={password} onChange={e => setpassword(e.target.value)} placeholder='John Wick' autoComplete='off' />
              {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
            </div>
            <button className='submit-btn' type='submit' onClick={e => handleCick(e)}>Login!</button>
            {<p style={userStatus ? { color: 'green' } : { color: ' red' }}>{errorMsg}</p>}
          </form>
        </div>
      </section>
    </>
  )
}

export default Login;
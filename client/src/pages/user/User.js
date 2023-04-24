import { Navigate, useNavigate } from "react-router-dom";
import AuthService from "./../../services/auth-service";

function About() {
  const navigate = useNavigate()

  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) {
    alert("you are not logged in , Please login and try again")
    return <Navigate to={"/login"} />
  }

  function logout() {
    AuthService.logout();
    navigate("/login")
  }
  return (
    <>
      <div className="container">
        <h1>Welcome {currentUser.data.user.name}</h1>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  )
}

export default About;
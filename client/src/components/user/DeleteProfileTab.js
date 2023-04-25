import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "./../../services/auth-service";

const DeleteProfileTab = ({ token }) => {
  const navigate = useNavigate();
  const onSubmit = () => {
    console.log("run")
    axios.delete(
      "http://127.0.0.1:3000/api/lunchbox/v1/user/deleteUser",
      {
        headers: { "Authorization": `Bearer ${token}` }
      },)
      .then(response => {
        alert("User Deleted");
        AuthService.logout();
        navigate('/')
      });
  }


  return (
    <>
      <h1>Delete Profile</h1>
      <button onClick={e => onSubmit()}>Delete</button>
    </>
  );
};
export default DeleteProfileTab;
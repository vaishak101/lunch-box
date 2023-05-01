import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "./../../services/auth-service";

const DeleteProfileTab = ({ token }) => {
  const navigate = useNavigate();
  const onSubmit = () => {
    console.log("run")
    axios.delete(
      "https://lunch-box-lsdisrrct-vaishak101.vercel.app/api/lunchbox/v1/user/deleteUser",
      {
        headers: { "Authorization": `Bearer ${token}` }
      },)
      .then(response => {
        alert("User Deleted");
        AuthService.logout("user");
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
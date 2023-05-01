import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "./../../../services/auth-service";

const DeleteProfileTab = ({ token }) => {
  const navigate = useNavigate();
  const onSubmit = () => {
    axios.delete(
      "https://lunch-box-lsdisrrct-vaishak101.vercel.app/api/lunchbox/v1/admin/deleteAdmin",
      {
        headers: { "Authorization": `Bearer ${token}` }
      },)
      .then(response => {
        console.log(response)
        alert("Admin Deleted");
        AuthService.logout("admin");
        navigate('/admin-login')
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
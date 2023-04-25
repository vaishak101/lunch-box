import ChangePwTab from "./child/ChangePwTab.js";
import UpdateProfileTab from "./child/UpdateProfileTab"
import DeleteProfileTab from "./child/DeleteProfileTab"
import { useState } from "react";
import AddNewAdmin from "./child/AddNewAdmin.js";

const ProfileTab = ({ adminData, token }) => {
  const [activeInnerTab, setActiveInnerTab] = useState("update-profile");
  return (
    <div className="profile-tab">
      <h2>View All Orders</h2>
      <ul className="nav">
        <li className={activeInnerTab === "update-profile" ? "active" : ""} onClick={e => { setActiveInnerTab('update-profile') }}>Update Profile</li>
        <li className={activeInnerTab === "change-password" ? "active" : ""} onClick={e => { setActiveInnerTab('change-password') }}>Change Password</li>
        <li className={activeInnerTab === "delete-profile" ? "active" : ""} onClick={e => { setActiveInnerTab('delete-profile') }}>Delete Profile</li>
        <li className={activeInnerTab === "admin-signup" ? "active" : ""} onClick={e => { setActiveInnerTab('admin-signup') }}>Add New Admin</li>
      </ul>
      <div className="outlet">
        {activeInnerTab === "update-profile" && <UpdateProfileTab token={token} adminData={adminData} />}
        {activeInnerTab === "change-password" && <ChangePwTab token={token} />}
        {activeInnerTab === "delete-profile" && <DeleteProfileTab token={token} />}
        {activeInnerTab === "admin-signup" && <AddNewAdmin token={token} />}
      </div>
    </div>
  );
};
export default ProfileTab;
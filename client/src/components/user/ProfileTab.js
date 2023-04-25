import ChangePwTab from "./ChangePwTab";
import UpdateProfileTab from "./UpdateProfileTab"
import DeleteProfileTab from "./DeleteProfileTab"
import { useState } from "react";
import './ProfileTab.css'

const ProfileTab = ({ userData, token }) => {
  const [activeInnerTab, setActiveInnerTab] = useState("update-profile");
  return (
    <div className="ProfileTab">
      <div className="left-wrap">
        <h1 className="title">{userData.name}</h1>
        <h1 className="title">{userData.email}</h1>
        <h1 className="title">{userData.phone}</h1>
        <h1 className="title">{userData.address}</h1>
      </div>
      <div className="inner-tab-view">
      </div>
      <ul className="nav">
        <li className={activeInnerTab === "update-profile" ? "active" : ""} onClick={e => { setActiveInnerTab('update-profile') }}>Update Profile</li>
        <li className={activeInnerTab === "change-password" ? "active" : ""} onClick={e => { setActiveInnerTab('change-password') }}>Change Password</li>
        <li className={activeInnerTab === "delete-profile" ? "active" : ""} onClick={e => { setActiveInnerTab('delete-profile') }}>Delete Profile</li>
      </ul>
      <div className="outlet">
        {activeInnerTab === "update-profile" && <UpdateProfileTab token={token} userData={userData} />}
        {activeInnerTab === "change-password" && <ChangePwTab token={token} />}
        {activeInnerTab === "delete-profile" && <DeleteProfileTab token={token} />}
      </div>
    </div>
  );
};
export default ProfileTab;
import moment from 'moment';
const UserTab = ({ userList, token }) => {

  return (
    <div className="user-tab">
      <h2>View All Users</h2>
      <ul>
        {userList.map(el =>
          <li key={el._id}>
            <div className="left-wrap">
              <p>User Name: {el.name}</p>
              <p>User Email: {el.email}</p>
              <p>User Phone: {el.Phone}</p>
              <p>User Address: {el.adddress}</p>
              <p>Date: {moment(el.dateOfReg).format('dd-mm-YYYY')}</p>
              <p style={{ color: el.active ? 'green' : 'red', fontWeight: 700 }}>Active : {el.active ? 'Yes' : 'No'}</p>
            </div>
          </li>)}
      </ul>
    </div>
  );
};
export default UserTab;


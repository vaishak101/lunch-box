import axios from "axios";

const ContactTab = ({ messageList, token }) => {

  function deleteMsg(id) {
    console.log(id)
    const result = window.confirm("Are you Sure you want to delete Item ?");
    if (result) {
      axios.delete(
        `https://lunch-box-lsdisrrct-vaishak101.vercel.app/api/lunchbox/v1/contact/${id} `,
        {
          headers: { "Authorization": `Bearer ${token} ` }
        },)
        .then(response => {
          alert("Item Deleted");
          window.location.reload(false);
        });
    }
  }

  return (
    <div className="contact-tab">
      <h2>Manage Contact Messages</h2>
      <ul>
        {messageList.map(el =>
          <li key={el._id}>
            <div className="left-wrap">
              <p>User Name: {el.name}</p>
              <p>User Email: {el.email}</p>
              <p>Message: {el.message}</p>
              <p>Date: {el.createdDate}</p>
            </div>
            <div className="right-wrap">
              <button onClick={e => deleteMsg(el._id)}>Delete Message</button>
            </div>
          </li>)}
      </ul>
    </div>
  );
};
export default ContactTab;
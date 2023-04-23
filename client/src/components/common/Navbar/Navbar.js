import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <nav className=''>
      <ul>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/about">About Us</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar;
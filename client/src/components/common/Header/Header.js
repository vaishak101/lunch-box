import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import './Header.css'

function Header() {
  return (
    <header>
      <div className="container">
        <div className="logo-wrap">
          <Link to="/"><h1>Lunch Box</h1></Link>
        </div>
        <Navbar />
      </div>
    </header>
  )
}

export default Header;
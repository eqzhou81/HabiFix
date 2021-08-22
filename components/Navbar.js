import { Link } from 'react-router-dom';
import logo from "../images/habifix_1.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img className="logo" src={logo} alt="logo-img"/>
      <h1>HabiFix</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/userinfo">Your Stats</Link>
      </div>
    </nav>
  );
};

export default Navbar;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ loggedIn }) => {
  return (
    <nav className="navbar">
      <h1>Habifix</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {loggedIn ? (
          <Link to="/userinfo">Your stats</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

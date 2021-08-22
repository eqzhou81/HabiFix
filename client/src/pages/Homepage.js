import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Homepage = ({ loggedIn }) => {
  return (
    <div className="home-lobby-err-page">
      {loggedIn ? <h1>Welcome back, Hanmin!</h1> : <h1>Welcome</h1>}
      <p>They say successful people are simply those with successful habits.</p>
      <br />
      <Link to="/userinfo">Start forming good habits now</Link>
    </div>
  );
};

export default Homepage;

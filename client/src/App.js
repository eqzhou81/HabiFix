import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import UserDashBoard from './pages/UserDashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Router>
      <div className="App">
        <div className="navbar-extended">
          <Navbar loggedIn={loggedIn} />
        </div>
        <Switch>
          <Route exact path="/">
            <Homepage loggedIn={loggedIn} />
          </Route>
          <Route path="/userinfo">
            <UserDashBoard />
          </Route>
          <Route path="/login">
            <Login setLoggedIn={setLoggedIn} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

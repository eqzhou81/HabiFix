import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import UserDashBoard from './pages/UserDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="navbar-extended">
          <Navbar />
        </div>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/userinfo">
            <UserDashBoard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

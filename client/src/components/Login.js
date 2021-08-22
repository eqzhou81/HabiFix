import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import loader from '../images/loader.gif';
const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pw }),
      })
        .then((res) => {
          setLoggedIn(true);
          history.push('/');
          setLoading(false);
        })
        .catch((err) => console.log(err.message));
    }, 2000);
  };

  const handleEmailInput = ({ target }) => {
    setEmail(target.value);
  };

  const handlePwInput = ({ target }) => {
    setPw(target.value);
  };

  return (
    <div className="sign-up-or-login">
      {loading ? (
        <div style={{ 'text-align': 'center' }}>
          <div className="loading-image">
            <img src={loader}></img>
          </div>
          <p style={{ margin: '0 auto' }}>logging you on...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleEmailInput}
            value={email}
            autoComplete="off"
            required
          ></input>
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            value={pw}
            onChange={handlePwInput}
            required
          ></input>
          <p className="login">New user?</p>
          <Link to="/signup">sign up here</Link>
          <button>Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;

const Homepage = ({ loggedIn }) => {
  return (
    <div className="home-lobby-err-page">
      {loggedIn ? <h1>Welcome back, Hanmin!</h1> : <h1>Welcome</h1>}
import { useEffect, useState, useRef } from 'react';
import spinner from '../images/loader.gif';
import VerticalBar from '../components/VerticalBar';

const UserDashBoard = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState();
  const canvasRef = useRef();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch('/api')
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }, 5000);
  }, []);

  console.log(userData);
  return (
    <div className="user-dashboard">
      {loading ? (
        <div>
          <div className="loading-image">
            <img src={spinner}></img>
          </div>
          <p>Please wait as we generate a report of your habits</p>
        </div>
      ) : (
        Object.keys(userData).length > 0 && <VerticalBar userData={userData} />
      )}
    </div>
  );
};

export default UserDashBoard;

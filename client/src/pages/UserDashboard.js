import { useEffect, useState, useRef } from 'react';
import UserReport from '../components/UserReport';
import spinner from '../images/loader.gif';
import Chart from 'chart.js/auto';
import VerticalBar from '../components/VerticalBar';
const UserDashBoard = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState();
  const [timer, setTimer] = useState(0);
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
        // <div className="habit-card-containers">
        //   {Object.keys(userData).length > 0 &&
        //     Object.keys(userData).map((habit) => (
        //       <span>
        //         <div className="habit-card">
        //           <p>
        //             <bold>{habit}</bold>
        //           </p>
        //           <p>count: {userData[habit].nCount}</p>
        //           <p>duration: {userData[habit].nDuration}</p>
        //         </div>
        //       </span>
        //     ))}
        // </div>
      )}
    </div>
  );
};

export default UserDashBoard;

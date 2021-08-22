import { useEffect, useState } from 'react';
import UserReport from '../components/UserReport';
import spinner from '../images/loader.gif';
const UserDashBoard = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch('/api')
        .then((res) => res.json())
        .then((data) => {
          setUserData(data.members);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }, 500000);
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
        userData.map((member) => (
          <p>
            name : {member.className} age: {member.age}
          </p>
        ))
        // <UserReport/>
      )}
    </div>
  );
};

export default UserDashBoard;

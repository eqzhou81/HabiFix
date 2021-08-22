import { useEffect, useState, useRef } from 'react';
import spinner from '../images/loader.gif';
import VerticalBarDailyCount from '../components/VerticalBarDailyCount';
import VerticalBarDailyTimeSpent from '../components/VerticalBarDailyTimeSpent';
import WeeklyBarGraph from '../components/WeeklyBarGraph';
import Select from 'react-select';

const UserDashBoard = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState();
  const canvasRef = useRef();
  const [displayPhone, setDisplayPone] = useState(false);
  const [displaySit, setDisplaySit] = useState(false);
  const [displayEat, setDisplayEat] = useState(false);
  const [displayDrink, setDisplayDrink] = useState(false);

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
    }, 50);
  }, []);

  let today = new Date();
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  today = today.toLocaleDateString('en-US', options);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  const opts = [
    { value: '', label: '' },
    { value: 'phone', label: 'phone usage' },
    { value: 'sit', label: 'sitting down' },
    { value: 'eat', label: 'eating junkfood' },
    { value: 'drink', label: 'drinking water' },
  ];

  const handleChange = (e) => {
    setDisplayPone(false);
    setDisplaySit(false);
    setDisplayEat(false);
    setDisplayEat(false);
    const change = e.value;
    if (change == 'phone') {
      setDisplayPone(true);
    } else if (change == 'sit') {
      setDisplaySit(true);
    } else if (change == 'eat') {
      setDisplayEat(true);
    } else if (change == 'drink') {
      setDisplayDrink(true);
    }
  };

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
        Object.keys(userData).length > 0 && (
          <div>
            <div className="header">
              <h1 className="title">Daily record for {today}</h1>
            </div>
            <div className="daily-graphs">
              <VerticalBarDailyCount userData={userData} />
              <VerticalBarDailyTimeSpent userData={userData} />
            </div>
            <div className="weekly-container">
              <h2>See your weekly activity</h2>
              <div className="weekly-graph-buttons">
                <Select width={'70%'} onChange={handleChange} options={opts} />
              </div>
              <div className="weekly-graph-bottom">
                {displayPhone && (
                  <WeeklyBarGraph short={'phone'} type={'checked your phone'} />
                )}
                {displaySit && (
                  <WeeklyBarGraph short={'sit'} type={'sat down'} />
                )}
                {displayEat && <WeeklyBarGraph short={'ate'} type={'ate'} />}
                {displayDrink && (
                  <WeeklyBarGraph short={'water'} type={'drank water'} />
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default UserDashBoard;

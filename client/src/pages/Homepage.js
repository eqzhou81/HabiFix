import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import graph from '../images/trend.png';

const Homepage = () => {
  return (
    <div className="main">
      <div className="home-lobby-err-page">
        <h1>Welcome!</h1>
        <p className="successful">Successful people are simply those with successful habits.</p>
        <p className="start"><b>Start forming good habits now!</b></p>
        <br/>
        <button className="link"><Link to="/userinfo">Start Now</Link></button>
      </div>
      <div className="about-us">
      <hr/>
        <h1>About HabiFix</h1>
        <p>Want to develop better habits? Look no further!</p>
        <div className="table">
        <table>
          <tr>
            <td>
              <div>
                <h2>Start Tracking</h2>
                <p>
                Begin tracking your habits today by clicking below. Start your study or work session and start recording your progress. Your camera will monitor your movements and watch for unhealthy habits. A few of these habits that HabiFix looks for include:
                </p>
                <br/>
                <ul>
                  <li>Using your phone.</li>
                  <li>Touching your face.</li>
                  <li>Sleeping too late.</li>
                  <li>Biting your fingernails.</li>
                  <li>Sitting in a chair for too long.</li>
                </ul>
              </div>
            </td>
            <td>
              <div>
                <h2>View Activity</h2>
                <p>
                HabiFix will track and record your habits daily. At the end of each session, it will show you the data for each of your habits. Use this information for self-improvement!
                </p>
                <img className="graph" src={graph} alt="graph-img"/>
              </div>
            </td>
            <td>
              <div>
                <h2>See Your Improvements!</h2>
                <p>
                As you use HabiFix and learn more about your daily habits, you'll begin to change your bad habits and develop healthy habits. Through consistent discipline, you'll not only improve your focus while studying, but also maintain a healthy schedule in the meanwhile.
                </p>
              </div>
            </td>
          </tr>
        </table>
        </div>
      </div>
      <footer>
        <p className="copyright">© 2021 HabiFix.</p>
        <p className="contributors">Made by Eric Zhou, Boya Zhang, Hanmin Kim, and Ryan Gao</p>
      </footer>
    </div>
  );
};

export default Homepage;

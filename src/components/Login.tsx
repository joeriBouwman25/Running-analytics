import { getStravaAuthUrl } from '../config/strava';
import './Login.css';

const Login = () => {
  const handleLogin = () => {
    window.location.href = getStravaAuthUrl();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Running Analytics</h1>
        <p>Verbind je Strava account om je hardloopdata te analyseren</p>
        <button className="strava-button" onClick={handleLogin}>
          <svg
            className="strava-logo"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
          </svg>
          Verbind met Strava
        </button>
      </div>
    </div>
  );
};

export default Login;

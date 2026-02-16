import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { athlete } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Running Analytics</h1>
        <div className="user-info">
          {athlete && (
            <>
              <img
                src={athlete.profile_medium}
                alt={`${athlete.firstname} ${athlete.lastname}`}
                className="avatar"
              />
              <span className="user-name">
                {athlete.firstname} {athlete.lastname}
              </span>
            </>
          )}
          <button className="logout-button" onClick={handleLogout}>
            Uitloggen
          </button>
        </div>
      </header>
      <main className="dashboard-main">
        <div className="welcome-card">
          <h2>Welkom{athlete ? `, ${athlete.firstname}` : ''}! 🏃‍♂️</h2>
          <p>Je bent succesvol verbonden met Strava.</p>
          <p>Hier kun je straks je hardloopstatistieken bekijken.</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

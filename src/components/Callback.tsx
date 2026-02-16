import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useExchangeTokenMutation } from '../store/api/stravaApi';
import { useAppDispatch } from '../store/hooks';
import { setCredentials } from '../store/slices/authSlice';
import './Callback.css';

const Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [exchangeToken, { isLoading, error }] = useExchangeTokenMutation();

  useEffect(() => {
    const code = searchParams.get('code');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      console.error('OAuth error:', errorParam);
      navigate('/login');
      return;
    }

    if (code) {
      exchangeToken(code)
        .unwrap()
        .then((response) => {
          dispatch(setCredentials(response));
          navigate('/');
        })
        .catch((err) => {
          console.error('Token exchange failed:', err);
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [searchParams, exchangeToken, dispatch, navigate]);

  if (error) {
    return (
      <div className="callback-container">
        <div className="callback-card error">
          <h2>Authenticatie mislukt</h2>
          <p>Er ging iets mis bij het verbinden met Strava.</p>
          <button onClick={() => navigate('/login')}>Terug naar login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="callback-container">
      <div className="callback-card">
        {isLoading ? (
          <>
            <div className="spinner"></div>
            <h2>Verbinden met Strava...</h2>
            <p>Even geduld terwijl we je account koppelen</p>
          </>
        ) : (
          <>
            <div className="spinner"></div>
            <h2>Verwerken...</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default Callback;

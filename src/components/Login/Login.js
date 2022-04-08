import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '../Api/firebase-config';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../AuthContext/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setTimeActive } = useAuthValue();
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        if (auth.currentUser.emailVerified) {
          navigate('/components/Account/Account');
          sessionStorage.setItem(
            'Auth Token',
            response._tokenResponse.refreshToken
          );
        }
        if (!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true);
              navigate('/verify-email');
            })

            .catch((err) => alert(err.message));
        } else {
          navigate('/components/Home/Home');
        }
      })
      .catch((err) => {
        if (err.code === 'auth/wrong-password') {
          toast.error('Please check the Password');
        }
        if (err.code === 'auth/user-not-found') {
          toast.error('Please check the Email');
        }
      });
  };

  return (
    <div className="center">
      <div className="auth">
        <h1>Log in</h1>
        {error && <div className="auth__error">{error}</div>}
        <form onSubmit={login} name="login_form">
          <input
            type="email"
            value={email}
            required
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            value={password}
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
        <p>
          Don't have and account?
          <Link to="/register">Create one here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

import { useState } from 'react';

import { auth } from '../Api/firebase-config';
import { useNavigate, Link } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  // sendEmailVerification,
} from 'firebase/auth';
import { useAuthValue } from '../AuthContext/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setTimeActive } = useAuthValue();

  const validatePassword = () => {
    let isValid = true;
    if (password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        isValid = false;
        setError('Passwords does not match');
      }
    }
    return isValid;
  };

  const register = (e) => {
    e.preventDefault();
    setError('');
    if (validatePassword()) {
      // Create a new user with email and password using firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          navigate('/components/Account/Account');
          sessionStorage.setItem(
            'Auth Token',
            response._tokenResponse.refreshToken
          );
          setTimeActive(true);
          navigate('/verify-email');
        })
        // .then(() => {
        //   sendEmailVerification(auth.currentUser)
        //     .then(() => {
        //       setTimeActive(true);
        //       navigate('/verify-email');
        //     })
        //     .catch((err) => alert(err.message));
        // })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email Already in Use');
          } else {
            setError(error.message);
          }
        });
    }
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="center">
      <div className="auth">
        <h1>Register</h1>
        {error && <div className="auth__error">{error}</div>}
        <form onSubmit={register} name="registration_form">
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            value={password}
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            value={confirmPassword}
            required
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">Register</button>
        </form>
        <span>
          Already have an account?
          <Link to="/SignIn">SignIn</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;

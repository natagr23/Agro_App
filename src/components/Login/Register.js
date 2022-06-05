import { useState, useContext, useEffect } from 'react';
// import { auth } from '../Api/firebase-config';
// import { doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { AuthContext } from '../AuthContext/AuthContext';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import 'react-toastify/dist/ReactToastify.css';
import Link from '@mui/material/Link';
import {
  doc,
  setDoc,
  Timestamp,
  collection,
  where,
  query,
  getDocs,
} from 'firebase/firestore';
import { db } from '../Api/firebase-config';
import { toast } from 'react-toastify';

// import {
//   signInWithEmailAndPassword,
//   sendEmailVerification,
// } from 'firebase/auth';

const auth = getAuth();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Agro App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Register() {
  const ctx = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExist, setIsExist] = useState(true);
  const [usnStat, setUsnStat] = useState('');
  const navigate = useNavigate();

  const checkUsernameAvailability = async () => {
    setLoading(true);
    const q = query(collection(db, 'users'), where('username', '==', username));
    const querySnapshot = await getDocs(q).then((doc) => {
      if (doc.empty) {
        setIsExist(false);
        setLoading(false);
        setUsnStat('Username Available');
      } else {
        setIsExist(true);
        setLoading(false);
        setUsnStat('Username not available');
      }
    });

    querySnapshot();
  };

  useEffect(() => {
    if (username.length > 0) {
      checkUsernameAvailability();
    } else {
      setUsnStat('');
    }
  }, [username, usnStat, setUsnStat]);
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

  const handleSubmitregister = (e) => {
    e.preventDefault();
    setError('');
    if (validatePassword()) {
      // Create a new user with email and password using firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (user) => {
          console.log(user, 'A user');
          if (user) {
            const userRef = doc(db, 'users', user.user.uid);

            setDoc(
              userRef,
              {
                username: username.toLowerCase().trim(),
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                created_at: Timestamp.fromDate(new Date()), //Timestamp.fromDate(new Date("December 10, 1815")),
              },
              { merge: true }
            ).then(() => {
              setError('');
              setLoading(false);
              console.log('user Created');
              toast.success(
                'Account Created, Check mail for email verification'
              );
              setFirstName('');
              setLastName('');
              setEmail('');
              setUsername('');
              setPassword('');
              setConfirmPwd('');
              setIsExist(false);
            });
          }
        })
        .then((response) => {
          navigate('/components/Account/Account');
          ctx.updateTimeActive(true); //revisar boolean o tiempo?
          navigate('/verify-email');
        })

        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email Already in Use');
          } else {
            setError(error.message);
          }
          if (error.code === 'auth/invalid-email') {
            toast.error('Invalid Email');
          } else {
            setError(error.message);
          }
          if (error.code === 'auth/weak-password') {
            toast.error('Password should be at least 6 characters ');
          } else {
            setError(error.message);
          }
        });
    }
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const theme = createTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmitregister}
              noValidate
              sx={{ mt: 1 }}
            >
              {error && (
                <Typography style={{ color: 'red' }} component="h7">
                  {error}{' '}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#/SignIn" variant="body2">
                    {'Already have an account? Sign In'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Register;

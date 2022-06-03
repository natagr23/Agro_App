// import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../components/Api/firebase-config';
import {
  onAuthStateChanged,
  signOut,
  getAuth,
  sendEmailVerification,
} from 'firebase/auth';
import { useGlobalContext } from './context';
const StateContext = createContext({
  authenticated: false,
  user: null,
  loading: true,
});
const DispatchContext = createContext(null);

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      localStorage.setItem('uid', payload.user.uid);
      return {
        ...state,
        authenticated: true,
        user: payload,
      };
    case 'LOGOUT':
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          localStorage.removeItem('uid');
        })
        .catch((error) => {
          // An error happened.
          toast.error(error.message);
        });
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    case 'POPULATE':
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'STOP_LOADING':
      return {
        ...state,
        loading: false,
      };
    default:
      throw new Error('Unknown action type');
  }
};

export const AuthProvider = ({ children }) => {
  const { toggleTheme, setSearch } = useGlobalContext();
  // const router = useRouter();
  const [state, defaultDispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true,
  });
  const dispatch = (type, payload) => defaultDispatch({ type, payload });

  useEffect(() => {
    setSearch('');
    if (window.matchMedia) {
      // Check if the dark-mode Media-Query matches
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('Dark');

        // Dark
      } else {
        // Light
        console.log('Light');
        toggleTheme();
      }
    } else {
      // Default (when Media-Queries are not supported)
    }
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        const isDark = e.matches ? true : false;
        !isDark && toggleTheme();
        console.log(isDark);
      });
    const fetchUser = async () => {
      dispatch('LOADING');

      const auth = getAuth();
      const uid = localStorage.getItem('uid');
      await onAuthStateChanged(auth, (user) => {
        if (user && user.emailVerified) {
          onSnapshot(doc(db, 'users', user.uid), (doc_) => {
            console.log('Current data: ', doc_.data());

            dispatch('LOGIN', { user, profile: doc_.data() });

            dispatch('STOP_LOADING');
          });

          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User

          // ...
        } else if (user && user.emailVerified === false) {
          dispatch('STOP_LOADING');
          // router.push('/login');
          sendEmailVerification(auth.currentUser)
            .then(() => {
              // Email verification sent!
              // ...
              toast.info(
                'Please verify email, check mail for email verification'
              );
            })
            .catch((err) => {
              toast.error(err.message);
            });
        } else {
          // User is signed out
          // ...
          localStorage.removeItem('uid');
          dispatch('STOP_LOADING');
          console.log('No user');
          // router.push('/login');
        }
      });
    };
    fetchUser();
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);

//cambiar fecha antes de 30 días
//https://console.firebase.google.com/project/agro-services-a96dc/firestore/rules

//https://firebase.google.com/docs/auth/web/google-signin

//https://css-tricks.com/user-registration-authentication-firebase-react/

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
//https://console.firebase.google.com/project/agroapp-ae569/overview

const firebaseConfig = {
  apiKey: 'AIzaSyATqbxJ2psmEf_dGods0SuKAhyZOHLBHSU',
  authDomain: 'agro-services-a96dc.firebaseapp.com',
  projectId: 'agro-services-a96dc',
  storageBucket: 'agro-services-a96dc.appspot.com',
  messagingSenderId: '445686841502',
  appId: '1:445686841502:web:945dec602a0ce2d77afb8f',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

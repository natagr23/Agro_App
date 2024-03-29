//cambiar fecha antes de 30 días
//https://console.firebase.google.com/project/agro-services-a96dc/firestore/rules

//https://firebase.google.com/docs/auth/web/google-signin

//https://css-tricks.com/user-registration-authentication-firebase-react/

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCZM910LqZ-fhnETUNAl2UYyOTF1fCnPs8',
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: 'agro-app2-f9755',
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

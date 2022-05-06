import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
//https://console.firebase.google.com/project/agroapp-ae569/overview

const firebaseConfig = {
  apiKey: 'AIzaSyC-9GVoEPB7uxg8jKLp0QfiWdvzWE7YrfE',
  authDomain: 'agroapp-ae569.firebaseapp.com',
  databaseURL: 'https://agroapp-ae569-default-rtdb.firebaseio.com',
  projectId: 'agroapp-ae569',
  storageBucket: 'agroapp-ae569.appspot.com',
  messagingSenderId: '230630635208',
  appId: '1:230630635208:web:67af96ce65aa69c77d97fd',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

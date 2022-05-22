import React, { useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../Api/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

const AuthComponent = () => {
  const ctx = useContext(AuthContext);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      ctx.updateUser(user);
    });
  }, [ctx]);

  return <div></div>;
};

export default AuthComponent;

import React, { useState, createContext } from 'react';

export const AuthContext = createContext({});

export function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  const updateUser = (user) => {
    setCurrentUser(() => user);
  };

  const updateTimeActive = (timeActive) => {
    setTimeActive(() => timeActive);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        updateUser: updateUser,
        timeActive: timeActive,
        updateTimeActive: updateTimeActive,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

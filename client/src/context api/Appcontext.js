import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [authenticated, setauthenticated] = useState(false);
  const [user, setuser] = useState({});

  return (
    <AppContext.Provider
      value={{
        authenticated, setauthenticated, user, setuser
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

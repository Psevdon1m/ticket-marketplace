"use client";
import { createContext, useContext, useState, useEffect } from "react";
import useRequest from "../../../hooks/use-request";

const UserContext = createContext(null);

export function UserProvider({ children, user }) {
  const [state, setState] = useState({ currentUser: user });
  //   const { doRequest, errors } = useRequest({
  //     url: "/api/users/currentuser",
  //     method: "get",
  //     onSuccess: (data) => {
  //       setState(data);
  //     },
  //   });

  const login = (data) => {
    console.log("setting user: ", data);

    setState({ currentUser: data });
  };
  const logout = () => {
    console.log("resetting user");

    setState({ currentUser: null });
  };

  //   useEffect(() => {
  //     // Refresh user on client if needed
  //     doRequest();
  //   }, []);

  return (
    <UserContext.Provider value={{ state, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

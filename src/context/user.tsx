'use client'

import { userType } from "@/types";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

type contextType = {
    user: null| userType,
    login: (newUser: userType) => void,
    logout: () => void,
}

const initialContextValue:contextType = {
  user: null,
  login: (newUser: userType) => {},
  logout: () => {},
};


function getUserFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const UserConext = createContext(initialContextValue);
export const UserProvider = ({ children }: any) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(getUserFromLocalStorage());
  function login(newUser: userType) {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    router.push("/tracks");
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <UserConext.Provider value={{ user, login, logout }}>
      {children}
    </UserConext.Provider>
  );
};
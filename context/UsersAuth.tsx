import React, { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import { UserInterface } from "@/interfaces/user.interface";
import Cookies from "js-cookie";

interface userAuthContextProps {
  fetchUser: (token: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  token: string | null;
  user: UserInterface | null;
}

interface userAuthProviderProps {
  children: ReactNode;
}
const userAuthContext = createContext<userAuthContextProps>({
  fetchUser: async () => {},
  logout: () => {},
  loading: false,
  token: null,
  user: null,
});

const UsersAuthProvider: React.FC<userAuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserInterface | null>(null);

  const fetchUsers = async (responseToken: string): Promise<void> => {
    setIsLoading(true);
    setToken(responseToken);
    try {
      const response = await fetch(`${process.env.HOST}user/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${responseToken}`,
          Accept: "application/json",
        },
      });
      const data = await response.json();
      if (data) {
        setUser(data?.data);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        setToken(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    const cookies = Cookies.get("LOGIN_TOKEN");
    if (cookies) fetchUsers(cookies);
  }, []);

  return (
    <userAuthContext.Provider
      value={{ fetchUser, logout, loading, token, user }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export default UsersAuthProvider;

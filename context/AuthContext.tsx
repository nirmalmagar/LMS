import React, { ReactNode, createContext, useEffect, useState } from "react";
import { UserInterface, GenresInterface } from "@/interfaces/user.interface";
import Cookies from "js-cookie";

interface AuthContextProps {
  token?: string | null;
  users?: UserInterface | null;
  fetchUsers?: (token: string) => Promise<void>;
  genres?: GenresInterface | null;
  fetchGenres?: (token: string) => Promise<void>;
  isLoading?: boolean;
}

interface AuthProviderProps {
  children?: ReactNode;
}
const AuthContext = createContext<AuthContextProps>({
  token : null,
  users : null,
  fetchUsers : async () => {},
  fetchGenres : async () => {},
  isLoading : true
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>("");
  const [users, setUsers] = useState<UserInterface | null>(null);
  const [genres, setGenres] = useState<GenresInterface | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUsers = async (responseToken: string) => {
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
        setIsLoading(false);
        setUsers(data?.results);
      } else {
        setIsLoading(false);
        Cookies.remove("LOGIN_TOKEN");
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const fetchGenres = async (responseToken: string) => {
    try {
      const response = await fetch(`${process.env.HOST}genres/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${responseToken}`,
          Accept: "Application/json",
        },
      });
      const data = await response.json();
      if (data) {
        setGenres(data?.results);
      } else {
        setIsLoading(false);
        Cookies.remove("LOGIN_TOKEN");
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    const CookieToken = Cookies.get("LOGIN_TOKEN");
    if (CookieToken) {
      fetchUsers(CookieToken);
      fetchGenres(CookieToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ fetchUsers, fetchGenres, token, users, genres, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
export {AuthProvider, AuthContext};

import React, { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import { UserInterface } from "@/interfaces/user.interface";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { routes } from "@/utils/routes";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserInterface | null>(null);
  const router = useRouter();

  const logOutURL = `${process.env.HOST}logout/`

  const logout = async (): Promise<void> => {
    const option = {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        Accept: "Application/json",
      },
    };
    try{
      const response = await fetch(logOutURL,option)
      const data = await response.json();
      if(data.success){
        router.replace(routes.ADMIN_AUTH_LOGIN)
      }
    }
    catch(e:any){
      console.error("error",e)
    }
  };

  const fetchUser = async (responseToken: string): Promise<void> => {
    setLoading(true);
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
        toast.error(data?.success);
        setUser(data?.data);
        setLoading(false);
      } else {
        setLoading(true);
        setToken(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const cookies = Cookies.get("LOGIN_TOKEN");
    if (cookies) fetchUser(cookies);
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

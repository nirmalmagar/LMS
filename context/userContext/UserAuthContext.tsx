import React, { ReactNode, createContext, useEffect, useState } from "react";
import { UserInterface } from "@/interfaces/user.interface";
import Cookies from "js-cookie";

interface userAuthContextProps {
  token?: string | null;
  user?: UserInterface | null;
  fetchUsers?: (token: string) => Promise<void>;
  isLoading?: boolean;
}

interface userAuthProviderProps {
  children?: ReactNode;
}
const UserAuthContext = createContext<userAuthContextProps>({
  token: null,
  user: null,
  fetchUsers: async () => {},
  isLoading: true,
});

const UserAuthProvider: React.FC<userAuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>("");
  const [storeId, setStoreId] = useState<any>("");
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // user lists
  const fetchUsers = async (responseToken: string) => {
    setIsLoading(true);
    setToken(responseToken);
    try {
      const response = await fetch(`${process.env.HOST}user/${storeId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${responseToken}`,
          Accept: "application/json",
        },
      });
      const data = await response.json();
      if (data) {
        setIsLoading(false);
        setUser(data);
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
    const user_id = Cookies.get("USER_ID");
    if (CookieToken) {
      fetchUsers(CookieToken);
      setStoreId(user_id);
    }
  }, []);

  return (
    <UserAuthContext.Provider
      value={{
        fetchUsers,
        token,
        user,
        isLoading,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};
export { UserAuthProvider, UserAuthContext };

import React, { createContext, ReactNode } from "react";

interface AuthContextProps {
  logout: () => void;
}
interface AuthProviderProps {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextProps>({ 
  logout: () => {} 
});

const AuthProvider:React.FC<AuthProviderProps> = ({children}) => {
  return(
    <>
    </>
  )
};

export default AuthProvider;

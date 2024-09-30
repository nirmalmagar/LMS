import React, { ReactNode } from "react";

interface TBodyProps {
  children: ReactNode;
}

const TBody: React.FC<TBodyProps> = ({ children }) => {
  return <tbody className="text-left text-sm">{children}</tbody>;
};

export default TBody;

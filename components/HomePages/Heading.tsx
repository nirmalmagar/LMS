import React, { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
  title: string;
}
const Heading: React.FC<HeadingProps> = ({ children, title }) => {
  return (
    <>
      <h2 className="font-bold text-2xl mt-4">{title}</h2>
      <span className="text-sm">{children}</span>
    </>
  );
};

export default Heading;

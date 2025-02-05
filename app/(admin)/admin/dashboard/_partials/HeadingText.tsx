import React from "react";
interface headingProps{
  heading:string;
}
const HeadingText:React.FC<headingProps> = ({heading}) => {
  return (
    <h1 className="text-xl font-semibold ml-1.5 my-2 mt-4">
      {heading}
    </h1>
  );
};

export default HeadingText;

import React from "react";
import "./Spinner.css"

interface SpinnerLoadingProps{
  className?: "string"
}

const Spinner:React.FC<SpinnerLoadingProps> = ({className}) => {
  return <div className={`spinners ${className && className}`}/>;
};

export default Spinner;

import React from "react";

interface dateConverterProps{
  date:string;
}

const DateConvert:React.FC<dateConverterProps> = ({date}) => {
  const new_date:Date = new Date(date);
  const year = new_date.getFullYear();
  const month = (new_date.getMonth() + 1).toString().padStart(2, '0');
  const day = new_date.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate
};

export default DateConvert;

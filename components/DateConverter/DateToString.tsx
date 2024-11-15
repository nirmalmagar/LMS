interface dateToStringProps {
  inputDate: string;
}
const DateToString: React.FC<dateToStringProps> = ({ inputDate }) => {
  const date: Date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate: string = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export default DateToString;

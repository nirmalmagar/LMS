import Cookies from "js-cookie";

export const accessToken = () => {
  const ACCESS_TOKEN = Cookies.get("LOGIN_TOKEN");
  return ACCESS_TOKEN;
};

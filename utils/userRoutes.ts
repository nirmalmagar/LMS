interface userRoutesInterface {
  [key: string]: string;
}
const userRoutes: userRoutesInterface = {
  USER_AUTH_LOGIN: "/user/auth/login",
  USER_DASHBOARD_ROUTE: "/user/dashboard",
  USER_AUTH_SIGN_UP: "/user/auth/sign-up",
  USER_VERIFY_OTP: "/user/auth/verify-otp",
  FORGOT_PASSWORD: "/user/auth/forgot-password",
  RESET_PASSWORD: "/user/auth/reset-password",
  BORROW_HISTORY: "/user/borrow-history",
  NOTIFICATION: "/user/notification",
  SETTING: "/user/setting",
  UPDATE_PROFILE: "/user/setting/update-profile",
  CHANGE_PASSWORD: "/user/setting/change-password"
};

export default userRoutes;

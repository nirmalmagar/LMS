interface studentRoutesInterface {
  [key: string]: string;
}
const studentRoutes: studentRoutesInterface = {
  STUDENT_AUTH_LOGIN: "/student/auth/login",
  STUDENT_DASHBOARD_ROUTE: "/student/dashboard",
  BORROW_HISTORY: "/student/borrow-history",
  NOTIFICATION: "/student/notification",
  SETTING: "/student/setting",
  UPDATE_PROFILE: "/student/setting/update-profile",
  CHANGE_PASSWORD: "/student/setting/change-password"
};

export default studentRoutes;

interface studentRoutesInterface {
  [key: string]: string;
}
const studentRoutes: studentRoutesInterface = {
  STUDENT_AUTH_LOGIN: "/student/auth/login",
  STUDENT_DASHBOARD_ROUTE: "/student/dashboard",
  BORROW_HISTORY: "/student/borrow-history",
  NOTIFICATION: "/student/notification",
  SETTING: "/student/setting",
};

export default studentRoutes;

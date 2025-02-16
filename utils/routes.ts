interface RoutesInterface {
  [key: string]: string;
}
export const routes: RoutesInterface = {
  ADMIN_AUTH_LOGIN: "/admin/auth/login",
  ADMIN_AUTH_SIGN_UP: "/admin/auth/sign-up",
  ADMIN_AUTH_REGISTER: "/admin/auth/register",
  ADMIN_VERIFY_OTP: "/admin/auth/verify-otp",
  ADMIN_BOOKS_ROUTE: "/admin/books",
  ADMIN_BOOKS_ADD: "/admin/books/add",
  ADMIN_BORROW_ROUTE: "/admin/borrow",
  ADMIN_DASHBOARD_ROUTE: "/admin/dashboard",
  ADMIN_GENRES_ROUTE: "/admin/genres",
  ADMIN_GENRES_ADD:"/admin/genres/add",
  ADMIN_GENRES_DELETE:"/admin/genres/delete",
  ADMIN_RESERVE_QUEUE_ROUTE: "/admin/reserve-queue",
  ADMIN_RESERVES_ROUTE: "/admin/reserves",
  ADMIN_USERS_ROUTE: "/admin/users",
  NOTIFICATION: "/admin/notification",
  BOOK_LIST:"/book-list",
  DIGITAL_RESOURCE_LISTS:'/admin/digital-resource',
  ACADEMICS:'/admin/academics',
  ACADEMIC_GRADE:'/admin/academics/grade',
  ACADEMIC_TEACHER:'/admin/academics/teacher',
  ACADEMIC_STAFF:'/admin/academics/staff',
  ACADEMIC_DEPARTMENT:'/admin/academics/department',
  ACADEMIC_STUDENT:'/admin/academics/student',
  ACADEMIC_LIBRARY:'/admin/academics/library',
  ACADEMIC_SHELF:'/admin/academics/shelf',
  FINE:'/admin/fine',
  SETTING:'/admin/setting',
  CHANGE_PASSWORD: "/admin/setting/change-password"
};

interface RoutesInterface {
  [key: string]: string;
}
export const routes: RoutesInterface = {
  ADMIN_AUTH_LOGIN: "/admin/auth/login",
  ADMIN_AUTH_SIGN_UP: "/admin/auth/sign-up",
  ADMIN_AUTH_REGISTER: "/admin/auth/register",
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
  BOOK_LIST:"/book-list",
  DIGITAL_RESOURCE_LISTS:'/admin/digital-resource'
};

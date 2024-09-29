interface RoutesInterface {
  [key: string]: string;
}
export const routes: RoutesInterface = {
  ADMIN_DASHBOARD_ROUTE: "/admin/dashboard",
  ADMIN_USERS_ROUTE: "/admin/users",
  ADMIN_BOOKS_ROUTE: "/admin/books",
  ADMIN_BOOKS_ADD: "/admin/books/add",
  ADMIN_BORROW_ROUTE: "/admin/borrow",
  ADMIN_GENRES_ROUTE: "/admin/genres",
  ADMIN_GENRES_ADD:"/admin/genres/add",
  ADMIN_GENRES_DELETE:"/admin/genres/delete",
  ADMIN_RESERVE_QUEUE_ROUTE: "/admin/reserve-queue",
  ADMIN_RESERVES_ROUTE: "/admin/reserves",
};

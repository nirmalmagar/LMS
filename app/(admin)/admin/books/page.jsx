import React from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import BookTableList from "./_partials/BookTableList";
import TableHead from "@/components/Elements/TableHead/TableHead";

const BookPage = () => {
  return (
    <DefaultLayout>
      <TableHead
        tableName="Books List"
        routeLink="routes.ADMIN_BOOKS_ADD"
        addTitle="Add Book"
      />
      <BookTableList />
    </DefaultLayout>
  );
};

export default BookPage;

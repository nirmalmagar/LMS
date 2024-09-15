import React from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import Link from "next/link";
import { routes } from "@/utils/routes";
import TableList from "./_partials/TableList";
import TableHead from "@/components/Elements/TableHead/TableHead";

const GenresPage = () => {
  return (
    <DefaultLayout>
      <TableHead tableName="Genres List" routeLink={routes.ADMIN_GENRES_ADD} addTitle="Add Genres" />
      <TableList />
    </DefaultLayout>
  );
};

export default GenresPage;

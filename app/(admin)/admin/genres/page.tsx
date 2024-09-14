import React from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import Link from "next/link";
import { routes } from "@/utils/routes";
import TableList from "./_partials/TableList";

const GenresPage = () => {
  return <DefaultLayout>
    <div className="flex justify-between items-start mb-8">
        <h1 className="text-2xl font-semibold">Genres List</h1>
        <div>
          <Link
            href={routes.ADMIN_GENRES_ADD}
            className="bg-blue-600 text-white p-2 rounded-lg"
          >
            Add Genres
          </Link>
        </div>
      </div>
      <TableList/>
  </DefaultLayout>;
};

export default GenresPage;

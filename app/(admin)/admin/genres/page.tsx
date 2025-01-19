import React from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
// import TableList from "./_partials/TableListss";
import GenresTableList from "./_partials/GenresTableList";
const GenresPage = () => {
  return (
    <DefaultLayout>
      <GenresTableList showHeading={true}/>
    </DefaultLayout>
  );
};

export default GenresPage;

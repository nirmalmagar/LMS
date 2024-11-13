import React from "react";
import HomeLayout from "@/components/Layouts/HomeNavBar/HomeLayout";
import Container from "@/components/Container";
import BookCardList from "@/components/Elements/BookCardList";

function page() {
  return (
    <>
      <HomeLayout>
        <Container>
        <BookCardList />
        </Container>
      </HomeLayout>
    </>
  );
}

export default page;

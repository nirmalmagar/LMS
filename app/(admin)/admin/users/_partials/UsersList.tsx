"use client";
import React from "react";
import useSWR from "swr";
import { defaultFetcher } from "@/helpers/FetchHelper";

const usersURL = `${process.env.HOST}user/`;
const UsersList = () => {
  const { data: usersDataList } = useSWR(usersURL, defaultFetcher);

  return (
    <div>
      <h1>hello</h1>
      {usersDataList?.results?.map(
        (usersList: {
          id:
            | string
            | number
            | bigint
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | Promise<React.AwaitedReactNode>
            | null
            | undefined;
        }) => {
          return (
            <>
              <p>id name:</p>
              <h1>{usersList?.id}</h1>
            </>
          );
        }
      )}
    </div>
  );
};

export default UsersList;

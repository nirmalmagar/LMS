// import React from "react";
// import useSWR from "swr";
// import { defaultFetcher } from "./FetchHelper";

// const FineCollectionName = () => {
//   const BorrowURL = `${process.env.HOST}borrow/`;
//   const { data: borrowList } = useSWR(BorrowURL, defaultFetcher);
//   return (
//     <div>
//       {borrowList?.results?.map(
//         (borrowValue: Record<string, any>, index: any) => {
//           return (
//             <div key={index} className="flex text-sm">
//               <p>{borrowValue?.book?.title} </p>
//               <span> ({borrowValue?.borrower?.name})</span>
//             </div>
//           );
//         }
//       )}
//     </div>
//   );
// };

// export default FineCollectionName;

export const FineCollectionName = (data: Record<string, any>[]) => {
  return data
    ? data.map((item) => ({
        value: item?.id?.toString(),
        label: (
          <div className="flex text-sm">
            <p>{item?.book?.title} </p>
            <span> ({item?.borrower?.name})</span>
          </div>
        ),
        // label: item?.title ? item.title : item?.name,
      }))
    : [];
};

// export const FineCollectionName = (data: Record<string, any>[]) => {
//   return Array.isArray(data)
//     ? data.map((item) => ({
//         value: item?.id?.toString(),
//         label: `${item?.book?.title || "Unknown Title"} (${item?.borrower?.name || "Unknown Borrower"})`,
//       }))
//     : [];
// };


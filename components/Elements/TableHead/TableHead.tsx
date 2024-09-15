import Link from "next/link";
import React from "react";
import { routes } from "@/utils/routes";

interface headListProps {
  tableName: string;
  routeLink: string;
  addTitle: string;
}
const TableHead: React.FC<headListProps> = ({
  tableName,
  routeLink,
  addTitle,
}) => {
  return (
    <div className="flex justify-between items-start mb-8">
      <h1 className="text-2xl font-semibold">{tableName}</h1>
      <div>
        <Link
          href={routeLink}
          className="bg-blue-600 text-white p-2 rounded-lg"
        >
          {addTitle}
        </Link>
      </div>
    </div>
  );
};

export default TableHead;

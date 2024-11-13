import React from "react";

interface PaginationProp {
  meta: Record<string, any>;
  handleOnClick: (url: string) => void;
}

// setCurrentURL => set url function
const Post: React.FC<PaginationProp> = ({ meta, handleOnClick }) => {
  console.log("meta url", meta);
  return (
    <div className="mb-4 flex items-end justify-between">
      Showing {meta.from} to {meta.to} of {meta.total} results
      {meta.last_page > 1 ? (
        <div className="flex  gap-2">
          {meta.links.map((link: any) => (
            <div
              key={link.label}
              onClick={() => handleOnClick(link.url as string)}
              className={`border rounded-md p-2 cursor-pointer select-none ${
                link.active ? "bg-indigo-600 text-white" : ""
              } ${link.url === null ? "opacity-75" : ""}`}
            >
              <span dangerouslySetInnerHTML={{ __html: link.label }}></span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Post;

"use client"
import React from "react";

const page = () => {
  const handleSubmit = () => {
    return null
  };
  return (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark max-w-xl">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Add FAQS</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 ">
              <div className="flex gap-4">
                <div className="w-1/2">
                  {/* <SelectField
                    options={blogOptions}
                    label="Select Blog"
                    value={selectValues?.blog_id}
                    defaultValue=""
                    name="blog_id"
                    onChange={(e) => {
                      handleSelectChange("blog_id", {
                        value: e.target.value,
                      });
                    }}
                  /> */}
                  <input type="text" />
                </div>
              </div>
              <div className="w-full">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Title of FAQs"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-full">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Description
                </label>
                <textarea
                  typeof="text"
                  name="description"
                  placeholder="description"
                  className="w-full h-40 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray-1 hover:bg-opacity-90 mt-8"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
  );
};

export default page;

import React from "react";
import { Pagination } from "@mui/material";

function PageLeavePagination({ setPage, totalPages }) {
  const changePages = (event, value) => {
    setPage(value);
  };

  return (
    <div
      className=" rounded-xl bg-[#d9e0e8] text-gray-800   
            dark:bg-neutral-700 dark:text-white w-full flex justify-center h-12 items-center"
    >
      <Pagination
        count={totalPages}
        shape="rounded"
        variant="outlined"
        onChange={changePages}
      />
    </div>
  );
}

export default PageLeavePagination;

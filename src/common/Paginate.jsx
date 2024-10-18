import React from "react";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";

const Paginate = ({ pageable = {}, handlePageClick = () => {} }) => {
  console.log("pageable", pageable);
  return (
    <div className="flex  justify-between items-center pt-5 ">
      {pageable?.totalPages && (
        <div className="">
          <ReactPaginate
            breakLabel="..."
            nextLabel={
              Number(pageable?.number) + 1 < Number(pageable?.totalPages) ? (
                <span className=" flex items-center justify-center space-x-2 hover:bg-[#ececec]  py-2 px-3 rounded-md">
                  Next{" "}
                  <span>
                    <BsChevronRight size={16} />
                  </span>
                </span>
              ) : null
            }
            previousLabel={
              Number(pageable?.number) + 1 > 1 ? (
                <span className=" flex items-center justify-center space-x-2 hover:bg-[#ececec]  py-2 px-3 rounded-md ">
                  <span>
                    <BsChevronLeft size={16} />
                  </span>{" "}
                  Prev
                </span>
              ) : null
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageable?.totalPages}
            renderOnZeroPageCount={null}
            breakClassName="item break-me "
            containerClassName="flex items-center justify-center space-x-2 font-[600] text-gray-700"
            disabledClassName="disabled-page"
            marginPagesDisplayed="2"
            nextClassName="item next "
            activeClassName="bg-light-blue-300 text-[#ffff] hover:text-[#ffff] p-2"
            pageClassName="block  hover:bg-light-blue-300 hover:text-[#ffff] w-8 h-8 flex items-center justify-center rounded p-2"
            previousClassName="item previous"
            forcePage={pageable?.number}
          />
        </div>
      )}

      {/*  */}
      {pageable?.totalPages && (
        <div className="">
          <p className="text-sm text-gray-700 font-[600]">
            showing{" "}
            <span className="font-[500] text-light-blue-300">
              {Number(pageable?.size) * Number(pageable?.number) + 1}
            </span>{" "}
            to{" "}
            <span className="font-[500] text-light-blue-300">
              {Number(pageable?.numberOfElements) +
                Number(pageable?.number) * Number(pageable?.size)}
            </span>{" "}
            of{" "}
            <span className="font-[500] text-light-blue-300">
              {pageable?.totalElements}
            </span>{" "}
            entries
          </p>
        </div>
      )}
    </div>
  );
};

export default Paginate;

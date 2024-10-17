import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ErrorValidate from "../common/ErrorValidate";
import Paginate from "../common/Paginate";
import { topicArray } from "../common/StoreData";
import useAxios from "../common/UseAxios";
const HomeScreen = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const [wishlist, setWishlist] = useState([]);
  const searchRef = useRef(null);
  const selectRef = useRef(null);
  const getBooksList = useAxios([]);
  const selectTopic = localStorage.getItem("selectTopic");
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber?.selected);
    if (selectTopic) {
      handleTopicBookList(pageNumber?.selected + 1);
    } else {
      handleBookList(pageNumber?.selected + 1);
    }
  };
  const handleBookList = (selectedPage) => {
    getBooksList.fetcher({
      options: {
        method: "GET",
        url: `${selectedPage ? `/books/?page=${selectedPage}` : "/books"}`,
      },
      callback: () => {},
    });
  };
  const handleTopicBookList = (selectedPage) => {
    getBooksList.fetcher({
      options: {
        method: "GET",
        url: `/books/?page=${selectedPage}&topic=${selectTopic}`,
      },
      callback: () => {},
    });
  };

  const handleSearch = (value) => {
    selectRef.current.value = "";
    localStorage.removeItem("selectTopic");
    setTimeout(() => {
      //   handleBooksSearchList(value);
      //   console.log("value=====>>>", value);
      getBooksList.fetcher({
        options: {
          method: "GET",
          url: `/books?search=${value}`,
        },
        callback: () => {},
      });
    }, 2000);
  };
  const handleTopicSelect = (event) => {
    localStorage.setItem("selectTopic", event);
    searchRef.current.value = "";
    getBooksList.fetcher({
      options: {
        method: "GET",
        url: `/books/?topic=${event}`,
      },
      callback: () => {},
    });
  };

  // Function to toggle wishlist
  const handleWishlistClick = (book) => {
    let updatedWishlist = [...wishlist];
    const bookIndex = updatedWishlist.findIndex((item) => item.id === book.id);

    if (bookIndex >= 0) {
      // If the book is already in the wishlist, remove it
      updatedWishlist = updatedWishlist.filter((item) => item.id !== book.id);
    } else {
      // Otherwise, add the book to the wishlist
      updatedWishlist.push(book);
    }

    // Update localStorage and state
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };
  const isBookInWishlist = (book) => {
    return wishlist.some((item) => item.id === book.id);
  };
  useEffect(() => {
    if (selectTopic) {
      handleTopicSelect(selectTopic);
    } else {
      handleBookList();
    }
  }, []);

  return (
    <div>
      {getBooksList?.error && <ErrorValidate error={"Something went wrong"} />}

      <div className="flex flex-col lg:flex-row  justify-between items-center lg:gap-10 gap-2 px-10 py-4 border-b-2">
        <div className="w-[50%]">
          <div className="flex rounded-md border-2 border-gray-200 overflow-hidden w-full mx-auto font-[sans-serif]">
            <div className="flex items-center justify-center bg-slate-200 px-5 fill-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                width="20px"
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
            </div>
            <input
              ref={searchRef}
              disabled={getBooksList?.loading || getBooksList?.error}
              onChange={(e) => handleSearch(e.target.value)}
              type="text"
              placeholder="Search by title"
              className="w-full outline-none bg-slate-100 text-gray-600 text-sm px-4 py-3"
            />
          </div>
        </div>

        <div className="w-[20%] ">
          <select
            disabled={getBooksList?.loading || getBooksList?.error}
            color="blue"
            ref={selectRef}
            onChange={(e) => handleTopicSelect(e.target.value)}
            defaultValue={selectTopic}
            className="py-[10px] rounded-md px-3 pr-11 block w-full border-gray-200 border-[1px] shadow-sm rounded-r-md text-sm focus:z-10 focus:outline-[1px] focus:outline-sky-100 text-gray-800"
          >
            <option value="">{"Please choose an topic"}</option>
            {topicArray?.length > 0
              ? topicArray?.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))
              : []}
          </select>
        </div>
      </div>

      <>
        <div className="lg:grid grid-cols-6 gap-2 py-5 px-10">
          {getBooksList?.loading
            ? Array(32) // Adjust the number to show how many skeleton cards you want to render
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full py-6 max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4"
                  >
                    <div className="flex items-center gap-2 px-6">
                      <Skeleton circle={true} height={50} width={50} />
                    </div>

                    <div className="flex justify-center">
                      <Skeleton width={160} height={100} />
                    </div>

                    <div className="px-6">
                      <Skeleton height={24} width={`80%`} />
                      <Skeleton count={2} width={`60%`} />
                      <Skeleton width={50} height={30} />
                    </div>
                  </div>
                ))
            : getBooksList?.data?.results?.map((item, index) => (
                <div
                  key={index}
                  className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full py-6 max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4"
                >
                  <div className="flex items-center gap-2 px-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18px"
                      className="cursor-pointer shrink-0"
                      onClick={() => handleWishlistClick(item)}
                      fill={isBookInWishlist(item) ? "red" : "blue"}
                      viewBox="0 0 64 64"
                    >
                      <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
                    </svg>
                  </div>

                  <div className="flex justify-center">
                    <img
                      src={item?.formats?.["image/jpeg"]}
                      alt="Product"
                      className="max-w-60 max-h-40 min-h-40  my-6"
                    />
                  </div>

                  <div className="px-6">
                    <h3 className="text-base text-gray-800 font-bold flex-1">
                      {item?.title.slice(0, 25)}
                    </h3>
                    {item?.authors?.map((author, authorIndex) => (
                      <p
                        key={authorIndex}
                        className="text-[14px] text-slate-500 flex-1"
                      >
                        {author?.name} ({author?.birth_year} -{" "}
                        {author?.death_year})
                      </p>
                    ))}

                    <div className="mt-8 flex items-center flex-wrap gap-4">
                      <h3 className="text-xl text-gray-800 font-bold flex-1">
                        $12.90
                      </h3>
                      <button
                        type="button"
                        className="px-5 py-2.5 rounded-lg text-white text-sm tracking-wider bg-blue-600 hover:bg-blue-700 outline-none"
                      >
                        Order now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        {getBooksList?.data?.results?.length > 0 ? (
          <div className="px-10 items-center justify-between border-t border-blue-gray-50  bg-gray-400">
            <Paginate
              pageable={{
                totalElements: getBooksList?.data?.count,
                totalPages: Math.ceil(
                  getBooksList?.data?.count /
                    getBooksList?.data?.results?.length
                ),

                size: getBooksList?.data?.results?.length,
                numberOfElements: getBooksList?.data?.results?.length,
                number: currentPage,
              }}
              handlePageClick={(pageNumber) => {
                handlePagination(pageNumber);
              }}
            />
          </div>
        ) : (
          ""
        )}
      </>
    </div>
  );
};

export default HomeScreen;

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { topicArray } from "../common/StoreData";
import successMessage from "../common/SuccessMessage";
import useAxios from "../common/UseAxios";
import CardDesign from "../components/CardDesign";
import CardSkeleton from "../components/CardSkeleton";
import ErrorValidate from "../components/ErrorValidate";
import InputField from "../components/InputField";
import Paginate from "../components/Paginate";
import SelectField from "../components/SelectField";
import WarningMessage from "../components/WarningMessage";
const HomeScreen = () => {
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const getBooksList = useAxios([]);
  const searchRef = useRef(null);
  const selectRef = useRef(null);
  const navigate = useNavigate();

  const selectTopic = localStorage.getItem("selectTopic");
  const searchTitle = localStorage.getItem("searchTitle");
  //this function navigate another page for book_details
  const handleBookDetails = (bookId) => {
    navigate(`/book-details/${bookId}`);
  };
  //this function use for pagination purpose
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber?.selected);
    if (selectTopic) {
      handleTopicBookList(selectTopic, pageNumber?.selected + 1);
    } else if (searchTitle) {
      handleSearchBookList(searchTitle, pageNumber?.selected + 1);
    } else {
      handleBookList(pageNumber?.selected + 1);
    }
  };
  //this function use for get all books list
  const handleBookList = (selectedPage = 1) => {
    getBooksList.fetcher({
      options: {
        method: "GET",
        url: `/books/?page=${selectedPage}`,
      },
      callback: () => {},
    });
  };
  //this function is used to retrieve all books based on the search query
  const handleSearchBookList = (value, selectedPage = 1) => {
    getBooksList.fetcher({
      options: {
        method: "GET",
        url: `/books/?page=${selectedPage}&search=${value}`,
      },
      callback: () => {},
    });
  };
  // This function is used to retrieve all books based on the specifically selected topic.
  const handleTopicBookList = (event, selectedPage = 1) => {
    getBooksList.fetcher({
      options: {
        method: "GET",
        url: `/books/?page=${selectedPage}&topic=${event}`,
      },
      callback: () => {},
    });
  };
  const handleSearch = (value) => {
    selectRef.current.value = "";
    localStorage.removeItem("selectTopic");
    localStorage.setItem("searchTitle", value);
    setCurrentPage(0);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const newTimeout = setTimeout(() => {
      handleSearchBookList(value);
    }, 3000);

    setDebounceTimeout(newTimeout);
  };
  const handleTopicSelect = (event) => {
    localStorage.setItem("selectTopic", event);
    localStorage.removeItem("searchTitle");
    searchRef.current.value = "";
    setCurrentPage(0);
    handleTopicBookList(event);
  };
  // This function is used to add or remove books from the wishlist.

  const handleWishlistClick = (book) => {
    let updatedWishlist = [...wishlist];
    const bookIndex = updatedWishlist.findIndex((item) => item.id === book.id);

    if (bookIndex >= 0) {
      updatedWishlist = updatedWishlist.filter((item) => item.id !== book.id);
      successMessage("Book remove from wishlist!");
    } else {
      updatedWishlist.push(book);
      successMessage("Book added to wishlist!");
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };
  const isBookInWishlist = (book) => {
    return wishlist.some((item) => item.id === book.id);
  };

  useEffect(() => {
    if (selectTopic) {
      handleTopicBookList(selectTopic);
    } else if (searchTitle) {
      handleSearchBookList(searchTitle);
    } else {
      handleBookList();
    }
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  return (
    <div>
      <div className="flex flex-col lg:flex-row  justify-between items-center lg:gap-10 gap-2 px-10 py-4 border-b-2">
        <InputField
          inputRef={searchRef}
          placeholder="Search by title"
          disabled={getBooksList?.loading || getBooksList?.error}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchTitle}
        />

        <SelectField
          selectRef={selectRef}
          value={selectTopic || ""}
          options={topicArray}
          onChange={handleTopicSelect}
          disabled={getBooksList?.loading || getBooksList?.error}
        />
      </div>

      <>
        <div
          className={`${
            getBooksList?.data?.results?.length > 0 || getBooksList?.loading
              ? "lg:grid md:grid"
              : ""
          }  lg:grid-cols-6 md:grid-cols-4 gap-3 py-5 px-10`}
        >
          {getBooksList?.loading ? (
            Array(32)
              .fill(0)
              .map((item, index) => <CardSkeleton key={index} />)
          ) : getBooksList?.data?.results?.length == 0 ? (
            <div className="py-10">
              <WarningMessage error={"No Data Found"} />
            </div>
          ) : getBooksList?.data?.results?.length > 0 ? (
            getBooksList?.data?.results?.map((item, index) => (
              <CardDesign
                key={index}
                item={item}
                handleWishlistClick={handleWishlistClick}
                fillColour={isBookInWishlist(item)}
                handleBookDetails={handleBookDetails}
              />
            ))
          ) : (
            <ErrorValidate error={"Something went wrong"} />
          )}
        </div>
        {getBooksList?.data?.results?.length > 0 ? (
          <div className="mx-10 items-center justify-between border-t border-blue-gray-50  bg-gray-400 px-5 rounded-lg my-5">
            <Paginate
              pageable={{
                totalElements: getBooksList?.data?.count,
                totalPages: Math.ceil(getBooksList?.data?.count / 32),

                size: 32,
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

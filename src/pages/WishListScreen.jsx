import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import successMessage from "../common/SuccessMessage";
import WarningMessage from "../common/WarningMessage";
import CardDesign from "../components/CardDesign";

const WishListScreen = () => {
  const [getWishList, setWishList] = useState([]);
  const navigate = useNavigate();
  const handleBookDetails = (bookId) => {
    navigate(`/book-details/${bookId}`);
  };

  const handleWishlistClick = (book) => {
    const updatedBooks = getWishList?.filter((item) => item?.id !== book?.id);
    setWishList(updatedBooks);
    localStorage.setItem("wishlist", JSON.stringify(updatedBooks));
    successMessage("Book remove from wishlist!");
  };
  useEffect(() => {
    const storedBooks = localStorage.getItem("wishlist");
    const parsedBooks = storedBooks ? JSON.parse(storedBooks) : [];
    setWishList(parsedBooks);
  }, []);

  return (
    <div className="p-10">
      {getWishList?.length > 0 ? (
        <div className="lg:grid grid-cols-6 gap-2">
          {getWishList?.map((item, index) => (
            <CardDesign
              key={index}
              item={item}
              handleWishlistClick={handleWishlistClick}
              handleBookDetails={handleBookDetails}
            />
          ))}
        </div>
      ) : (
        <div className="py-10">
          <WarningMessage error={"No Data Found"} />
        </div>
      )}
    </div>
  );
};

export default WishListScreen;

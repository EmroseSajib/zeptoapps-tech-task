import React, { useEffect, useState } from "react";
import successMessage from "../common/SuccessMessage";
import WarningMessage from "../common/WarningMessage";
import CardDesign from "../components/CardDesign";

const WishListScreen = () => {
  const [getWishList, setWishList] = useState([]);

  useEffect(() => {
    const storedBooks = localStorage.getItem("wishlist");
    const parsedBooks = storedBooks ? JSON.parse(storedBooks) : [];
    setWishList(parsedBooks);
  }, []);

  const handleWishlistClick = (book) => {
    const updatedBooks = getWishList?.filter((item) => item?.id !== book?.id);
    setWishList(updatedBooks);
    localStorage.setItem("wishlist", JSON.stringify(updatedBooks)); // Update localStorage
    successMessage("Book remove from wishlist!");
  };

  return (
    <div className="p-10">
      {getWishList?.length > 0 ? (
        <div className="lg:grid grid-cols-6 gap-2">
          {getWishList?.map((item, index) => (
            <CardDesign
              key={index}
              item={item}
              handleWishlistClick={handleWishlistClick}
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
